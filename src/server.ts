import express from 'express'
import cors from 'cors'
import { serverConfig } from './config/serverconfig.js'
import { ConnectDb } from './config/dbconfig.js'
import { router } from './routers/index.js'
import { initWorker } from './consumers/submission.consumer.js'
import { getAllImages } from './utils/docker/pullimage.utils.js'
import { createContainer } from './utils/docker/createcontainer.utils.js'
import { PythonImage } from './utils/constant/images.constant.js'
import { pythonRunner } from './utils/docker/pythonRunner.utils.js'


const app = express()

app.use(express.json())
app.use(cors({
    "origin": "*"
}))
app.use('/api/v1', router)
// app.use()
app.listen(serverConfig.PORT, async () => {
    await ConnectDb()
    await initWorker()
    await getAllImages()
    await pythonRunner(`print("hello ritesh")`);

    console.log("server is up and running on port number ", serverConfig.PORT)
})