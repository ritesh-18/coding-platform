import type { Document } from "mongoose";
import mongoose from "mongoose";

export interface ITestcase {
    input: string,
    output: string
}

export interface IProblem extends Document {
    title: string,
    description: string,
    difficulty: "easy" | "medium" | "hard",
    testcases: ITestcase[],
    createdAt: Date,
    updatedAt: Date
}

//create a schema
const testCaseSchema=new mongoose.Schema<ITestcase>({
      input:{type:String , required:true},
      output:{type:String , required:true}
},{_id:false})

const ProblemSchema = new mongoose.Schema<IProblem>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    difficulty: {
        type: String,
        // The enum validator restricts the value to these three options
        enum: ['easy', 'medium', 'hard'],
        default: 'easy',
        required:true
    },
    testcases: {
        type: [testCaseSchema],
        required:true

    }
},{timestamps:true})



//create a Problem Model

export const  Problem=mongoose.model<IProblem>('Problem' ,ProblemSchema )