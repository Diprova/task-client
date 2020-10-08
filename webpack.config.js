var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var webpack = require("webpack");

const envFile = process.env.NODE_ENV === "production" ? "prod.env" : ".env";
var envVariables = require("dotenv").config({
  path: path.join(__dirname, envFile)
});

module.exports = function(env) {
  return {
    entry: ["@babel/polyfill", "./src/index.js"],
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      compress: false,
      historyApiFallback: { disableDotRule: true },
      port: process.env.PORT || 3030
    },
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "index_bundle.js",
      publicPath: "/"
    },
    module: {
      rules: [
        { test: /\.(js)$/, use: "babel-loader" },
        { test: /\.css$/, use: ["style-loader", "css-loader"] },
        {
          test: /\.less$/,
          use: [
            { loader: "style-loader" },
            { loader: "css-loader" },
            {
              loader: "less-loader",
              options: { lessOptions: { strictMath: true } }
            }
          ]
        },
        { test: /\.(png|jpe?g|gif)$/i, use: [{ loader: "file-loader" }] }
      ]
    },
    mode: "development",
    plugins: [
      new HtmlWebpackPlugin({
        template: "public/index.html"
      }),
      new webpack.DefinePlugin({
        "process.env": JSON.stringify(envVariables.parsed)
      })
    ]
  };
};
