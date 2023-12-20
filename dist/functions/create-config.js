import path from "path";
import { createDir, createFile } from "../method/index.js";
const createConfig = (projectDir) => {
    const currentDir = createDir(path.join(projectDir, 'interfaces'));
    createFile(`${currentDir}\\index.ts`, `export type Platform = "web" | "android" | 'ios' | 'windows' | 'macos';

export interface Config {
  path?: string;
  baseUrl: string;
  secretKey: string;
  platform: Platform;
  maxRetries?: number;
  customHeaders?: HeadersInit;
}
export interface ErrorInfo{
  code: number;
  status: string;
  message: string;
}`);
};
export default createConfig;
