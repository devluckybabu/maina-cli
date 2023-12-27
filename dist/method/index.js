import { execSync } from "child_process";
import { appendFileSync, existsSync, mkdirSync, writeFileSync } from "fs";
//execute command
export const runCommand = (command) => {
    return execSync(command, { stdio: 'inherit' });
};
export const getPrismaClient = async (path) => {
    return await import(`file://${path}/node_modules/@prisma/client/index.js`);
};
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
