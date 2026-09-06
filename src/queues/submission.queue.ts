import { Queue, QueueEvents } from "bullmq";
import { initRedis } from "../config/redis.config";

export const submissionQueue = new Queue("Submission",{
    connection:initRedis,
    defaultJobOptions:{
        attempts:3,
        backoff:{
            type:"exponential",
            delay:2000
        }
    }
});
submissionQueue.on('error',(err)=>{
    console.log("failed to push the events on queue" , err)
})
submissionQueue.on("waiting" , ()=>{
    console.log("Submission job waiting")
})
export const SubmissionEvent= new QueueEvents('Submission')

SubmissionEvent.on("completed" , ()=>{
    console.log("Submission Job completed!!")
})
