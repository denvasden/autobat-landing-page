const chalk = require("chalk");
const webpackMerge = require("webpack-merge");

const common = require("./configs/common");
const development = require("./configs/development");
const production = require("./configs/production");

module.exports = (env) => {
  console.log(chalk.white("env:"), chalk.green(JSON.stringify(env)));

  const configuration = env === "development" ? development : production;

  return webpackMerge(common(env), configuration(env));
};
