#! /usr/bin/env node
import figlet from 'figlet';
import { Command } from "commander";
import { runCommand } from "./method/index.js";
import inquirer from 'inquirer';
import generateAction from './actions/generate-action.js';
import generateClientAction from './actions/generate-client.js';
import develop from './commands/develop.js';
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
    .action(async ({ schema, output }) => {
    const options = await prompt([{
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
});
//develop command
program.command('develop')
    .description("Development of admin")
    .action(develop);
program.parse(process.argv);
