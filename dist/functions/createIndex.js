import { createFile } from "../method/index.js";
const createIndex = (projectDir) => {
    const file = `${projectDir}\\src\\index.ts`;
    //create index file
    createFile(file, `export * from './models';
  import Admin from './admin';
import Store from './store';
import { Config } from './models';

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
