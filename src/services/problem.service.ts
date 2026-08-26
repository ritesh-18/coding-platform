import type { IProblemTReqBody, IUpdateProblemTReqBody } from "../types/problems";


export class ProblemService{
    createProblem(args:IProblemTReqBody){}
    fetchProblem(pid:string){}
    fetchAllProblem(){}
    updateProblem(args:IUpdateProblemTReqBody){}
    deleteProblem(pid:string){}
}