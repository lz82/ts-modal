const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const resolve = (p) => {
  return path.resolve(__dirname, p);
};

const config = {
  mode: "production",

  entry: "./src/index.ts",

  resolve: {
    extensions: [".ts", ".js", ".json"],
  },

  output: {
    path: resolve("../dist"),
    filename: "lz-modal.js",
    library: "lzModal",
    globalObject: "this",
    libraryTarget: "umd",
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
          {
            loader: "ts-loader",
          },
        ],
      },
      {
        test: /\.less$/,
        exclude: /\.module.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            // options: {
            //   modules: true,
            // },
          },
          {
            loader: "less-loader",
          },
        ],
      },
      {
        test: /\.less$/,
        include: /\.module.less$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {
              modules: {
                localIdentName: "[local]--[hash:base64:5]",
              },
            },
          },
          {
            loader: "less-loader",
          },
        ],
      },
      {
        test: /\.(eot|svg|ttf|woff|woff2)/,
        use: [
          {
            loader: "url-loader",
          },
          {
            loader: "file-loader",
            options: {
              outputPath: "iconfont",
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: resolve("../public/index.html"),
      title: "Hot Module Replacement",
    }),
    new MiniCssExtractPlugin(),
  ],
};

module.exports = config;
