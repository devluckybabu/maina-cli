import path from "path";
import { createDir } from "../method/index.js";
import { createList, createCount, createGroup, createIndex } from "../express/index.js";
const createExpressRoute = (models, projectDir) => {
    models.forEach((model) => {
        const currentDir = createDir(path.join(projectDir, 'routes'));
        createList(currentDir, model);
        createCount(currentDir, model);
        createGroup(currentDir, model);
        createIndex(currentDir, model);
    });
};
export default createExpressRoute;
