import inquirer from "inquirer";
import { createExpressFileAction } from "./express-action.js";
const prompt = inquirer.prompt;
const generateAction = async ({ schema, output }) => {
    try {
        const options = await prompt([{
                name: "schema",
                type: 'input',
                message: "Enter prisma schema location:",
                default: typeof schema == "string" ? schema : "prisma/schema.prisma",
            }, {
                name: 'output',
                type: 'input',
                message: "Enter output directory:",
                default: typeof output == "string" ? output : "output",
            }]);
        await createExpressFileAction({
            schema: options?.schema,
            output: options?.output
        });
    }
    catch (error) {
        console.log(error);
    }
};
export default generateAction;
