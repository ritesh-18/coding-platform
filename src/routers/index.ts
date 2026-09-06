import { submissionRouter } from "./submission.router";
import express from 'express'



export const router=express.Router()
router.use("/submission" , submissionRouter)