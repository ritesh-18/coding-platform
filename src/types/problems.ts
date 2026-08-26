


export interface ITestcase {
    input: string,
    output: string
}

export interface IProblemTReqBody {
    title: string,
    description: string,
    difficulty: "easy" | "medium" | "hard",
    testcases: ITestcase[],
}

export interface IUpdateProblemTReqBody {
    title?: string,
    description?: string,
    difficulty?: "easy" | "medium" | "hard",
    testcases?: ITestcase[],
}