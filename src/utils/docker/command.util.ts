export const Command = {
  python: (code: string, input: string) =>
    `echo ${Buffer.from(code).toString('base64')} | base64 -d > /code.py && ` +
    `echo ${Buffer.from(input).toString('base64')} | base64 -d > /input.txt && ` +
    `python3 /code.py < /input.txt`,

  javascript: (code: string, input: string) =>
    `echo ${Buffer.from(code).toString('base64')} | base64 -d > /code.js && ` +
    `echo ${Buffer.from(input).toString('base64')} | base64 -d > /input.txt && ` +
    `node /code.js < /input.txt`,
}
