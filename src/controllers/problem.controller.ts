import type { ProblemService } from "../services/problem.service";
import type { IProblemTReqBody, IUpdateProblemTReqBody } from "../types/problems";
import type { NextFunction, Request , Response } from "express";
import { AppError } from "../utils/errors/app.error";

// Errors don't serialize with JSON.stringify (their fields are non-enumerable),
// so map them to a status code and a readable message instead.
function sendError(res: Response, error: unknown, fallback: string) {
    if (error instanceof AppError) {
        res.status(error.statusCode).json({ msg: error.message, success: false })
        return
    }
    if (error instanceof Error && error.name === "ValidationError") {
        res.status(400).json({ msg: error.message, success: false })
        return
    }
    if (error instanceof Error && error.name === "CastError") {
        res.status(400).json({ msg: "Invalid id format", success: false })
        return
    }
    console.error(fallback, error)
    res.status(500).json({ msg: fallback, success: false })
}

export class ProblemController{
    constructor(private problemservice:ProblemService){}
    async createProblem(req:Request, res:Response , next:NextFunction){
        try {
            const args=req.body;
            const response=await this.problemservice.createProblem(args)
            res.status(201).json({
                message:"problem created successfully",
                success:true,
                data:response
            })
        } catch (error) {
            sendError(res, error, "Error while creating new Problem")
        }
    }
    async fetchProblem(req:Request ,res:Response ,next:NextFunction ){
        try {
            const id=req.params.id || "";
            const response=await this.problemservice.fetchProblem(String(id))
            res.status(200).json({
                message:"problem fetched successfully",
                success:true,
                data:response
            })
        } catch (error) {
            sendError(res, error, "Error while fetching a Problem")
        }
    }
    async fetchAllProblem(req:Request , res:Response,next:NextFunction ){
        try {
            const response=await this.problemservice.fetchAllProblem()
            res.status(200).json({
                message:"problem fetched successfully",
                success:true,
                data:response
            })
        } catch (error) {
            sendError(res, error, "Error while fecthing all Problem")
        }
    }
    async updateProblem(req:Request , res:Response ,next:NextFunction){
        try {
            const args=req.body;
            const id=req.params.id
            const response=await this.problemservice.updateProblem(String(id) , args)
            res.status(200).json({
                message:"problem updated successfully",
                success:true,
                data:response
            })
        } catch (error) {
            sendError(res, error, "Error while updating Problem")
        }
    }
    async deleteProblem(req:Request , res:Response ,next:NextFunction){
        try {
            const id=req.params.id;
            const response=await this.problemservice.deleteProblem(String(id))
            res.status(200).json({
                message:"problem deleted successfully",
                success:true,
                data:response
            })
        } catch (error) {
            sendError(res, error, "Error while deleting a Problem")
        }
    }
}