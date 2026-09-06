import type { Document } from "mongoose";
import mongoose from "mongoose";



export enum SubmissionStaus{
    PENDING='pending',
    COMPLING='compiling',
    RUNNING='running',
    COMPLETED='completed',
    FAILED='failed',
    ACCEPTED='accepted',
    WRONG_ANSWER='wrong_answer'
}
enum Language{
    CPP='cpp',
    JAVA='java',
    PYTHON='python',
    JAVASCRIPT='javascript'
}

export interface ISubmissionProblem extends Document {
    pid:string,
    code:string, 
    status:SubmissionStaus,
    language:string,
    createdAt: Date,
    updatedAt: Date
}


const SubmissionSchema = new mongoose.Schema<ISubmissionProblem>({
    pid: { type: String, required: true },
    code: { type: String, required: true },
    status: {
        type: String,
        // The enum validator restricts the value to these options
        enum:Object.values(SubmissionStaus),
        default:SubmissionStaus.PENDING,
    },
    language:{type:String , required:true , enum:Object.values(Language)}
},{timestamps:true})



//create a Problem Model

export const  Submission=mongoose.model<ISubmissionProblem>('ProblemSubmission' ,SubmissionSchema )