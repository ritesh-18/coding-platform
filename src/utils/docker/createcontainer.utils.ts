
//once image pulled done then we need to create container from that image and then we need to run the code inside that containern 
import Docker from 'dockerode'
interface ContainerConfig{
    ImageName:string,
    Command:string[],
    MemoryLimit:number,
    CpuLimit:number,
}

export async function createContainer(config:ContainerConfig){
    
    try {
        const docker=new Docker()
        const container = await docker.createContainer({
          Image:config.ImageName,
          Cmd:config.Command,
          // Tty:true gives a raw output stream. With Tty:false Docker prefixes
          // every frame with an 8-byte multiplexing header, which corrupts
          // exact-match comparison against expected testcase output.
          Tty:true,
          AttachStdin:true,
          AttachStdout:true,
          AttachStderr:true,
          StdinOnce:true,
          HostConfig:{  
            AutoRemove:true,
            Memory:config.MemoryLimit,
            CpuQuota:config.CpuLimit,
            CpuPeriod:100000,
            NetworkMode:"none"
          }
        })
        console.log("Container created successfully")
        return container;
    } catch (error) {
        console.log("Error occurred while creating container:", error);
        return null;
    }

}