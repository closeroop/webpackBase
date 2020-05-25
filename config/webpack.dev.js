const { smart } = require("webpack-merge")
const { resolve } = require("path")
const baseConfig = require("./webpack.common.js")

module.exports = smart(baseConfig, {
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: [
          "style-loader", // 将 JS 字符串生成为 style 节点
          "css-loader", // 将 CSS 转化成 CommonJS 模块
          "sass-loader" // 将 Sass 编译成 CSS，默认使用 Node Sass
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: ["file-loader"]
      },
    ]
  },
  devtool: "cheap-module-eval-source-map",
  devServer: {
    compress: true,
    open: true,
    port: 8083,
    progress: true,
    contentBase: resolve(__dirname, '../dist')
  },
  plugins:[
    
  ]
})