import type { IProblemTReqBody, IUpdateProblemTReqBody } from "../types/problems";


export class ProblemRepository{
    createProblem(args:IProblemTReqBody){}
    fetchProblem(pid:string){}
    fetchAllProblem(){}
    updateProblem(args:IUpdateProblemTReqBody){}
    deleteProblem(pid:string){}
}