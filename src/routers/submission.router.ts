import express from 'express'
import { SubmissionController } from '../controllers/submission.controller';
import { SubmissionRepository } from '../repository/submission.repository';
import { SubmissionService } from '../services/submission.service';


export const submissionRouter=express.Router();
const repo=new SubmissionRepository()
export const service=new SubmissionService(repo)
const problemcontroller=new SubmissionController(service);
submissionRouter.post("/" , problemcontroller.createProblem.bind(problemcontroller))
submissionRouter.get("/:id" , problemcontroller.fetchProblem.bind(problemcontroller))
submissionRouter.get("/" , problemcontroller.fetchAllProblem.bind(problemcontroller))
submissionRouter.delete('/:id', problemcontroller.deleteProblem.bind(problemcontroller))
submissionRouter.patch('/:id', problemcontroller.updateProblem.bind(problemcontroller))