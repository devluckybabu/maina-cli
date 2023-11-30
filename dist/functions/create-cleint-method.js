import { createDir, createFile } from "../method/index.js";
const createClientMethod = (projectDir) => {
    const dir = createDir(`${projectDir}\\method`);
    createFile(`${dir}\\index.ts`, `import Config from "../interfaces/config";
import JWT from "expo-jwt";

export const mergeRoute = (...routes: string[]) => {
  const routes_map = routes.map((route) => {
    if (route.charAt(0) == "/") {
      return route.slice(1);
    } else return route;
  });
  return routes_map.join('/');
}



export const getHeaders = async (params: any = {}, config: Config) => {
  const { secretKey } = config;
  const token = JWT.encode(params, secretKey);
  return {
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Authorization": "Bearer " + token,
  }
}`);
};
export default createClientMethod;
