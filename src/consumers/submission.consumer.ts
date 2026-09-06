//we have to  fetch the data events from the queue (pull method) and consume it 
import { Worker } from 'bullmq';
import { initRedis } from '../config/redis.config';
import { JavaScriptImage, PythonImage } from '../utils/constant/images.constant';
import { codeRunner } from '../utils/docker/codeRunner.util';
import { updateProblemStatus, type ITestcase } from '../apis/problem.api';
import { SubmissionStaus } from '../models/problems.model';
import { SubmissionService } from '../services/submission.service';
import { service } from '../routers/submission.router';


// Container output arrives with \r\n (Tty:true) and a trailing newline from
// print/console.log, so both sides need the same shape before comparing.
function normalize(text: string): string {
    return text
        .replace(/\r\n/g, "\n")
        .split("\n")
        .map(line => line.trimEnd())
        .join("\n")
        .trim();
}

export async function initWorker() {

    const worker = new Worker('Submission', async job => {
        //attach service layer logic here
        console.log("worker consuming this ", job?.data?.data?.testcases, " job")
        //call function(need to compile and then run and then send back to the user (either on the msg queues or using pubsub))
        try {
            // call the executor function here and pass the job data to it
            const { submissionId, pid, submittedCode, language, testcases } = job?.data?.data;

            console.log(`\n=== Judging submission for problem ${pid} (${language}) ===`);

            // Testcases are independent, so run them concurrently. Each gets its
            // own container; the worker's `concurrency: 5` still bounds how many
            // submissions run at once.
            const results = await Promise.all(
                (testcases ?? []).map(async (testcase: ITestcase, index: number) => {
                    const run = await codeRunner({
                        code: submittedCode,
                        input: testcase.input,
                        imageName: language === 'python' ? PythonImage : JavaScriptImage,
                        language: language
                    });

                    const actual = normalize(run.output);
                    const expected = normalize(testcase.output);
                    const ok = run.status === 'success' && actual === expected;

                    const verdict = ok
                        ? 'PASS'
                        : run.status === 'timeout' ? 'TLE'
                            : run.status === 'error' ? 'ERROR'
                                : 'FAIL';

                    return { index: index + 1, verdict, ok, input: testcase.input, expected, actual };
                })
            );

            for (const r of results) {
                console.log(
                    `  testcase ${r.index}: ${r.verdict}\n` +
                    `    input:    ${JSON.stringify(r.input)}\n` +
                    `    expected: ${JSON.stringify(r.expected)}\n` +
                    `    actual:   ${JSON.stringify(r.actual)}`
                );
            }

            const passed = results.filter(r => r.ok).length;
            const total = testcases?.length ?? 0;
            // SubmissionStaus is a TS enum, so the DB layer needs the enum member
            // rather than a bare string literal.
            const status = passed === total
                ? SubmissionStaus.ACCEPTED
                : SubmissionStaus.WRONG_ANSWER;
            console.log(`=== RESULT: ${status.toUpperCase()} (${passed}/${total} passed) ===\n`);
            // write the verdict back against the SUBMISSION id, not the problem id
            await service.updateProblem(submissionId, status);
            return { status, passed, total, results };
        } catch (error) {
            console.error("Error occurred while processing job:", error);
            return null;
        }

    }, {
        connection: initRedis, // Attached here(if worker is seperate service then pass correct config)
        concurrency: 5
    });


    worker.on("completed", (job) => {
        console.log("Worker completed this job: ", job.id)
    })
    worker.on("failed", (job, err) => {
        console.log("Worker has failed to process this job : ", job?.id, " with error ", err);

    })

}


