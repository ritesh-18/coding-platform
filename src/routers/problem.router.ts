import express from 'express'
import { Problem } from '../models/problems.model';
import { ProblemController } from '../controllers/problem.controller';
import { ProblemRepository } from '../repository/problem.repository';
import { ProblemService } from '../services/problem.service';


export const problemRouter=express.Router();
const repo=new ProblemRepository()
const service=new ProblemService(repo)
const problemcontroller=new ProblemController(service);
problemRouter.post("/" , problemcontroller.createProblem.bind(problemcontroller))
problemRouter.get("/:id" , problemcontroller.fetchProblem.bind(problemcontroller))
problemRouter.get("/" , problemcontroller.fetchAllProblem.bind(problemcontroller))
problemRouter.delete('/:id', problemcontroller.deleteProblem.bind(problemcontroller))
problemRouter.patch('/:id', problemcontroller.updateProblem.bind(problemcontroller))