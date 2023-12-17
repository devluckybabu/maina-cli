import path from "path";
import { createDir, createFile } from "../method/index.js";
const createConfig = (projectDir) => {
    const currentDir = createDir(path.join(projectDir, 'interfaces'));
    createFile(`${currentDir}\\config.ts`, `export type Platform = "web" | "android" | 'ios' | 'windows' | 'macos';

export default interface Config {
  path?: string;
  baseUrl: string;
  secretKey: string;
  platform: Platform;
  maxRetries?: number;
  customHeaders?: HeadersInit;
}`);
};
export default createConfig;
