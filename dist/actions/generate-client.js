import path from "path";
import inquirer from "inquirer";
import { cpSync, existsSync } from "fs";
import { createDir, getPrismaClient, runCommand } from "../method/index.js";
import createClientMethod from "../functions/create-cleint-method.js";
import createClass from "../functions/create-class.js";
import createBaseRescources from "../functions/create-base-resources.js";
import createAdmin from "../functions/create-admin.js";
import createIndex from "../functions/createIndex.js";
import createCleint from "../functions/create-cleint.js";
import createModels from "../functions/create-models.js";
const prompt = inquirer.prompt;
const generateClientAction = async ({ schema }) => {
    try {
        const currentDir = process.cwd();
        const options = await prompt([{
                name: "schema",
                type: 'input',
                message: "Enter prisma schema location: ",
                default: typeof schema == "string" ? schema : "prisma/schema.prisma",
            }, {
                name: 'output',
                type: 'input',
                default: "maina",
                message: "Enter output directory: ",
            }]);
        const schema_path = path.join(currentDir, options?.schema);
        if (existsSync(schema_path)) {
            runCommand(`npx prisma generate --schema ${options?.schema}`);
            const projectDir = schema_path.split('\\').slice(0, -2).join('\\');
            const { Prisma } = await getPrismaClient(projectDir);
            const outDir = createDir(path.join(process.cwd(), options?.output));
            cpSync(`${projectDir}\\node_modules\\.prisma\\client`, path.join(outDir, 'prisma'), { recursive: true });
            createClientMethod(outDir);
            createBaseRescources(outDir, 'admin');
            createBaseRescources(outDir, 'store');
            const models = Object.values(Prisma.ModelName);
            createAdmin(outDir, models);
            createCleint(outDir, models);
            for (let model of models) {
                createClass(outDir, model, "store");
                createClass(outDir, model, "admin");
            }
            createIndex(outDir);
            createModels(outDir, models);
        }
        else {
            console.log("Prisma schema file doesn't exist on ", schema_path);
            process.exit(-1);
        }
    }
    catch (error) {
        console.log(error);
        process.exit(-1);
    }
};
export default generateClientAction;
