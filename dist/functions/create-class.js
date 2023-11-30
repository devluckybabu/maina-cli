import path from "path";
import { createDir, createFile } from "../method/index.js";
const createClass = (outDir, model, role) => {
    const currentDir = createDir(path.join(outDir, role));
    createFile(`${currentDir}\\${model.toLowerCase()}.ts`, `import BaseResources from "./base-resources";
import { ${model}, Prisma } from "../interfaces";
import { mergeRoute } from "../method";

interface ResultInfo<ItemT = any> {
  page: number;
  count: number;
  limit: number;
  pages: number;
  length: number;
  data: ItemT[]
}


type ${model}Model = ${model};
type Data = Prisma.${model}CreateInput;
type Options = Prisma.${model}FindManyArgs;
type CountOptions = Prisma.${model}CountArgs;
type DefaultOptions = Prisma.${model}DefaultArgs;
type GroupByOptions = Prisma.${model}GroupByArgs;



class ${model}Resources extends BaseResources {
  private route = "/${model.toLowerCase()}";

    /**
   * @param data required from add new data
   * @param options optional params for include details
   * @returns object
   */
  create = async (data: Data, options?: DefaultOptions) => {
    return await this.post(this.route, data, options);
  }

  /**
   * @param options (optional) parameter for include more details 
   * @returns result of { data: object[], limit: number, page: number, pages: number, length: number}
 */
  list = async (options?: Options) => {
    const result = await this.get(this.route + '/list', options);
    return result as ResultInfo<${model}>;
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
}


export default ${model}Resources;`);
};
export default createClass;