import Docker from 'dockerode';
import { JSImage, PythonImage } from '../constant/images.constant';

export async function pullImage(imageName: string) {
    const docker = new Docker();
    return new Promise(async (resolve, reject) => {
        await docker.pull(imageName, (err: Error, stream: NodeJS.ReadableStream) => {
            if (err) {
                return reject(err);
            }
            docker.modem.followProgress(stream, function onFinished(err: Error|null, response: any) {
                if (err) {
                    return reject(err);
                }
                return resolve(response);
            },
                function onProgress(event: any) {
                    console.log(event.status);
                }
            )
        });
    });
}

export async function getAllImages(){
    const images=[JSImage, PythonImage]
    try {
        const promises = images.map(pullImage);
        return await Promise.all(promises);
    } catch (error) {
        console.error("Error occurred while pulling images:", error);
        throw error;
    }
}