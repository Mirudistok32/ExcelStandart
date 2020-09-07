const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProd = process.env.NODE_ENV === "production";
const isDev = !isProd;

const filename = (ext) => {
  return isDev ? `bundle.${ext}` : `bundle.[hash].${ext}`;
};

const jsLoaders = () => {
  const loaders = [
    {
      loader: "babel-loader",
      options: {
        presets: ["@babel/preset-env"],
      },
    },
  ];

  if(isDev) {
    loaders.push('eslint-loader')
  }
  return loaders;
};

module.exports = {
  //Указываем, где лежат исходники в нашем приложении.
  //webpach будет смотреть за всеми исходниками в папке src
  context: path.resolve(__dirname, "src"),
  mode: "development",
  // Указываем входные точки для приложения
  entry: ["@babel/polyfill", "./index.js"],
  //
  output: {
    //   Файл, в котором будут находиться все наши javascript-ы, и добавили хеш
    filename: filename("js"),
    // Куда это все необходимо складывать
    path: path.resolve(__dirname, "dist"),
  },
  // Добавляем плагины
  resolve: {
    extensions: [".js"],
    alias: {
      // import '../../../../core/Component'
      // import '@core/Componet
      "@": path.resolve(__dirname, "src"),
      "@core": path.resolve(__dirname, "src/core"),
    },
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      // Откуда будем брать шаблон для html, чтобы плагин его самостоятельно не генерировал
      template: "index.html",
      // Удаляем комментарии в html
      minify: {
        removeComments: isProd,
        // Удаление пробелов
        collapseWhitespace: isProd,
      },
    }),
    // Используем для того, чтобы переносить фавикон
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "src/favicon.ico"),
          to: path.resolve(__dirname, "dist"),
        },
      ],
    }),
    // Нужен для того, чтобы выносить весь css из js в отдельный файл
    new MiniCssExtractPlugin({
      // В какой файл все это нужно будет поместить
      filename: filename("css"),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
              reloadAll: true,
            },
          },
          // css-loader
          { loader: "css-loader" },
          // sass-loader
          { loader: "sass-loader" },
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: jsLoaders(),
      },
    ],
  },
  devtool: isDev ? "source-map" : false,
  devServer: {
    port: 4001,
    hot: isDev,
  },
};
