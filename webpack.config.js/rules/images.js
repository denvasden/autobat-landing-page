module.exports = (env) => ({
  test: /\.(gif|jpg|jpeg|png)$/,
  use: [
    {
      loader: require.resolve("file-loader"),
      options: {
        name: "images/[name].[ext]",
        // publicPath: env.development ? "./" : "../",
        publicPath: env.development ? "./" : "https://denvasden.github.io/autobat-landing-page/",
      },
    },
  ],
});
