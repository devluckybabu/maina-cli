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
import { getPrismaClient, runCommand } from "../method/index.js";
import { existsSync, realpathSync } from "fs";
import createPostMethod from "./post.js";
import createGetMethod from "./get.js";
import createUpdateMethod from "./update.js";
import createDeleteMethod from "./delete.js";
import createMiddleware from "./middleware.js";
const methods = ["GET", "POST", "UPDATE", "DELETE"];
export const createFileAction = ({ schema, output, method = methods }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cwd = process.cwd();
        const schema_path = path.join(cwd, schema);
        if (existsSync(schema_path)) {
            runCommand("npx prisma generate --schema " + schema);
            const realPath = realpathSync(schema);
            const projectDir = realPath.split('\\').slice(0, -2).join('/');
            const { Prisma } = yield getPrismaClient(projectDir);
            const outDir = path.join(projectDir, output);
            const models = Object.values(Prisma.ModelName);
            createMiddleware(projectDir);
            models.forEach((model) => {
                if (method === null || method === void 0 ? void 0 : method.length) {
                    method.forEach((m) => {
                        if (m == "GET") {
                            createGetMethod(outDir, model);
                        }
                        else if (m == "POST") {
                            createPostMethod(outDir, model);
                        }
                        else if (m === "UPDATE") {
                            createUpdateMethod(outDir, model);
                        }
                        else if (m == "DELETE") {
                            createDeleteMethod(outDir, model);
                        }
                        else
                            console.log("Invalid Method");
                    });
                }
                else
                    throw Error("Invalid Methods");
            });
        }
        else
            console.log("Prisma's schema does't exist on ", schema_path);
    }
    catch (error) {
        console.log(error);
    }
});
