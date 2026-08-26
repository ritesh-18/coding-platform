import type { IProblem } from "../models/problems.model";
import type { IProblemTReqBody, IResProblem, IUpdateProblemTReqBody } from "../types/problems";


export interface ProblemRepository{
    createProblem(args:IProblemTReqBody):Promise<IResProblem>
    fetchProblem(pid:string):Promise<IProblem>
    fetchAllProblem():Promise<IProblem[]>
    updateProblem(args:IUpdateProblemTReqBody):Promise<Partial<IProblem>>
    deleteProblem(pid:string):Promise<void>
}