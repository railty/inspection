var path = require('path');
var fs = require('fs');

module.exports = {
  entry: ['./www/js/index.js'],
  output: {
    path: path.resolve(__dirname, "platforms/browser/www/js/"),
    publicPath: "/js/",
    filename: "bundle.js"
  },
  devtool: 'source-map',
  debug: true,
  resolve: {
    extensions: ['', '.js', '.jsx']
  },  
  module: {
    loaders: [
      {
        test: /\.js$|\.jsx$/,
        exclude: /node_modules/,
        loader: "babel-loader"
      },
    ]
  },
};
