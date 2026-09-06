import { PythonImage } from "../constant/images.constant";
import { createContainer } from "./createcontainer.utils";



export async function pythonRunner(code: string) {
    const exeCode = `echo '${code}' > /code.py && python3 /code.py`
    const container = await createContainer({
        ImageName: PythonImage,
        Command: ['/bin/bash', '-c', exeCode],
        MemoryLimit: 1024 * 1024 * 100, // 100 MB
        CpuLimit: 50000 // 50% of a single CPU core
    })
    await container?.start()
    const result = await container?.wait();          // exit code
    const logs = await container?.logs({ stdout: true, stderr: true });
    console.log("exit code:", result?.StatusCode);
    console.log("output:", logs?.toString('utf8'));
}