import path from "path";
import pluralize from 'pluralize-esm';
import { createDir, createFile } from "../method/index.js";
const createClass = (outDir, model, role) => {
    const currentDir = createDir(path.join(outDir, role));
    let name = model.slice(1);
    name = model.charAt(0).toLowerCase() + name;
    name = pluralize(name);
    createFile(`${currentDir}\\${name}.ts`, `import BaseResources from "./base-resources";
import { ${model}, Prisma } from "../interfaces";
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


type ${model}Model = ${model};
type Options = Prisma.${model}FindManyArgs;
type ${model}Input = Prisma.${model}CreateInput;
type CountOptions = Prisma.${model}CountArgs;
type DefaultOptions = Prisma.${model}DefaultArgs;
type GroupByOptions = Prisma.${model}GroupByArgs;
type ${model}UpdateInput = Prisma.${model}UncheckedCreateInput;

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
  createMany = async (data: ${model}Input[], options?: DefaultOptions) => {
    return await this.post(this.route, { data }, options);
  } 

  /**
  * @param data required from add new data
  * @param options optional params for include details
  * @returns ${model}Model
  */
  create = async (data: ${model}Input, options?: DefaultOptions) => {
    const id = String(Date.now());
    const route = this.route + '/' +id;
    return await this.post(route, data, options);
  }

  /**
   * @param options (optional) parameter for include more details 
   * @returns result of { data: object[], limit: number, page: number, pages: number, length: number}
 */
  list = async ({ limit = 50, page = 1, options = {} }: ListParams = DefaultParams) => {
    const route = this.route + '/list?limit=' + limit + '&page=' + page;
    const result = await this.get(route, options);
    return result as ResultInfo<${model}Model>;
  } 

  //remove item
  remove = async (id: string | string[], options: DefaultOptions) => {
    const route = this.route;
    const result = await this.delete(route, id, options);
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

  getItem = async (id: string, options?: DefaultOptions) => {
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

  
  /**
   * @param id reguired for update specific item
  * @param data required from update new data
  * @param options optional params for include details
*/
  update = async (
    id: string,
    data:  ${model}UpdateInput,
    options?: DefaultOptions
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
    options?: DefaultOptions
  ) => {
    const result = await this.patchBatch(this.route, data, options);
    return result as  ${model}Model;
  };
}


export default ${pluralize(model)}Resource;`);
};
export default createClass;
