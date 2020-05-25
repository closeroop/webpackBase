### 1. 什么是webpack
> `webpack` 是一个模块打包工具，他把有依赖关系的各个模块按照一定的规则和顺序组织在一起。最后输出一个或多个主文件入口，附带相关资源。

### 1.1 相关概念
> chunk：chunk是对一组有依赖关系的模块的封装<br/>

### 2. commomJS 和 ES6 modules 的区别
> 1.`commomJS` 和 `ES6 modules` 最本质的区别是模块建立依赖关系的时机不同，前者是动态的，后者是静态的。动态是指在代码运行阶段建立依赖，而静态则在代码编译阶建立。
<br/> 2. `commomJS` 引入的模块获取的是一份。拷贝的值，`ES6 modules` 获取的是内容的动态引用。`commomJS` 允许对导出值进行修改，`ES6 modules`则不允许直接修改，可通过导出的方法间接修改值。另外，`commomJS` 导出一次后，之后再导入相同的模块都是第一次导出结果的缓存。
<br/> 3. 基于两者导出的性质。对解决模块循环引用的问题是不同的。后者可以解决这个问题。

### 3. webpack 的打包原理
>webpack会分析每个入口文件，解析包依赖关系的各个文件，每个模块都打包到bundle.js。webpack给每个模块分配一个唯一的ID并通过这个ID索引和访问模块。页面运行时，先启动entry.js，其他模块会在运行require时候执行。

### 4. output里的 `path` 和 `publicPath` 有什么区别
> `path` 指的是资源打包输出的路径 <br />
  `publicPath` 指得是资源的访问路径，会自动加上前缀

### 5. webpack打包优化项
> 1.`optimization -> splitChunk` 代码分割 <br/>
  2_ `module -> noParse` //防止 webpack 解析那些任何与给定正则表达式相匹配的文件 <br/>
  3.`piugin -> ignorePlugin` 完全排除一些模块，被排除的模块即便被引用了也不会被打包进资源文件中<br/>
  4.`piugin -> happypack` 多进程打包 <br/>
  5.开启`cache`，缓存js编译或压缩文件 <br/>
  6.`mode` 开启 `production` 选项 <br/>
  7.使用`dilPlugin` 将用到较大的又不会改动的库进行预打包，再用 `DllReferencePlugin` 进行加载。<br/>
  8.使用`babel-loader`的时候将编译的模块转换成`ESmodule`模块，利用`tree shaking`
  9. 使用 `speed-measure-webpack-plugin` 插件分析优化打包耗时

### 5. 小知识
> 安装 `node-sass` 时需要下载一个系统相关的二进制包，这个二进制包通常下载较慢，甚至有可能超时，因此通常我们会为其设置一个 `cnpm` 的镜像地址。可使用如下命令：<br />
`npm config set sass_binary_site=https://npm.taobao.org/mirrors/node-sass/`


