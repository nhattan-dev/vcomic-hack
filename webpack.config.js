// var path = require("path");
// var webpack = require("webpack");
import path from "path";
import webpack from "webpack";
const __dirname = path.resolve();
export default {
  entry: "./code.js",
  output: {
    path: path.resolve(__dirname, "public/js/"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /.js$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["es2015"],
        },
      },
    ],
  },
};
