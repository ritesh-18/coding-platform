import express from 'express'
import { Problem } from '../models/problems.model';
import { ProblemController } from '../controllers/problem.controller';


export const problemRouter=express.Router();


const problemcontroller=new ProblemController();

problemRouter.post("/",async(req, res)=>{
    try {
    const bodydata=req.body;
    const problem1=new Problem(bodydata)
    await problem1.save()
    res.status(201).json(
        {
            msg:"problem created !!",
            success:true,
            data:problem1
        }
    )
    } catch (error) {
        res.status(500).json({
            successs:false,
            error
        })
        
    }
    
})