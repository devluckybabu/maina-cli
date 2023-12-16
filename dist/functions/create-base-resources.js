import path from "path";
import { createDir, createFile } from "../method/index.js";
const createBaseRescources = (outDir, role = "client") => {
    const currentDir = createDir(path.join(outDir, role));
    createFile(`${currentDir}\\base-resources.ts`, `import Config from '../interfaces/config';
import { getHeaders, mergeRoute } from '../method';


class BaseResources {
  protected config: Config;
  constructor(config: Config) { this.config = config; }


  //get method
  protected get = async (route: string, options?: any) => {
    try {
      const { baseUrl, version = "v1", path = "", customHeaders = {} } = this.config;
      const url = mergeRoute(baseUrl, path, version, route);
      const entity = route.split("?")[0];
      const params = { options, entity, role: '${role}', version };
      const _headers = await getHeaders(params, this.config);
      const headers = Object.assign(_headers, customHeaders);
      //send request to server
      const response = await fetch(url, { headers, method: 'GET' });
      const result = await response.json();
      if (result?.status == "success") return result.data;
      else throw result;
    } catch (error) {
      throw error;
    }
  }

  //post method
  protected post = async (route: string, data: any, options?: any) => {
    try {
      const { baseUrl, version = "v1", path = "", customHeaders = {} } = this.config;
      const url = mergeRoute(baseUrl, path, version, route);
      const params = { options, version, entity: route, role: 'admin' };
      const _headers = await getHeaders(params, this.config);
      const headers = Object.assign(customHeaders, _headers);
      const response = await fetch(url, {
        headers,
        method: "POST",
        body: JSON.stringify({ data })
      });
      const result = await response.json();
      if (result?.status == "success") return result.data;
      else throw result;
    } catch (error) {
      throw error;
    }
  }
}


export default BaseResources;`);
};
export default createBaseRescources;
