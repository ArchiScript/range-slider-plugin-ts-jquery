const path = require("path");
const webpack = require("webpack");
const { IgnorePlugin } = require("webpack");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
// const FileLoader = require("file-loader");

let mode = "development";
if (process.env.NODE_ENV === "production") {
  mode = "production";
}

module.exports = {
  mode,
  entry: {
    index: "./src/index.ts"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    assetModuleFilename: (pathData) => {
      const isFavicon = pathData.filename.includes("favicons");
      const isImage = pathData.filename.includes("images");
      const isFont = pathData.filename.includes("fonts");
      if (isFavicon || isImage || isFont) {
        const relativePath = path.relative(path.resolve(__dirname, "src"), pathData.filename);
        console.log(pathData.filename + "_____" + relativePath);
        return `${relativePath}`;
      }
      return "assets/[hash][ext][query]";
    },
    clean: true
  },
  devtool: "source-map",
  optimization: {
    splitChunks: {
      chunks: "all"
    }
  },
  devServer: {
    open: true,
    hot: true,
    // port: "auto",
    static: {
      directory: "./src",
      watch: true
    }
  },
  resolve: {
    extensions: [".ts", ".js", ".json"],
    alias: {
      jquery: "jquery/src/jquery"
    }
  },

  module: {
    rules: [
      {
        test: /\.ts$/,
        use: {
          loader: "ts-loader",
          options: {
            transpileOnly: false
          }
        },
        include: [path.resolve(__dirname, "src")]
      },
      {
        test: /\.html$/i,
        loader: "html-loader"
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          mode === "development" ? "style-loader" : MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: [
                  [
                    "postcss-preset-env",
                    {
                      // Options
                    }
                  ]
                ]
              }
            }
          },
          "sass-loader"
        ]
      }
      // {
      //   test: /favicon\.ico$/,
      //   type: "asset/resource",
      //   generator: {
      //     filename: "assets/favicons/[hash][ext][query]"
      //   }
      // },

      // {
      //   test: /\.(png|svg|jpg|jpeg|gif)/i,
      //   type: "asset/resource"
      // },
      // {
      //   test: /\.(ttf|eot|svg|gif|woff|woff2)(\?v=[0-9]\.[0-9]\.[0-9])?$/i,
      //   type: "asset/resource"
      // }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      filename: "index.html"
    }),
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery"
    }),

    new MiniCssExtractPlugin({
      filename: "[name].[contenthash].css"
    }),
    // new CleanWebpackPlugin({
    //   // cleanOnceBeforeBuildPatterns: [path.join(__dirname, "dist/**/*")]
    // }
    // ),
    new CopyWebpackPlugin({
      patterns: [
        // {
        //   from: path
        //     .resolve(__dirname, "src/assets/favicons/favicon.ico")
        //     .replace(/\\/g, "/"),
        //   to: path
        //     .resolve(__dirname, "dist/assets/favicons")
        //     .replace(/\\/g, "/")
        // },
        {
          from: path
            .resolve(__dirname, "src/assets/images")
            .replace(/\\/g, "/"),
          to: path
            .resolve(__dirname, "dist/assets/images")
            .replace(/\\/g, "/")
        }
        // {
        //   from: path
        //     .resolve(__dirname, "src/assets/fonts")
        //     .replace(/\\/g, "/"),
        //   to: path
        //     .resolve(__dirname, "dist/assets/fonts")
        //     .replace(/\\/g, "/")
        // }
      ]
    })
  ]
};
