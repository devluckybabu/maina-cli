import { createDir, createFile } from "../method/index.js";
const createExpressMiddleware = (outDir) => {
    const currentDir = createDir(outDir);
    const file = `${currentDir}\\middleware.ts`;
    createFile(file, `import { getError, getPayload } from "./api-handler";
import { MainaRequest, MainaResponse, MainaNextHandler } from "./api-handler";

export default async (
  request: MainaRequest,
  res: MainaResponse,
  NextFunction: MainaNextHandler
) => {
  try {
    const { headers: { authorization } } = request;
    const payload = getPayload(authorization, false);
    request.role = payload.role;
    request.entity = payload.entity;
    request.options = payload.options;
    return NextFunction();
  } catch (error) {
    const _error = getError(error);
    return res.json(_error);
  }
}`);
};
export default createExpressMiddleware;
