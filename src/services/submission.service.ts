import { fetchProblemById } from "../apis/problem.api";
import { ISubmissionProblem, SubmissionStaus } from "../models/problems.model";
import { addSubmission } from "../producers/submission.producer";
import { SubmissionRepository } from "../repository/submission.repository";
import { BadRequestError, NotFoundError } from "../utils/errors/app.error";


export class SubmissionService {
    constructor(private problemrepo: SubmissionRepository) { }
    async createProblem(args: Partial<ISubmissionProblem>) {
        //steps
        /**
         * step1: valdate the problem id , then fetch the problem info from the db , then save into the submission db , then push into the queues
         */
        //fetch the prblem
        if (!args.pid) {
            throw new BadRequestError("Problem id required!!!")
        }
        const problemData = await fetchProblemById(args.pid)
        if (!problemData) {
            throw new NotFoundError("Problem data not found while fetching. ")
        }
        const problem = await this.problemrepo.createProblem(args)
        // now push to queue
        const jobId = await addSubmission({
            sid: problem.pid,
            data: {
                // the submission's own id — needed to write the verdict back
                submissionId: String(problem._id),
                pid: problem.pid,
                submittedCode: problem.code,
                language: problem.language,
                testcases: problemData.testcases
            }
        });
        return { jobId };
    }
    async fetchProblem(pid: string) {
        const problem = await this.problemrepo.fetchProblem(pid)
        if (!problem) {
            throw new NotFoundError("Problem does not exist.")
        }
        return problem
    }
    async fetchAllProblem() {
        const problem = await this.problemrepo.fetchAllProblem();
        if (!problem) throw new Error("No problem found")
        return problem
    }
    async updateProblem(id: string, status: SubmissionStaus) {
        // only sanitize description when it is actually being updated,
        // otherwise a partial update would wipe the stored description
        return await this.problemrepo.updateProblemStatus(id, status)
    }
    async deleteProblem(id: string) {
        const problem = await this.problemrepo.deleteProblem(id)
        if (!problem) {
            throw new NotFoundError("No problem found")
        }
        return problem
    }
}