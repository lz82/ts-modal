const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const resolve = (p) => {
  return path.resolve(__dirname, p);
};

const config = {
  mode: "development",

  devServer: {
    contentBase: "../dist",
    open: true,
    hot: true,
  },

  entry: "./src/demo.ts",

  resolve: {
    extensions: [".ts", ".js", ".json"],
  },

  output: {
    path: resolve("../dist"),
    filename: "[name].bundle.js",
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
            loader: "style-loader",
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
            loader: "style-loader",
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
          },
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: resolve("../public/index.html"),
      title: "Hot Module Replacement",
    }),
  ],
};

module.exports = config;
