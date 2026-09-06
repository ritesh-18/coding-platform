import { submissionQueue } from "../queues/submission.queue"


export const addSubmission=async(data:any):Promise<string|null>=>{
    try {
        const job=await submissionQueue.add("evaluate-code" ,data);
        return job.id||null
    } catch (error) {
        console.log("Error while pushing event on queue")
        return null;
    }
}