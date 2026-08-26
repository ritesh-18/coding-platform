import mongoose from "mongoose";
import { serverConfig } from "./serverconfig.js";

import dns from 'node:dns';
import { error } from "node:console";
// Or if using CommonJS: const dns = require('node:dns');

dns.setServers(['8.8.8.8', '8.8.4.4']);

export async function ConnectDb(){
    try {
        await mongoose.connect(serverConfig.DB_URL)
        console.log("DB connected !!!")
        mongoose.connection.on("error",(error)=>{
            throw new Error("Db connection failed")
        })
        
    } catch (error) {
        console.error("DB connection failed!!! " , error)
    }
}