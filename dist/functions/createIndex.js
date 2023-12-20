import { createFile } from "../method/index.js";
const createIndex = (projectDir) => {
    const file = `${projectDir}\\index.ts`;
    //create index file
    createFile(file, `import Admin from './admin';
import Store from './store';
import { Config } from './interfaces';

class Maina extends Store{
  admin: Admin;
  constructor(config: Config){
    super(config);
    this.admin = new Admin(config);
  }
}

export default Maina;`);
};
export default createIndex;
