/**
 * Builds the DLL for development electron renderer process
 */

import webpack from "webpack";
import path from "path";
import { merge } from "webpack-merge";
import baseConfig from "./webpack.config.base";
import webpackPaths from "./webpack.paths";
import { dependencies } from "../../package.json";

const dist = webpackPaths.dllPath;

const configuration: webpack.Configuration = {
  context: webpackPaths.rootPath,
  devtool: "eval",
  mode: "development",
  target: "electron-renderer",
  externals: ["fsevents", "crypto-browserify"],
  module: require("./webpack.config.renderer.dev").default.module,
  entry: {
    renderer: Object.keys(dependencies || {}),
  },
  output: {
    path: dist,
    filename: "[name].dev.dll.js",
    library: {
      name: "renderer",
      type: "var",
    },
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(dist, "[name].json"),
      name: "[name]",
    }),
    new webpack.EnvironmentPlugin({
      NODE_ENV: "development",
    }),
    new webpack.LoaderOptionsPlugin({
      debug: true,
      options: {
        context: webpackPaths.srcPath,
        output: {
          path: webpackPaths.dllPath,
        },
      },
    }),
  ],
};

export default merge(baseConfig, configuration);
