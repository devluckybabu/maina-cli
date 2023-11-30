import { createDir, createFile } from "../method/index.js";
const createCleint = (projectDir, models) => {
    const currentDir = createDir(projectDir + '\\client');
    const file = `${currentDir}\\index.ts`;
    const classModels = models.map((model) => {
        let name = model.slice(1);
        name = model.charAt(0).toLowerCase() + name;
        return `this.${name}= new ${model}Resources(config)`;
    });
    const importModels = models.map((model) => `import ${model}Resources from './${model.toLowerCase()}';`);
    const new_models = models.map((model) => {
        let name = model.slice(1);
        name = model.charAt(0).toLowerCase() + name;
        return `${name}: ${model}Resources;`;
    });
    //create index file
    createFile(file, `import BaseResources from './base-resources';
import Config from '../interfaces/config';
${importModels.join('\n')}


class Cleint extends BaseResources{
  ${new_models.join('\n')}

  constructor(config: Config){
    super(config);
    ${classModels.join('\n')}
  }

}

export default Cleint;`);
};
export default createCleint;
