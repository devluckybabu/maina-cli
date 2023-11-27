import { createDir, createFile } from "../method/index.js";
import deleteQueries from "../queries/delete-queries.js";
import deleteSingleQueries from "../queries/delete-single-queries.js";
const createDeleteMethod = (outDir, model) => {
    const dir = `${outDir}\\delete\\${model.toLowerCase()}`;
    const currentDir = createDir(dir);
    const file = `${currentDir}\\index.ts`;
    createFile(file, deleteQueries(model).join('\n'));
    createFile(`${currentDir}\\[id].ts`, deleteSingleQueries(model).join('\n'));
    console.log("File created of " + file);
};
export default createDeleteMethod;
