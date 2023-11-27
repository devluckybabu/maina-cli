import { createDir, createFile } from "../method/index.js";
import updateQueries from "../queries/update-queries.js";
import updateSingleQueries from "../queries/update-single-queries.js";
const createUpdateMethod = (outDir, model) => {
    const dir = `${outDir}\\update\\${model.toLowerCase()}`;
    const currentDir = createDir(dir);
    const file = `${currentDir}\\index.ts`;
    createFile(file, updateQueries(model).join('\n'));
    createFile(`${currentDir}\\[id].ts`, updateSingleQueries(model).join('\n'));
    console.log("File created of " + file);
};
export default createUpdateMethod;
