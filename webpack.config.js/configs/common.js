const glob = require("glob");
const path = require("path");

const CopyWebpackPlugin = require("copy-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");

const constants = require("../constants");

const css = require("../rules/css");
const eslint = require("../rules/eslint");
const fonts = require("../rules/fonts");
const images = require("../rules/images");
const javascript = require("../rules/javascript");
const scss = require("../rules/scss");

const context = constants.context;
const entry = constants.entry;
const output = constants.output;

const copyWebpackPlugin = new CopyWebpackPlugin({
  patterns: [
    {
      from: path.resolve(context, "static/images/"),
      to: path.resolve(output, "images/"),
    },
  ],
});
const htmlWebpackPlugins = getHTMLWebpackPlugins();

module.exports = (env) => {
  return {
    context: context,
    devtool: false,
    entry: {
      index: entry,
    },
    mode: "none",
    module: {
      rules: [
        eslint(env),
        {
          oneOf: [
            css(env),
            fonts(env),
            images(env),
            javascript(env),
            scss(env),
          ],
        },
      ],
    },
    output: {
      chunkFilename: "javascript/[name].js",
      filename: "javascript/[name].js",
      path: output,
    },
    performance: {
      maxAssetSize: 512000
    },
    plugins: [
      copyWebpackPlugin,
      ...htmlWebpackPlugins,
    ],
    resolve: {
      extensions: [".js", ".jsx", ".json"],
    },
  };
};

function getHTMLWebpackPlugins () {
  const options = {
    cwd: path.resolve(context, "static/html/"),
  };
  const pattern = "*.html";

  const html = glob.sync(pattern, options);

  return html.map(html => {
    return new HTMLWebpackPlugin({
      filename: html,
      template: path.resolve(context, `static/html/${html}`),
    });
  });
}
