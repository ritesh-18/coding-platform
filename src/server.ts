import express from 'express'
import cors from 'cors'
import { serverConfig } from './config/serverconfig.js'
import { ConnectDb } from './config/dbconfig.js'
import { router } from './routers/index.js'
import { initWorker } from './consumers/submission.consumer.js'
import { getAllImages } from './utils/docker/pullimage.utils.js'
import { createContainer } from './utils/docker/createcontainer.utils.js'
import { JavaScriptImage, PythonImage } from './utils/constant/images.constant.js'
import { pythonRunner } from './utils/docker/pythonRunner.utils.js'
import { codeRunner } from './utils/docker/codeRunner.util.js'


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
    // await testCodeRunner()
    console.log("server is up and running on port number ", serverConfig.PORT)
})


async function testCodeRunner() {
    const run = await codeRunner({
        imageName: JavaScriptImage,
        code: `
        const input = require('fs').readFileSync(0, 'utf8');   // fd 0 = stdin
        const a = input.trim();
        console.log("Hello World " + a);

        `,
        input: "Ritesh",
        language: "javascript",
        tle: 1000
    });
    console.log("run:", run.output.toString());

}