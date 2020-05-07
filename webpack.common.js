var HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require('dotenv-webpack');

module.exports = {
  "target": "node",
  entry: "./src/index.js",
  plugins: [ new HtmlWebpackPlugin({
    template: "./src/template.html"
  }),
  new Dotenv()
  ],
  module: {
    rules: [
    ],
  },
};