import * as dotenv from 'dotenv'
dotenv.config()


interface serverConfigInterface{
    PORT:number,
    DB_URL:string
}

export const serverConfig:serverConfigInterface={
    PORT:Number(process.env.PORT)||3000,
    DB_URL:String(process.env.DB_URL)||""
}
