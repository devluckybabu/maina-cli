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
import { createExpressFileAction } from "./express-action.js";
const prompt = inquirer.prompt;
const methods = "GET,POST,DELETE,UPDATE";
const generateAction = ({ schema, output }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
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
            }]);
        yield createExpressFileAction({
            schema: options === null || options === void 0 ? void 0 : options.schema,
            output: options === null || options === void 0 ? void 0 : options.output
        });
    }
    catch (error) {
        console.log(error);
    }
});
export default generateAction;
