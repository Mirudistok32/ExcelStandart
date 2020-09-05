const path = require("path");

module.exports = {
  //Указываем, где лежат исходники в нашем приложении.
  //webpach будет смотреть за всеми исходниками в папке src
  context: path.resolve(__dirname, "src"),
  mode: "development",
  // Указываем входные точки для приложения
  entry: "index.js",
  //
  output: {
    //   Файл, в котором будут находиться все наши javascript-ы
    filename: "bundle.js",
    // Куда это все необходимо складывать
    path: path.resolve(__dirname, 'dist')
  },
};
