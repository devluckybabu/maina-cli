var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { execSync } from "child_process";
import { appendFileSync, existsSync, mkdirSync, writeFileSync } from "fs";
//execute command
export const runCommand = (command) => {
    return execSync(command, { stdio: 'inherit' });
};
export const getPrismaClient = (path) => __awaiter(void 0, void 0, void 0, function* () {
    return yield import(`file://${path}/node_modules/@prisma/client/index.js`);
});
export const createFile = (file, content, overwrite = false) => {
    try {
        if (file && overwrite) {
            appendFileSync(file, content);
        }
        else {
            writeFileSync(file, content, { flag: 'w' });
        }
    }
    catch (error) {
        console.log("File creation failed of ", file);
    }
};
export const createDir = (path) => {
    if (existsSync(path))
        return path;
    mkdirSync(path, { recursive: true });
    return path;
};
