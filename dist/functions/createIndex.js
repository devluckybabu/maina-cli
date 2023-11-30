import { createFile } from "../method/index.js";
const createIndex = (projectDir) => {
    const file = `${projectDir}\\index.ts`;
    //create index file
    createFile(file, `import Admin from './admin';
import Client from './client';
import Config from './interfaces/config';

class Sirzon extends Client{
  admin: Admin;
  constructor(config: Config){
    super(config);
    this.admin = new Admin(config);
  }
}

export default Sirzon;`);
};
export default createIndex;
