import type { ProblemService } from "../services/problem.service";
import type { IProblemTReqBody, IUpdateProblemTReqBody } from "../types/problems";
import type { NextFunction, Request , Response } from "express";

export class ProblemController{
    constructor(private problemservice:ProblemService){}
    async createProblem(req:Request, res:Response , next:NextFunction){
        try {
            const args=req.body;
            const response=await this.problemservice.createProblem(args)
            res.status(201).json({
                message:"problem created successfully",
                data:response
            })
        } catch (error) {
            res.status(500).json({
                msg:"Error while creating new Problem",
                success:false,
                error
            })
        }
    }
    async fetchProblem(req:Request ,res:Response ,next:NextFunction ){
        try {
            const id=req.params.id || "";
            const response=await this.problemservice.fetchProblem(String(id))
            res.status(201).json({
                message:"problem fetched successfully",
                data:response
            })
        } catch (error) {
            res.status(500).json({
                msg:"Error while fetching a Problem",
                success:false,
                error
            })
        }
    }
    async fetchAllProblem(req:Request , res:Response,next:NextFunction ){
        try {
            const response=await this.problemservice.fetchAllProblem()
            res.status(201).json({
                message:"problem fetched successfully",
                data:response
            })
        } catch (error) {
            res.status(500).json({
                msg:"Error while fecthing all Problem",
                success:false,
                error
            })
        }
    }
    async updateProblem(req:Request , res:Response ,next:NextFunction){
        try {
            const args=req.body;
            const id=req.params.id
            const response=await this.problemservice.updateProblem(String(id) , args)
            res.status(201).json({
                message:"problem updated successfully",
                data:response
            })
        } catch (error) {
            res.status(500).json({
                msg:"Error while updating Problem",
                success:false,
                error
            })
        }
    }
    async deleteProblem(req:Request , res:Response ,next:NextFunction){
        try {
            const id=req.params.id;
            const response=await this.problemservice.deleteProblem(String(id))
            res.status(201).json({
                message:"problem deleted successfully",
                data:response
            })
        } catch (error) {
            res.status(500).json({
                msg:"Error while deleting a Problem",
                success:false,
                error
            })
        }
    }
}