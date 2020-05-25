const path = require("path");
const webpack = require("webpack")
module.exports = {
  mode: 'production',
  entry: {
    dllVender: ['lodash', 'react']
  },
  output: {
    path: path.resolve(__dirname, '../'),
    filename: "dll/dll.[name].js",
    library: "dllVenders"
  },
  plugins: [
    new webpack.DllPlugin({
      name: "dllVenders", //对应 output 的 library
      path: path.join(__dirname, '../dll/[name]-manifest.json'), //  manifest.json，让 DLLReferencePlugin 映射到相关的依赖上去的。
    }),
    new webpack.HashedModuleIdsPlugin() // 可以把id的生成算法改为根据模块的引用路径生成一个字符串hash,不会因为操作vendor中的其他模块而改变
  ]
}