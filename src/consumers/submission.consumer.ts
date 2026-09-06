//we have to  fetch the data events from the queue (pull method) and consume it 
import { Worker } from 'bullmq';
import { initRedis } from '../config/redis.config';


export async function initWorker() {

    const worker = new Worker('Submission', async job => {
        //attach service layer logic here
        console.log("worker consuming this " ,job?.data?.data?.testcases , " job" )
        //call function(need to compile and then run and then send back to the user (either on the msg queues or using pubsub))
        
    }, {
        connection: initRedis, // Attached here(if worker is seperate service then pass correct config)
        concurrency: 5
    });


    worker.on("completed" , (job)=>{
        console.log("Worker completed this job: " , job.id)
    })
    worker.on("failed" , (job , err)=>{
          console.log("Worker has failed to process this job : " , job?.id , " with error " , err );
          
    })

}


