/// <reference types="node" resolution-mode="require"/>
export declare const runCommand: (command: string) => Buffer;
export declare const getPrismaClient: (path: string) => Promise<any>;
export declare const createFile: (file: string, content: string, overwrite?: boolean) => void;
export declare const createDir: (path: string) => string;
