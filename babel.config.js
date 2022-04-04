module.exports = {
  presets: [
    [
      "@babel/preset-env",
      {
        debug: false,
        targets: "defaults",
      },
    ],

    [
      "@babel/preset-react",
    ],
  ],

  plugins: [
    "@babel/plugin-proposal-class-properties",
  ],
};