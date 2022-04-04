const MiniCSSExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const cleanWebpackPlugin = new CleanWebpackPlugin();
const miniCSSExtractPlugin = new MiniCSSExtractPlugin({
  filename: "stylesheets/[name].css",
});
const optimizeCSSAssetsWebpackPlugin = new OptimizeCSSAssetsWebpackPlugin();
const terserWebpackPlugin = new TerserWebpackPlugin();

module.exports = (env) => {
  return {
    devtool: false,
    mode: "production",
    optimization: {
      minimize: true,
      minimizer: [
        optimizeCSSAssetsWebpackPlugin,
        terserWebpackPlugin,
      ],
    },
    plugins: [
      cleanWebpackPlugin,
      miniCSSExtractPlugin,
    ],
  };
};
