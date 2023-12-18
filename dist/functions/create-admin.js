import pluralize from "pluralize-esm";
import { createDir, createFile } from "../method/index.js";
const createAdmin = (projectDir, models) => {
    const currentDir = createDir(projectDir + '\\admin');
    const file = `${currentDir}\\index.ts`;
    const classModels = models.map((model) => {
        let name = model.slice(1);
        name = model.charAt(0).toLowerCase() + name;
        name = pluralize(name);
        return `this.${name}= new ${pluralize(model)}Resource(config);`;
    });
    const importModels = models.map((model) => {
        let name = model.slice(1);
        name = model.charAt(0).toLowerCase() + name;
        name = pluralize(name);
        return `import ${pluralize(model)}Resource from './${name}';`;
    });
    //new models
    const new_models = models.map((model) => {
        let name = model.slice(1);
        name = model.charAt(0).toLowerCase() + name;
        name = pluralize(name);
        return `${name}: ${pluralize(model)}Resource;`;
    });
    //create index file
    createFile(file, `import BaseResources from './base-resources';
import { Config } from '../interfaces';
${importModels.join('\n')}


class Admin extends BaseResources{
  ${new_models.join('\n')}

  constructor(config: Config){
    super(config);
    ${classModels.join('\n')}
  }
}

export default Admin;`);
};
export default createAdmin;
