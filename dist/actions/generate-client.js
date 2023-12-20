var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import path from "path";
import inquirer from "inquirer";
import { cpSync, existsSync } from "fs";
import { createDir, getPrismaClient, runCommand } from "../method/index.js";
import createClientMethod from "../functions/create-cleint-method.js";
import createConfig from "../functions/create-config.js";
import createClass from "../functions/create-class.js";
import createBaseRescources from "../functions/create-base-resources.js";
import createAdmin from "../functions/create-admin.js";
import createIndex from "../functions/createIndex.js";
import createCleint from "../functions/create-cleint.js";
const prompt = inquirer.prompt;
const generateClientAction = ({ schema }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const currentDir = process.cwd();
        const options = yield prompt([{
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
        const schema_path = path.join(currentDir, options === null || options === void 0 ? void 0 : options.schema);
        if (existsSync(schema_path)) {
            runCommand(`npx prisma generate --schema ${options === null || options === void 0 ? void 0 : options.schema}`);
            const projectDir = schema_path.split('\\').slice(0, -2).join('\\');
            const { Prisma } = yield getPrismaClient(projectDir);
            const outDir = createDir(path.join(process.cwd(), options === null || options === void 0 ? void 0 : options.output));
            cpSync(`${projectDir}\\node_modules\\.prisma\\client`, path.join(process.cwd(), 'prisma'), { recursive: true });
            createConfig(outDir);
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
});
export default generateClientAction;
