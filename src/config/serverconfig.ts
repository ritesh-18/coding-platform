import * as dotenv from 'dotenv'
dotenv.config()


interface serverConfigInterface{
    PORT:number,
    DB_URL:string,
    REDIS_HOST:string,
    REDIS_PORT:Number,
    PROBLEM_API:string
}

export const serverConfig:serverConfigInterface={
    PORT:Number(process.env.PORT)||3000,
    DB_URL:String(process.env.DB_URL)||"",
    REDIS_HOST:String(process.env.REDIS_HOST)||'localhost',
    REDIS_PORT:Number(process.env.REDIS_PORT)||6379,
    PROBLEM_API:String(process.env.PROBLEM_API)||""
}
