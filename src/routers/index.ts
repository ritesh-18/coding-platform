import { problemRouter } from "./problem.router";
import express from 'express'



export const router=express.Router()
router.use("/problems" , problemRouter)