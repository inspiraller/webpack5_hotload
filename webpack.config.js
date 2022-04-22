const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ReactRefreshPlugin = require("@pmmmwh/react-refresh-webpack-plugin");

const sass = require("sass");

const contentBase = path.resolve(__dirname, "./public");
const prodBuild = path.resolve(__dirname, "./dist");

const port = 3001;
const startFile = "index.tsx";

const isDevelopment = process.env.NODE_ENV !== "production";

const src = path.join(__dirname, "/src");

const config = {
  entry: {
    reactRefreshSetup:
      "@pmmmwh/react-refresh-webpack-plugin/client/ReactRefreshEntry.js",
    app: path.resolve(__dirname, `./src/${startFile}`),
  },
  output: {
    path: prodBuild,
    filename: "[name].bundle.js",
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        use: ["babel-loader"],
        exclude: /node_modules/,

        // https://javascript.plainenglish.io/react-fast-refresh-the-new-react-hot-reloader-652c6645548c
        // don't need if declared in babel itself
        // options: {
        //   plugins: ['react-refresh/babel'],
        // },
      },

      {
        test: /\.module\.(s[ac]|c)ss$/,
        use: [
          isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: true,
              sourceMap: isDevelopment,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: isDevelopment,
              // https://www.npmjs.com/package/sass-loader
              // Prefer `dart-sass`
              implementation: sass,
              sassOptions: {
                fiber: false, // not compatibile with node 16+
              },
              webpackImporter: true, // just in case - tilde won't work ? - https://webpack.js.org/loaders/sass-loader/ webpackImporter
            },
          },
        ],
      },
      {
        test: /\.(s[ac]|c)ss$/,
        exclude: /\.module\.(s[ac]|c)ss$/,
        use: [
          isDevelopment ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "sass-loader",
            options: {
              sourceMap: isDevelopment,
            },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  },

  resolve: {
    extensions: ["*", ".js", ".jsx", ".ts", ".tsx", ".scss", ".css"],
    modules: [src, "node_modules"],
    alias: {
      src,
    },
  },
  plugins: [
    new ReactRefreshPlugin(),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.html"),
      favicon: "./public/favicon.ico",
      filename: "index.html",
      manifest: "./public/manifest.json",
    }),
    new MiniCssExtractPlugin({
      filename: isDevelopment ? "[name].css" : "[name].[hash].css",
      chunkFilename: isDevelopment ? "[id].css" : "[id].[hash].css",
    }),
  ],

  devServer: {
    static: contentBase, // https://gist.github.com/johnrichardrinehart/c8ec6ab1e60f39fc3b8dc738db649ec0 - contentBase was renamed to static
    port,
    historyApiFallback: true,
    hot: true,
  },
};

const fnConfig = (globalConfig) => ({
  ...config,
});
module.exports = fnConfig;
