const chalk = require("chalk");
const path = require("path");

const context = path.resolve(process.cwd(), "application");
const entry = path.resolve(context, "javascript/index.js");
const output = path.resolve(process.cwd(), "bundle");

console.log(chalk.white("process.cwd():"), chalk.green(process.cwd()));
console.log(chalk.white("context:"), chalk.green(context));
console.log(chalk.white("entry:"), chalk.green(entry));
console.log(chalk.white("output:"), chalk.green(output));

module.exports = {
  context,
  entry,
  output,
};
