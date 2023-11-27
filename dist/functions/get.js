import { createDir, createFile } from "../method/index.js";
import countQueries from "../queries/count-queries.js";
import getQueries from "../queries/get-queries.js";
import getSingleQueries from "../queries/get-single-queries.js";
import groupQueries from "../queries/group-quries.js";
import listQueries from "../queries/list-queries.js";
const createGetMethod = (outDir, model) => {
    const dir = `${outDir}\\get\\${model.toLowerCase()}`;
    const currentDir = createDir(dir);
    const file = `${currentDir}\\index.ts`;
    createFile(file, getQueries(model).join('\n'));
    createFile(`${currentDir}\\list.ts`, listQueries(model).join('\n'));
    createFile(`${currentDir}\\group.ts`, groupQueries(model).join('\n'));
    createFile(`${currentDir}\\count.ts`, countQueries(model).join('\n'));
    createFile(`${currentDir}\\[id].ts`, getSingleQueries(model).join('\n'));
    console.log("File created of " + file);
};
export default createGetMethod;
