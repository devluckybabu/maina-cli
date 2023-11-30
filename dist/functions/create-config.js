import path from "path";
import { createDir, createFile } from "../method/index.js";
const createConfig = (projectDir) => {
    const currentDir = createDir(path.join(projectDir, 'interfaces'));
    createFile(`${currentDir}\\config.ts`, `export type API_VERSION = "v1";
export type Role = "client" | "admin" | "manager" | "employee";
export type Platform = "web" | "android" | 'ios' | 'windows' | 'macos';

export default interface Config {
  path?: string;
  baseUrl: string;
  secretKey: string;
  platform: Platform;
  maxRetries?: number;
  version?: API_VERSION;
  customHeaders?: HeadersInit;
}`);
    console.log("Config file created");
};
export default createConfig;
