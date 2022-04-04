const constants = require("../constants");

const output = constants.output;

module.exports = (env) => {
  return {
    devServer: {
      contentBase: output,
      historyApiFallback: true,
      hot: true,
      stats: "minimal",
    },
    devtool: "cheap-module-source-map",
    mode: "development",
  };
};
