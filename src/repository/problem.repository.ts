import mongoose from "mongoose";
import { Problem, type IProblem } from "../models/problems.model";
import type { IProblemTReqBody, IResProblem, IUpdateProblemTReqBody } from "../types/problems";


export interface IProblemRepository {
    createProblem(args: IProblemTReqBody): Promise<IResProblem>
    fetchProblem(pid: string): Promise<IProblem | null>
    fetchAllProblem(): Promise<Partial<IProblem>[] | []>
    updateProblem(id: string, args: IUpdateProblemTReqBody): Promise<Partial<IProblem> | null>
    deleteProblem(pid: string): Promise<IProblem | null>
}


export class ProblemRepository implements IProblemRepository {
    async createProblem(args: IProblemTReqBody): Promise<IResProblem> {
     const problem = new Problem(args)
        return await problem.save()
    }
    async fetchAllProblem(): Promise<Partial<IProblem>[] | []> {

        return await Problem.find()
    }
    async fetchProblem(pid: string): Promise<IProblem | null> {
        return await Problem.findOne({ _id: pid })
    }
    async updateProblem(id: string, args: IUpdateProblemTReqBody): Promise<IProblem | null> {
        return await Problem.findOneAndUpdate(
            { _id: id },
            { $set: args },
            { new: true, runValidators: true } // Returns the updated document instead of the old one
        );
    }
    async deleteProblem(id: string): Promise<IProblem | null> {
        return await Problem.findOneAndDelete({ _id: id })
    }

}