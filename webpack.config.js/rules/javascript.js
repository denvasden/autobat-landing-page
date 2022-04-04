module.exports = (env) => ({
  exclude: /node_modules/,
  test: /\.(js|jsx)$/,
  use: [
    {
      loader: require.resolve("babel-loader"),
    }
  ],
});