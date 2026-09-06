import { ISubmissionProblem, Submission, SubmissionStaus } from "../models/problems.model"

export interface ISubmissionRepository {
    createProblem(args: ISubmissionProblem): Promise<ISubmissionProblem>
    fetchProblem(pid: string): Promise<ISubmissionProblem | null>
    fetchAllProblem(): Promise<Partial<ISubmissionProblem>[] | []>
    updateProblemStatus(id: string, status: SubmissionStaus): Promise<Partial<ISubmissionProblem> | null>
    deleteProblem(pid: string): Promise<ISubmissionProblem | null>
}


export class SubmissionRepository implements ISubmissionRepository {
    async createProblem(args: Partial<ISubmissionProblem>): Promise<ISubmissionProblem> {
     const problem = new Submission(args)
     console.log("problem created in repo", args)
        return await problem.save()
    }
    async fetchAllProblem(): Promise<Partial<ISubmissionProblem>[] | []> {

        return await Submission.find()
    }
    async fetchProblem(pid: string): Promise<ISubmissionProblem | null> {
        return await Submission.findOne({ _id: pid })
    }
    async updateProblemStatus(id: string, status: SubmissionStaus): Promise<ISubmissionProblem | null> {
        return await Submission.findOneAndUpdate(
            { _id: id },
            { $set: {status} },
            { new: true, runValidators: true } // Returns the updated document instead of the old one
        );
    }
    async deleteProblem(id: string): Promise<ISubmissionProblem | null> {
        return await Submission.findOneAndDelete({ _id: id })
    }

}