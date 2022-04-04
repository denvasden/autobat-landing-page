const MiniCSSExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env) => ({
  test: /\.css$/,
  use: [
    {
      loader: env.development ? require.resolve("style-loader") : MiniCSSExtractPlugin.loader,
    },

    {
      loader: require.resolve("css-loader"),
      options: {
        importLoaders: 1,
        sourceMap: Boolean(env.development),
      },
    },

    {
      loader: require.resolve("postcss-loader"),
      options: {
        sourceMap: Boolean(env.development),
      },
    },
  ],
});