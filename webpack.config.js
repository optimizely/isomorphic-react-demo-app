var path = require('path');
var webpack = require('webpack');

module.exports = {
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        query: {
          presets: ['babel-preset-es2015', 'babel-preset-react', 'babel-preset-stage-2']
        }
      }
    ]
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
  ],
  entry: './src/client/index.js',
  output: {
    filename: 'main.js',
    path: './public'
  }
}
