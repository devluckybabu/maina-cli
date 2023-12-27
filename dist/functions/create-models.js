import path from "path";
import { createDir, createFile } from "../method/index.js";
const createModels = (projectDir, models) => {
    const currentDir = createDir(path.join(projectDir, 'src', 'models'));
    createFile(path.join(currentDir, 'index.ts'), `import {
${models.toString()},
 Prisma
} from '../../prisma';

export interface ResultInfo<ItemT = any> {
  page: number;
  count: number;
  limit: number;
  pages: number;
  data: ItemT[];
}

export type Platform = "web" | "android" | 'ios' | 'windows' | 'macos';

export interface Config {
	path?: string;
	baseUrl: string;
	secretKey: string;
	platform: Platform;
	maxRetries?: number;
	customHeaders?: HeadersInit;
}
export interface ErrorInfo {
	code: number;
	status: string;
	message: string;
}


export interface ListParams<Options = any> {
  page?: number;
  limit?: number;
  options?: Options;
}

${models.map((model) => {
        return `export interface ${model}Model extends ${model} {}
    
///${model.toLowerCase()} options
export type ${model}Args = Prisma.${model}FindManyArgs;
export type ${model}Options = Prisma.${model}DefaultArgs;
export type ${model}CountOptions = Prisma.${model}CountArgs;
export type ${model}GroupOptions = Prisma.${model}GroupByArgs;
export type ${model}CreateInput = Prisma.${model}UncheckedCreateInput;
export type ${model}UpdateInput = Prisma.${model}UncheckedUpdateInput;
    `;
    }).join('\n')}


`);
};
export default createModels;
