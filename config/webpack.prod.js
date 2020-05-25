const { smart } = require("webpack-merge")
const { resolve } = require("path")
const baseConfig = require("./webpack.common.js")
const path = require('path')
const webpack = require("webpack")
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// 提取css
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// 压缩 js
const TerserPlugin = require('terser-webpack-plugin');
// 压缩 css
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
// 风析 bundle
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = smart(baseConfig, {
  mode: 'production',
  output: {
    filename: "js/[name]@bundle.[chunkhash].js",
    chunkFilename: 'js/[name]@sync.[chunkhash].js',
    path: resolve(__dirname, '../dist')
  },
  devtool: "nosources-source-map",
  module: {
    rules: [{
        test: /\.(sa|sc|c)ss$/,
        exclude: /node_modules/,
        use: [{
          loader: MiniCssExtractPlugin.loader,
          options: {
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            publicPath: '../',
          }
        }, "css-loader", "sass-loader"]
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [{
          loader: 'url-loader',
          options: {
            limit: 2048 * 5, // 10kB
            outputPath: 'image',
            name: '[name].[ext]'
          }
        }]
      }
    ]
  },
  optimization: {
    minimizer: [
      // 压缩js
      new TerserPlugin({
        cache: true, // 开启缓存
        parallel: true, // 是否启用多进程
        sourceMap: true, //是否生成sourceMap
        terserOptions: {
          output: {
            comments: false // 去掉注释
          }
        }
      }),
      // 压缩css
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {
      chunks: 'all',
      minSize: 1024 * 3,
      maxSize: 0,
      maxAsyncRequests: 5,
      maxInitialRequests: 3,
      automaticNameDelimiter: '~',
      name: true,
      cacheGroups: {
        // 第三方模块
        vendors: {
          name: 'vendor', // 不配置默认用分组名
          minSize: 1024,
          test: /[\\/]node_modules[\\/]/,
          //filename: '[name].bundle.js',
          priority: -10,
          minChunks: 1,
        },
        // 公共模块
        common: {
          name: 'common',
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true
        }
      }
    }
  },
  plugins: [
    new webpack.DllReferencePlugin({
      manifest: require(path.join(__dirname, '../dll/dllVender-manifest.json')),
    }),
    new CleanWebpackPlugin(),
    // 提取css到一个文件
    new MiniCssExtractPlugin({
      esModule: true, // tree shaking
      filename: "css/[name].[contentHash:8].css",
      chunkFilename: "css/[id].[contentHash:8].css", //异步CSS
    }),
    // new BundleAnalyzerPlugin({
    //   analyzerPort: 8084, // 运行后的端口号
    // })
  ]
})