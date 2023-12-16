import { createDir, createFile } from "../method/index.js";
import postQueries from "../queries/post-queries.js";
const createPostMethod = (outDir, model) => {
    const dir = `${outDir}\\post\\${model.toLowerCase()}`;
    const currentDir = createDir(dir);
    const file = `${currentDir}\\index.ts`;
    createFile(file, postQueries(model).join('\n'));
};
export default createPostMethod;
