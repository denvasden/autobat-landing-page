const MiniCSSExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env) => ({
  test: /\.scss$/,
  use: [
    {
      loader: env.development ? require.resolve("style-loader") : MiniCSSExtractPlugin.loader,
    },

    {
      loader: require.resolve("css-loader"),
      options: {
        importLoaders: 2,
        sourceMap: Boolean(env.development),
      },
    },

    {
      loader: require.resolve("resolve-url-loader"),
      options: {
        sourceMap: Boolean(env.development),
      },
    },

    {
      loader: require.resolve("sass-loader"),
      options: {
        sourceMap: true,
      },
    },
  ],
});