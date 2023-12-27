import path from "path";
import { createDir, createFile } from "../method/index.js";
const createBaseRescources = (outDir, role = "client") => {
    const currentDir = createDir(path.join(outDir, 'src', role));
    createFile(`${currentDir}\\base-resources.ts`, `import { Config } from '../models';
import { getHeaders, mergeRoute } from '../method';


class BaseResources {
  protected config: Config;
  constructor(config: Config) { this.config = config; }


  //get method
  protected get = async (route: string, options?: any) => {
    try {
      const { baseUrl, path="",  customHeaders = {} } = this.config;
      const url = mergeRoute(baseUrl, path, '${role}', route);
      const entity = route.split("?")[0];
      const params = { options, entity, role: '${role}' };
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
      const { baseUrl,  path = "", customHeaders = {} } = this.config;
      const url = mergeRoute(baseUrl, path, '${role}', route);
      const params = { options,  entity: route, role: '${role}' };
      const _headers = await getHeaders(params, this.config);
      const headers = Object.assign(customHeaders, _headers);
      const response = await fetch(url, {
        headers,
        method: "POST",
        body: JSON.stringify(data)
      });
      const result = await response.json();
      if (result?.status == "success") return result.data;
      else throw result;
    } catch (error) {
      throw error;
    }
  }

 //delete method
 protected delete = async (route: string, id: string | string[], options?: any) => {
   try {
     const { baseUrl, customHeaders = {} } = this.config;
     if (typeof id === "string") {
       const url = mergeRoute(baseUrl, '${role}', route, id);
       const params = { options, entity: route, role: '${role}' };
       const _headers = await getHeaders(params, this.config);
       const headers = Object.assign(customHeaders, _headers);
       const response = await fetch(url, { headers, method: "DELETE" });
       const result = await response.json();
       if (result?.status == "success") return result.data;
       else throw result;
     } else {
       const url = mergeRoute(baseUrl, '${role}', route);
       const params = { options, entity: route, role: '${role}' };
       const _headers = await getHeaders(params, this.config);
       const headers = Object.assign(customHeaders, _headers);
       const response = await fetch(url, {
         headers,
         method: "DELETE",
         body: JSON.stringify({ data: id })
       });
       const result = await response.json();
       if (result?.status == "success") return result.data;
       else throw result;
     }
   } catch (error) {
     throw error;
   }
 }

  //update many method
  protected patchBatch = async (route: string, data: any[], options?: any) => {
    try {
      const { baseUrl, customHeaders = {} } = this.config;
      const url = mergeRoute(baseUrl, '${role}', route);
      const params = { options, entity: route, role: '${role}' };
      const _headers = await getHeaders(params, this.config);
      const headers = Object.assign(customHeaders, _headers);
      const response = await fetch(url, {
        headers,
        method: "PATCH",
        body: JSON.stringify({ data })
      });
      const result = await response.json();
      if (result?.status == "success") return result.data;
      else throw result;
    } catch (error) {
      throw error;
    }
  }

  //update many method
  protected patch = async (route: string, id: string, data: any, options?: any) => {
    try {
      const { baseUrl, customHeaders = {} } = this.config;
      const url = mergeRoute(baseUrl, '${role}', route, id);
      const params = { options, entity: route, role: '${role}' };
      const _headers = await getHeaders(params, this.config);
      const headers = Object.assign(customHeaders, _headers);
      const response = await fetch(url, {
        headers,
        method: "PATCH",
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result?.status == "success") {
        return result.data;
      } else throw result;
    } catch (error) {
      throw error;
    }
  }
}

export default BaseResources;`);
};
export default createBaseRescources;
