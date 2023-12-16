import path from "path";
import { createDir, createFile } from "../method/index.js";
const createExpressApiHandler = (projectDir) => {
    const currentDir = createDir(path.join(projectDir, 'api-handler'));
    const file = `${currentDir}\\index.ts`;
    createFile(file, `import JWT from "expo-jwt";
import { PrismaClient } from "@prisma/client";
import { NextFunction, Request, Response } from "express";

export const SECRET_KEY = "Hello1234";
export interface PayloadModel {
  user?: any;
  options?: any;
  entity?: string;
  role?: 'store' | 'admin' | 'seller';
}

export interface MainaRequest extends Request {
  user?: any;
  options?: any;
  entity?: string;
  role?: 'store' | 'admin' | 'seller';
}

export type MainaResponse = Response;
export type MainaNextHandler = NextFunction;
export const prisma = new PrismaClient();


//handle error
export const getError = (error: any) => {
  let message = String(error?.message).replace('At path: ', '');
  const code = error?.code || 400;
  const status = error?.status || "error";
  return { code, status, message };
}

export const paginateData = (data: any[] = [], count = 0, page = 1, limit = 0) => {
  const pages = Math.ceil(count / limit) || 0;
  return ({ data, page, length: count, limit, pages });
};



export const getPayload = (token = "", isRequired?: boolean) => {
  if (token && isRequired) {
    const _token = token.replace('Bearer', '').trim();
    const payload = JWT.decode(_token, SECRET_KEY);
    if (typeof payload === "object") {
      return payload as PayloadModel;
    } else throw Error("Invalid Payload");
  } else if (token) {
    const _token = token.replace('Bearer', '').trim();
    const payload = JWT.decode(_token, SECRET_KEY);
    if (typeof payload === "object") {
      return payload as PayloadModel;
    } else throw Error("Invalid Payload");
  } else if (isRequired) throw Error("Invalid Token");
  return {
    entity: '/',
    role: 'store',
    options: undefined,
  } as PayloadModel;
}
`);
};
export default createExpressApiHandler;
