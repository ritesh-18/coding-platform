import type { ProblemRepository } from "../repository/problem.repository";
import type { IProblemTReqBody, IUpdateProblemTReqBody } from "../types/problems";
import { santize } from "../utils/markdown-parser/markdown.sanatizer";
import { NotFoundError } from "../utils/errors/app.error";


export class ProblemService {
    constructor(private problemrepo: ProblemRepository) { }
    async createProblem(args: IProblemTReqBody) {
        // we have to parsed the markdown data 
        const santizedPayload = {
            ...args,
            description: await santize(args.description)
        }
        return await this.problemrepo.createProblem(santizedPayload)
    }
    async fetchProblem(pid: string) {
        const problem = await this.problemrepo.fetchProblem(pid)
        if (!problem) {
            throw new NotFoundError("No problem found")
        }
        return problem
    }
    async fetchAllProblem() {
        const problem = await this.problemrepo.fetchAllProblem();
        if (!problem) throw new Error("No problem found")
        return problem
    }
    async updateProblem(id: string, args: IUpdateProblemTReqBody) {
        // only sanitize description when it is actually being updated,
        // otherwise a partial update would wipe the stored description
        const santizedPayload: IUpdateProblemTReqBody = { ...args }
        if (args.description !== undefined) {
            santizedPayload.description = await santize(args.description)
        }
        const problem = await this.problemrepo.updateProblem(id, santizedPayload)
        if (!problem) {
            throw new NotFoundError("No problem found")
        }
        return problem
    }
    async deleteProblem(id: string) {
        const problem = await this.problemrepo.deleteProblem(id)
        if (!problem) {
            throw new NotFoundError("No problem found")
        }
        return problem
    }
}