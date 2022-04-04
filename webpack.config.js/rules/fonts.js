module.exports = (env) => ({
  test: /\.(eot|otf|ttf|woff|woff2)$/,
  use: [
    {
      loader: require.resolve("file-loader"),
      options: {
        name: "fonts/[name].[ext]",
        publicPath: env.development ? "./" : "../",
      },
    },
  ],
});
