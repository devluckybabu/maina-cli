import path from "path";
import pluralize from 'pluralize-esm';
import { createDir, createFile } from "../method/index.js";
const createClass = (outDir, model, role) => {
    const currentDir = createDir(path.join(outDir, role));
    let name = model.slice(1);
    name = model.charAt(0).toLowerCase() + name;
    name = pluralize(name);
    if (role === "admin") {
        createFile(`${currentDir}\\${name}.ts`, `import BaseResources from "./base-resources";
import { ${model}, Prisma } from "../../prisma";
import { mergeRoute } from "../method";
import { ErrorInfo } from "../interfaces";

const DefaultParams = {
  page: 1,
  limit: 50,
  options: {}
};

interface ResultInfo<ItemT = any> {
  page: number;
  count: number;
  limit: number;
  pages: number;
  length: number;
  data: ItemT[]
}


export type ${model}Model = ${model};
export type Options = Prisma.${model}FindManyArgs;
export type CountOptions = Prisma.${model}CountArgs;
export type Options = Prisma.${model}DefaultArgs;
export type GroupByOptions = Prisma.${model}GroupByArgs;
export type ${model}Input = Prisma.${model}UncheckedCreateInput;
export type ${model}UpdateInput = Prisma.${model}UncheckedUpdateInput;

interface ListParams {
  page: number;
  limit: number;
  options?: Options;
}



class ${pluralize(model)}Resource extends BaseResources {
  private route = "/${pluralize(model.toLowerCase())}";

  /**
  * @param data required from add new data
  * @param options optional params for include details
  * @returns ${model}Model[]
  */
  createMany = (data: ${model}Input[], options?: Options) => {
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

  /**
  * @param data required from add new data
  * @param options optional params for include details
  * @returns ${model}Model
  */
  create = (data: ${model}Input, options?: Options) => {
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
  deleteItem = (id: string, options?: Options) => {
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
  deleteMany = (id: string[], options?: Options) => {
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
  
  updateItem = async (
    id: string,
    data:  ${model}UpdateInput,
    options?: Options
  ) => {
    const result = await this.patch(this.route, id, data, options);
    return result as  ${model}Model;
  };

  /**
  * @param data required from update new data
  * @param options optional params for include details
*/
  updateMany = async (
    data: ${model}UpdateInput[],
    options?: Options
  ) => {
    const result = await this.patchBatch(this.route, data, options);
    return result as  ${model}Model[];
  };

  /**
   * @param options (optional) parameter for include more details 
   * @returns result of { data: object[], limit: number, page: number, pages: number, length: number}
 */
  list = async ({ limit = 50, page = 1, options = {} }: ListParams = DefaultParams) => {
    const route = this.route + '/list?limit=' + limit + '&page=' + page;
    const result = await this.get(route, options);
    return result as ResultInfo<${model}Model>;
  } 

  /**
   * @param options (optional) parameter for include more details
   * @returns object[]
   */
  getAll = async (options?: Options) => {
    const result = await this.get(this.route, options);
    return result as ${model}[];
  }

  /**
   * @param id (string) required for get specific item
   * @param options (optional) parameter for include more details
   * @returns Null or Object
   */

  getItem = async (id: string, options?: Options) => {
    const path = mergeRoute(this.route, id);
    const result = await this.get(path, options);
    return result as ${model}Model;
  }

  //item count
  count = async (options?: CountOptions) => {
    const result = await this.get(this.route + "/count", options);
    return result;
  }

  /**
   * @param options required for grouping data
   * @returns object[];
   */
  groupBy = async (options: GroupByOptions) => {
    const result = await this.get(this.route + '/group', options);
    return result;
  }
}


export default ${pluralize(model)}Resource;`);
    }
    else {
        createFile(`${currentDir}\\${name}.ts`, `import BaseResources from "./base-resources";
import { ${model}, Prisma } from "../../prisma";
import { mergeRoute } from "../method";

const DefaultParams = {
  page: 1,
  limit: 50,
  options: {}
};

interface ResultInfo<ItemT = any> {
  page: number;
  count: number;
  limit: number;
  pages: number;
  length: number;
  data: ItemT[]
}


export type ${model}Model = ${model};
export type Options = Prisma.${model}FindManyArgs;
export type CountOptions = Prisma.${model}CountArgs;
export type Options = Prisma.${model}DefaultArgs;
export type GroupByOptions = Prisma.${model}GroupByArgs;
export type ${model}Input = Prisma.${model}UncheckedCreateInput;
export type ${model}UpdateInput = Prisma.${model}UncheckedUpdateInput;

interface ListParams {
  page: number;
  limit: number;
  options?: Options;
}



class ${pluralize(model)}Resource extends BaseResources {
  private route = "/${pluralize(model.toLowerCase())}";

  /**
   * @param options (optional) parameter for include more details 
   * @returns result of { data: object[], limit: number, page: number, pages: number, length: number}
 */
  list = async ({ limit = 50, page = 1, options = {} }: ListParams = DefaultParams) => {
    const route = this.route + '/list?limit=' + limit + '&page=' + page;
    const result = await this.get(route, options);
    return result as ResultInfo<${model}Model>;
  } 

  /**
   * @param options (optional) parameter for include more details
   * @returns object[]
   */
  getAll = async (options?: Options) => {
    const result = await this.get(this.route, options);
    return result as ${model}[];
  }

  /**
   * @param id (string) required for get specific item
   * @param options (optional) parameter for include more details
   * @returns Null or Object
   */

  getItem = async (id: string, options?: Options) => {
    const path = mergeRoute(this.route, id);
    const result = await this.get(path, options);
    return result as ${model}Model;
  }

  //item count
  count = async (options?: CountOptions) => {
    const result = await this.get(this.route + "/count", options);
    return result;
  }

  /**
   * @param options required for grouping data
   * @returns object[];
   */
  groupBy = async (options: GroupByOptions) => {
    const result = await this.get(this.route + '/group', options);
    return result;
  }
}


export default ${pluralize(model)}Resource;`);
    }
};
export default createClass;
