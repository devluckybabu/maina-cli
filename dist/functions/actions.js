import path from "path";
import { getPrismaClient, runCommand } from "../method/index.js";
import { existsSync, realpathSync } from "fs";
import createPostMethod from "./post.js";
import createGetMethod from "./get.js";
import createUpdateMethod from "./update.js";
import createDeleteMethod from "./delete.js";
import createMiddleware from "./middleware.js";
const methods = ["GET", "POST", "UPDATE", "DELETE"];
export const createFileAction = async ({ schema, output, method = methods }) => {
    try {
        const cwd = process.cwd();
        const schema_path = path.join(cwd, schema);
        if (existsSync(schema_path)) {
            runCommand("npx prisma generate --schema " + schema);
            const realPath = realpathSync(schema);
            const projectDir = realPath.split('\\').slice(0, -2).join('/');
            const { Prisma } = await getPrismaClient(projectDir);
            const outDir = path.join(projectDir, output);
            const models = Object.values(Prisma.ModelName);
            createMiddleware(projectDir);
            models.forEach((model) => {
                if (method?.length) {
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
};
