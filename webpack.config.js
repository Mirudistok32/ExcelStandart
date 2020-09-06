const path = require("path");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  //Указываем, где лежат исходники в нашем приложении.
  //webpach будет смотреть за всеми исходниками в папке src
  context: path.resolve(__dirname, "src"),
  mode: "development",
  // Указываем входные точки для приложения
  entry: "./index.js",
  //
  output: {
    //   Файл, в котором будут находиться все наши javascript-ы, и добавили хеш
    filename: "bundle.[hash].js",
    // Куда это все необходимо складывать
    path: path.resolve(__dirname, 'dist')
  },
  // Добавляем плагины
  plugins: [
    new CleanWebpackPlugin(),
    new HTMLWebpackPlugin({
      // Откуда будем брать шаблон для html, чтобы плагин его самостоятельно не генерировал
      template: 'index.html',
      
    })
  ]
};
