import express from 'express'
import cors from 'cors'
import { serverConfig } from './config/serverconfig.js'
import { ConnectDb } from './config/dbconfig.js'
import { router } from './routers/index.js'


const app=express()

app.use(express.json())
app.use(cors({
    "origin":"*"
}))
app.use(router)

app.listen(serverConfig.PORT , async()=>{
    await ConnectDb()
    console.log("server is up and running on port number " , serverConfig.PORT)
})