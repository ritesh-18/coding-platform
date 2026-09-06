
import axios, { AxiosResponse } from 'axios'
import { serverConfig } from '../config/serverconfig'

export interface ITestcase {
    input: string,
    output: string
}

export interface IProblem {
    title: string,
    description: string,
    difficulty: "easy" | "medium" | "hard",
    testcases: ITestcase[],
    createdAt: Date,
    updatedAt: Date
}
export interface IProblemResponse {
    data: IProblem,
    success: boolean,
    message: string
}
export async function fetchProblemById(id: string): Promise<IProblem | null> {
    try {
        const res: AxiosResponse<IProblemResponse> = await axios.get(`${serverConfig.PROBLEM_API}/problems/${id}`)
        if (!res.data.success) {
            throw new Error("Data fetched failed")
        }
        return res.data.data;
    } catch (error) {
        console.log("Something went wrong while fetching data")
        return null;
    }

}
export async function updateProblemStatus(id: string, status: string): Promise<boolean> {
    try {
        const res: AxiosResponse<{ success: boolean, message: string }> = await axios.patch(`${serverConfig.PROBLEM_API}/problems/${id}`, { status })   
    }
    catch (error) {
        console.log("Something went wrong while updating problem status")
        return false;
    }
    return true;
}