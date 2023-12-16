#! /usr/bin/env node
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import figlet from 'figlet';
import { Command } from "commander";
import { runCommand } from "./method/index.js";
import inquirer from 'inquirer';
import generateAction from './actions/generate-action.js';
import generateClientAction from './actions/generate-client.js';
//variables
const program = new Command();
//commands
console.log(figlet.textSync("Maina"));
const prompt = inquirer.prompt;
program
    .version("1.0.10")
    .description("CLi for generate Nextjs API Handler Code")
    .command('maina')
    .description("start command")
    .action(() => {
    runCommand("maina --help");
});
program
    .name("maina")
    .command('generate')
    .description("generate nextjs API handler code")
    .option("-s, --schema <schema>", "Prisma Schema Model")
    .option("-o, --output [output]", "output path for generated file", "output")
    .option("-m, --method <string>", "use comma separated, method for create api handler")
    .action(({ schema, output }) => __awaiter(void 0, void 0, void 0, function* () {
    const options = yield prompt([{
            name: 'type',
            type: 'list',
            message: "Select your code for: ",
            choices: ["Client", "Server"]
        }]);
    if (options.type == "Client") {
        // console.log("Hello I am client");
        generateClientAction({ schema, output });
    }
    else
        generateAction({ schema, output });
}));
//develop command
program.command('develop')
    .description("Development of admin")
    .action((args) => {
    console.log("Develop: ", args);
});
program.parse(process.argv);
