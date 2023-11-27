#! /usr/bin/env node
import figlet from 'figlet';
import { Command } from "commander";
import { runCommand } from "./method/index.js";
import inquirer from 'inquirer';
import generateAction from './actions/generate-action.js';
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
    .option("-o, --output [output]", "output path for generated file", "src/pages/api")
    .option("-m, --method <string>", "use comma separated, method for create api handler")
    .action(generateAction);
program.parse(process.argv);
