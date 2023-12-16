#! /usr/bin/env node
import { Argument, Command } from "commander";
const program = new Command();
// program
program
    .command("develop", "use for database configuration")
    .description("use for database configuration")
    .addArgument(new Argument("<build>").choices(["build", "reset", "migration"]))
    .action((argv) => {
    console.log("Develop Command: ", argv);
});
program.parse(process.argv);
export default program;
