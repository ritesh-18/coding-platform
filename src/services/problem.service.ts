import type { ProblemRepository } from "../repository/problem.repository";
import type { IProblemTReqBody, IUpdateProblemTReqBody } from "../types/problems";


export class ProblemService{
    constructor(private problemrepo:ProblemRepository ){}
   async createProblem(args:IProblemTReqBody){
        return await this.problemrepo.createProblem(args)
    }
    async fetchProblem(pid:string){
         return await this.problemrepo.fetchProblem(pid)
    }
    async fetchAllProblem(){
        return await this.problemrepo.fetchAllProblem();
    }
    async updateProblem(id:string , args:IUpdateProblemTReqBody){
        return await this.problemrepo.updateProblem(id , args)
    }
    async deleteProblem(id:string){
        return await this.problemrepo.deleteProblem(id)
    }
}