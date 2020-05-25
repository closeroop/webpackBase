var HtmlWebpackPlugin = require('html-webpack-plugin');
var path = require('path');
module.exports = {
  entry: {
    main: path.resolve(__dirname, '../src/index.js'),
  },
  resolve: {
    extensions: ['.js', '.json']
  },
  module: {
    // noParse: /jquery|lodash/, //防止 webpack 解析那些任何与给定正则表达式相匹配的文件
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader?cacheDirectory'  //loader 单项  use 单项/多项
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: 'css',
              name: '[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname,'../src/index.html'),
      chunks: ['vendor', 'common', 'main']
    })
  ]
}