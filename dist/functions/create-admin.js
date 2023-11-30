import { createDir, createFile } from "../method/index.js";
const createAdmin = (projectDir, models) => {
    const currentDir = createDir(projectDir + '\\admin');
    const file = `${currentDir}\\index.ts`;
    const classModels = models.map((model) => {
        let name = model.slice(1);
        name = model.charAt(0).toLowerCase() + name;
        return `this.${name}= new ${model}Resources(config)`;
    });
    const importModels = models.map((model) => `import ${model}Resources from './${model.toLowerCase()}';`);
    //new models
    const new_models = models.map((model) => {
        let name = model.slice(1);
        name = model.charAt(0).toLowerCase() + name;
        return `${name}: ${model}Resources;`;
    });
    //create index file
    createFile(file, `import BaseResources from './base-resources';
import Config from '../interfaces/config';
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
