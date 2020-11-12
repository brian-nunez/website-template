const path = require("path");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const ManifestPlugin = require("webpack-manifest-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: 'production',
  entry: {
    index: './src/scripts/index.js',
    about: './src/scripts/about.js',
  },
  optimization: {
    usedExports: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: (resourcePath, context) => {
                return path.relative(path.dirname(resourcePath), context) + '/';
              },
            },
          },
          "style-loader",
          "css-loader",
        ],
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: ["style-loader", "css-loader", "sass-loader"]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ["*", ".js", ".css", ".scss"]
  },
  output: {
    path: __dirname + "/build",
    publicPath: "/",
    filename: "scripts/[name].js"
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./src/html/index.html",
      filename: "./index.html",
      chunks: ['index'],
      favicon: "./src/assets/favicon.ico",
    }),
    new HtmlWebPackPlugin({
      template: "./src/html/about.html",
      filename: "./about.html",
      chunks: ['about'],
      favicon: "./src/assets/favicon.ico",
    }),
    new ManifestPlugin({
      fileName: "./manifest.json",
      seed: {
        short_name: "Page Template",
        name: "HTML, CSS, and JS Template",
        icons: [
          {
            src: "./favicon.ico",
            sizes: "64x64 32x32 24x24 16x16",
            type: "image/x-icon"
          }
        ],
        start_url: ".",
        display: "standalone",
        theme_color: "#000000",
        background_color: "#ffffff"
      }
    }),
    new MiniCssExtractPlugin({
      filename: "[name].css",
      chunkFilename: "[id].css",
      linkType: 'text/css',
    })
  ],
  devServer: {
    contentBase: "./build",
    hot: true,
    port: 3000,
    compress: true,
    historyApiFallback: true,
    before: function(app, server) {
      app.disable("x-powered-by");
    }
  }
};