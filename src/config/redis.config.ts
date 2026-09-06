import Redis from "ioredis";
import { serverConfig } from "./serverconfig";

const config={
  port: +serverConfig.REDIS_PORT, 
  host: serverConfig.REDIS_HOST, // Redis host
  db: 0, // Defaults to 0
  maxRetriesPerRequest:null
}

export const redis =new Redis(config);


redis.on("error" , (err)=>{
    console.error("Redis connection failed : " , err)
})

redis.on("connect" , ()=>{
    console.info("Redis connected successfully")
})

// this function used when you want to create another redis connection obj;
export function initRedis(){
    try {
        return new Redis(config)
    } catch (error) {
        console.error(error)
        throw error
    }
}