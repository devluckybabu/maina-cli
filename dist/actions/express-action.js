import path from "path";
import { getPrismaClient, runCommand } from "../method/index.js";
import { existsSync, realpathSync } from "fs";
import createExpressMiddleware from "../functions/create-express-middleware.js";
import createExpressRoute from "../functions/create-express-route.js";
import createExpressApiHandler from "../functions/create-express-api-handler.js";
export const createExpressFileAction = async ({ schema, output }) => {
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
            createExpressMiddleware(outDir);
            createExpressApiHandler(outDir);
            createExpressRoute(models, outDir);
        }
        else
            console.log("Prisma's schema does't exist on ", schema_path);
    }
    catch (error) {
        console.log(error);
    }
};
