import { createDir, createFile } from "../method/index.js";
const createClientMethod = (projectDir) => {
    const dir = createDir(`${projectDir}\\method`);
    createFile(`${dir}\\index.ts`, `import JWT from "expo-jwt";
import { Config } from "../interfaces";
import AsyncStorage from "@react-native-async-storage/async-storage";
const filterRoute = (route: string) => {
  if (route == "/") return "";
  if (route.charAt(0) == "/") {
    return route.slice(1);
  } else return route;
}

export const mergeRoute = (...routes: string[]) => {
  let routes_map: string[] = [];
  for (let route of routes) {
    route = filterRoute(route);
    if (route.length >= 2) {
      routes_map.push(route);
    }
  }
  return routes_map.join('/');
}



export const getHeaders = async (params: any = {}, config: Config) => {
  const { secretKey } = config;
  let auth_token: string = "";
  const token = JWT.encode(params, secretKey);
  const result = await AsyncStorage.getItem('access_token');
  if (result) auth_token = JSON.parse(result);
  return {
    "X-Auth-Token": auth_token,
    "Accept": "application/json",
    "Content-Type": "application/json",
    "Authorization": "Bearer " + token,
  }
}`);
};
export default createClientMethod;
