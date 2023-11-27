import { createDir, createFile } from "../method/index.js";
const createMiddleware = (outDir) => {
    const dir = `${outDir}\\src\\api-handler`;
    const currentDir = createDir(dir);
    const file = `${currentDir}\\index.ts`;
    createFile(file, `
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";

///custom interfaces
export interface ApiRequest extends NextApiRequest {
  user?: any;
  options?: any;
  role?: string;
}
export type ApiHandler = NextApiHandler;
export type ApiResponse = NextApiResponse;


//middleware
export const middleware = async (
  req: ApiRequest,
  res: ApiResponse,
  callNext: ApiHandler
) => await callNext(req, res);




export const getError = (error: any) => {
  const code = error?.code || 400;
  let message = String(error?.message);
  const status = error?.status || 'error';
  message = message.replace('At path:', '')?.trim();
  return { code, status, message };
};

export const getSearchParams = <Params = any>(url?: string) => {
  if (url && typeof url == "string") {
    let params: { [key: string]: any } = {};
    const params_list = url.split('?')[1];
    if (params_list) {
      const params_data = params_list.split('&');
      for (let param of params_data) {
        const data = param?.split("=");
        if (data && data?.length >= 2) {
          const key = data[0];
          const value = data[1];
          params[key] = value;
        }
      }
      return params as Params;
    } else return {} as Params;
  } else return {} as Params;
}


export const paginateData = (data: any[] = [], count = 0, page = 1, limit = 0) => {
  const pages = Math.ceil(count / limit) || 0;
  return ({ data, page, length: count, limit, pages });
};
`);
};
export default createMiddleware;
