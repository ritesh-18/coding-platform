import type Docker from "dockerode";
import { PythonImage } from "../constant/images.constant";
import { Command } from "./command.util";
import { createContainer } from "./createcontainer.utils";

export interface CodeRunnerConfig {
    code: string;
    input?: string; // stdin fed to the submission (test case input)
    imageName?: string;
    tle?: number; // in milliseconds,
    language?: 'python' | 'javascript'; // specify the language for code execution
}

export type RunStatus = 'success' | 'failed' | 'timeout' | 'error';

export interface CodeRunnerResult {
    status: RunStatus;
    exitCode: number | null;
    output: string;
}

export async function codeRunner(config: CodeRunnerConfig): Promise<CodeRunnerResult> {
    const { code, input, imageName, tle, language } = config;
    let container: Docker.Container | null = null;

    try {
        container = await createContainer({
            ImageName: imageName || PythonImage,
            Command: ['/bin/bash', '-c', Command[language || 'python'](code, input || '')],
            MemoryLimit: 1024 * 1024 * 100, // 100 MB
            CpuLimit: 50000 // 50% of a single CPU core
        })

        if (!container) {
            return { status: 'error', exitCode: null, output: 'Failed to create container' };
        }

        // Attach BEFORE starting. With AutoRemove the container is deleted the
        // instant it exits, so calling logs() afterwards races the reaper and
        // intermittently fails with "409 ... dead or marked for removal".
        const stream = await container.attach({
            stream: true,
            stdout: true,
            stderr: true
        });

        let output = '';
        stream.on('data', (chunk: Buffer) => { output += chunk.toString('utf8'); });

        await container.start();

        // kill() rather than stop(): stop() sends SIGTERM and waits ~10s for a
        // graceful exit, so an infinite loop would outlive its time limit.
        let timedOut = false;
        const timeout = setTimeout(async () => {
            timedOut = true;
            try {
                await container?.kill();
            } catch {
                // already exited on its own — nothing to kill
            }
        }, tle || 5000);

        const result = await container.wait();
        clearTimeout(timeout);

        const exitCode = result?.StatusCode ?? null;
        if (timedOut) {
            return { status: 'timeout', exitCode, output };
        }
        return {
            status: exitCode === 0 ? 'success' : 'failed',
            exitCode,
            output
        };
    } catch (error) {
        // Never let a bad submission take the server down.
        console.error('Error while running code:', error);
        return {
            status: 'error',
            exitCode: null,
            output: error instanceof Error ? error.message : String(error)
        };
    }
}
