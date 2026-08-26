import { problemRouter } from "./problem.router";
import express from 'express'



export const router=express.Router()
router.use("/api/v1" , problemRouter)