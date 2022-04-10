module.exports = (env) => {
  console.log("*** js > env:", env);

  return {
    exclude: /node_modules/,
    test: /\.js$/,
    use: [
      {
        loader: require.resolve("babel-loader"),
        options: {
          cacheCompression: true,
          cacheDirectory: true,
          presets: [
            ["@babel/preset-env", { targets: "defaults" }]
          ]
        }
      }
    ]
  };
};
