module.exports = (env) => ({
  enforce: "pre",
  exclude: /node_modules/,
  test: /\.(js|jsx)$/,
  use: [
    {
      loader: require.resolve("eslint-loader"),
    },
  ],
});
