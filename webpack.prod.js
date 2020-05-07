const common = require("./webpack.common")
const merge = require("webpack-merge")
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {
  mode:"production",
  entry: "./src/index.js",
  output: {
    filename: "main.[contentHash].js",
    path: path.resolve(__dirname, "dist")
  },
  optimization: {
    minimizer: [new OptimizeCssAssetsPlugin(), new TerserPlugin()]
  },
  plugins: [ new MiniCssExtractPlugin({ filename: "[name].[contentHash].css" }), new CleanWebpackPlugin() ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,// 2. Extract CSS into files
          "css-loader" // 1. Turns css into commonjs
        ],
      },
    ]
  }
});