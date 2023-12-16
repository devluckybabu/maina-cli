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
import createExpressMiddleware from "../functions/create-express-middleware.js";
import createExpressRoute from "../functions/create-express-route.js";
import createExpressApiHandler from "../functions/create-express-api-handler.js";
export const createExpressFileAction = ({ schema, output }) => __awaiter(void 0, void 0, void 0, function* () {
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
});
