const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const nodeExternals = require("webpack-node-externals");

const config = {};

const frontendConfig = {
  ...config,
  entry: {
    main: "./src/main.ts"
  },
  output: {
    path: path.resolve(__dirname, "dist/public"),
    filename: "[name].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          { loader: "style-loader" },
          {
            loader: "typings-for-css-modules-loader",
            options: {
              modules: true,
              namedExport: true
            }
          }
        ]
      },
      { test: /\.ts$/, use: "ts-loader" }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Test app",
      chunks: ["main"]
    })
  ]
};

const serverConfig = {
  ...config,
  entry: {
    server: "./src/server.ts"
  },
  output: {
    path: path.resolve(__dirname, "dist/server"),
    filename: "[name].bundle.js"
  },
  module: {
    rules: [{ test: /\.ts$/, use: "ts-loader", exclude: /node_modules/ }]
  },
  target: "node",
  externals: [nodeExternals()]
};

module.exports = [frontendConfig, serverConfig];
