import path from "path";
import pluralize from 'pluralize-esm';
import { createDir, createFile } from "../method/index.js";
const createClass = (outDir, model, role) => {
    const currentDir = createDir(path.join(outDir, 'src', role));
    let name = model.slice(1);
    name = model.charAt(0).toLowerCase() + name;
    name = pluralize(name);
    if (role === "admin") {
        createFile(`${currentDir}\\${name}.ts`, `import BaseResources from "./base-resources";
import { mergeRoute } from "../method";
import {
  ErrorInfo,
  ListParams,
  ResultInfo, 
  ${model}Args,
  ${model}Model,
  ${model}Options, 
  ${model}CreateInput,
  ${model}UpdateInput,
  ${model}CountOptions, 
  ${model}GroupOptions, 
} from "../models";

const DefaultParams = {
  page: 1,
  limit: 50,
  options: {}
};


class ${pluralize(model)}Resource extends BaseResources {
  private route = "/${pluralize(model.toLowerCase())}";

  //create with batch
  createMany = (data: ${model}CreateInput[], options?:  ${model}Options) => {
    return new Promise<${model}Model[]>(async (resolve, reject) => {
      try {
        const result = await this.post(this.route, { data }, options);
        return resolve(result);
      } catch (error) {
        error = error as ErrorInfo;
        return reject(error)
      }
    })
  }

  //create single item
  create = (data: ${model}CreateInput, options?:  ${model}Options) => {
    return new Promise<${model}Model>(async (resolve, reject) => {
      try {
        const route = this.route + '/add';
        const result = await this.post(route, data, options);
        return resolve(result);
      } catch (error) {
        return reject(error as ErrorInfo);
      }
    })
  }

  //remove item
  deleteItem = (id: string, options?:  ${model}Options) => {
    return new Promise<${model}Model>(async (resolve, reject) => {
      try {
        const route = this.route;
        const result = await this.delete(route, id, options);
        return resolve(result);
      } catch (error) {
        return reject(error as ErrorInfo);
      }
    })
  }

  //remove items
  deleteMany = (id: string[], options?:  ${model}Options) => {
    return new Promise<${model}Model[]>(async (resolve, reject) => {
      try {
        const route = this.route;
        const result = await this.delete(route, id, options);
        return resolve(result);
      } catch (error) {
        return reject(error as ErrorInfo);
      }
    })
  }
  
  //update single item
  updateItem = async (
    id: string,
    data:  ${model}UpdateInput,
    options?:  ${model}Options
  ) => {
    const result = await this.patch(this.route, id, data, options);
    return result as  ${model}Model;
  };

  //update batch items
  updateMany = async (
    data: ${model}UpdateInput[],
    options?: ${model}Options
  ) => {
    const result = await this.patchBatch(this.route, data, options);
    return result as  ${model}Model[];
  };

//get data as list
  list = async ({ limit = 50, page = 1, options = {} }: ListParams<${model}Args> = DefaultParams) => {
    const route = this.route + '/list?limit=' + limit + '&page=' + page;
    const result = await this.get(route, options);
    return result as ResultInfo<${model}Model>;
  } 

  //get all items
  getAll = async (options?: ${model}Args) => {
    const result = await this.get(this.route, options);
    return result as ${model}Model[];
  }


  //get single item
  getItem = async (id: string, options?: ${model}Options) => {
    const path = mergeRoute(this.route, id);
    const result = await this.get(path, options);
    return result as ${model}Model;
  }

  //items count
  count = <CountResult = any>(options?: ${model}CountOptions) => {
    return new Promise<CountResult>(async (resolve, reject) => {
      try {
        const result = await this.get(this.route + "/count", options);
        return resolve(result);
      } catch (error) {
        return reject(error as ErrorInfo);
      }
    })
  }


  groupBy = <GroupResult = any>(options: ${model}GroupOptions) => {
    return new Promise<GroupResult>(async (resolve, reject) => {
      try {
        const result = await this.get(this.route + '/group', options);
        return resolve(result);
      } catch (error) {
        return reject(error as ErrorInfo);
      }
    })
  }
}


export default ${pluralize(model)}Resource;`);
    }
    else {
        createFile(`${currentDir}\\${name}.ts`, `import BaseResources from "./base-resources";
import { mergeRoute } from "../method";
import {
  ErrorInfo,
  ListParams,
  ResultInfo,
  ${model}Args,
  ${model}Model,
  ${model}Options,
  ${model}CountOptions, 
  ${model}GroupOptions, 
} from "../models";

const DefaultParams = {
  page: 1,
  limit: 50,
  options: {}
};


class ${pluralize(model)}Resource extends BaseResources {
  private route = "/${pluralize(model.toLowerCase())}";

  /**
   * @param options (optional) parameter for include more details 
   * @returns result of { data: object[], limit: number, page: number, pages: number, length: number}
 */
  list = async ({ limit = 50, page = 1, options = {} }: ListParams<${model}Args> = DefaultParams) => {
    const route = this.route + '/list?limit=' + limit + '&page=' + page;
    const result = await this.get(route, options);
    return result as ResultInfo<${model}Model>;
  } 

  /**
   * @param options (optional) parameter for include more details
   * @returns object[]
   */
  getAll = async (options?: ${model}Args) => {
    const result = await this.get(this.route, options);
    return result as ${model}Model[];
  }

  /**
   * @param id (string) required for get specific item
   * @param options (optional) parameter for include more details
   * @returns Null or Object
   */

  getItem = async (id: string, options?: ${model}Options) => {
    const path = mergeRoute(this.route, id);
    const result = await this.get(path, options);
    return result as ${model}Model;
  }

  //items count
  count = <CountResult = any>(options?: ${model}CountOptions) => {
    return new Promise<CountResult>(async (resolve, reject) => {
      try {
        const result = await this.get(this.route + "/count", options);
        return resolve(result);
      } catch (error) {
        return reject(error as ErrorInfo);
      }
    })
  }


  groupBy = <GroupResult = any>(options: ${model}GroupOptions) => {
    return new Promise<GroupResult>(async (resolve, reject) => {
      try {
        const result = await this.get(this.route + '/group', options);
        return resolve(result);
      } catch (error) {
        return reject(error as ErrorInfo);
      }
    })
  }
}


export default ${pluralize(model)}Resource;`);
    }
};
export default createClass;
