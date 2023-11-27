var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import inquirer from "inquirer";
import { createFileAction } from "../functions/actions.js";
const prompt = inquirer.prompt;
const methods = "GET,POST,DELETE,UPDATE";
const generateAction = ({ schema, output }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (typeof schema == "string" && typeof output == "string") {
            const options = yield prompt([{
                    name: 'method',
                    type: 'checkbox',
                    choices: methods.split(','),
                    message: "Select API Handler Mehod: "
                }]);
            yield createFileAction({ schema, output, method: options === null || options === void 0 ? void 0 : options.method });
        }
        else {
            const options = yield prompt([{
                    name: "schema",
                    type: 'input',
                    message: "Enter prisma schema location:",
                    default: typeof schema == "string" ? schema : "prisma/schema.prisma",
                }, {
                    name: 'output',
                    type: 'input',
                    message: "Enter output directory:",
                    default: typeof output == "string" ? output : "output",
                }, {
                    name: 'method',
                    type: 'checkbox',
                    choices: methods.split(','),
                    message: "Select API Handler Mehod: "
                }]);
            yield createFileAction({
                method: options === null || options === void 0 ? void 0 : options.method,
                schema: options === null || options === void 0 ? void 0 : options.schema,
                output: options === null || options === void 0 ? void 0 : options.output
            });
        }
    }
    catch (error) {
        console.log(error);
    }
});
export default generateAction;
