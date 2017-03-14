var path = require('path');
var webpack = require('webpack');

//资源压缩
var CompressionWebpackPlugin = require("compression-webpack-plugin");
//编译进度
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
//webpack插件，用于清除目录文件
var CleanPlugin = require('clean-webpack-plugin');
//当前编译的环境
var NODE_ENV = process.env.NODE_ENV;
//编译以后的目录
var BUILD_PATH = path.resolve(__dirname, 'dist');
//自动打开浏览器
var OPEN_BROWSER = require('open-browser-webpack-plugin');
//html模板
var HtmlWebpackPlugin = require('html-webpack-plugin');
//端口
var PORT = '8080';
//自动打开浏览器的url
var OPEN_BROWSER_URL = 'http://localhost:' + PORT + '/dist/bszl.html';
//source-map配置
var SOURCE_MAP = NODE_ENV == 'prod' ? 'cheap-module-source-map' : 'cheap-module-eval-source-map';
//发布时所引用的路径
var PUBLIC_PATH = NODE_ENV == 'prod' ? '/m/dist/' : '/dist/';
//编译后js的目录
var BUILD_SRC = 'js/';//编译后js的目录
var BUILD_HTML = '';//编译后tpls的目录


//需要单独打包的库
var vendors = [
  'vue',
  'vue-router',
  'mint-ui',
  'webpack-zepto'
];

var config = {
  entry: {
    'main': './src/main',
    //依赖的包
    vendor: vendors
  },
  output: {
    path: BUILD_PATH,  //输出目录
    filename: NODE_ENV === "dev" ? '[name].js' : "[name]-[chunkhash:8].js",
    chunkFilename: BUILD_SRC + NODE_ENV === "dev" ? '[name].js' : "[name]-[chunkhash:8].js",
    publicPath: PUBLIC_PATH
  },
  resolve: {
    // require时省略的扩展名，遇到.vue结尾的也要去加载
    extensions: ['', '.js', '.vue', '.scss'],
    root: [
      path.resolve('./node_modules')
    ],
  },
  //代码热更新
  devServer: {
    host: '0.0.0.0',
    hot: true,
    inline: true,
    port: PORT
  },
  //代码规范检查
  eslint: {
    configFile: './.eslintrc'
  },
  //报错以后检查问题
  devtool: SOURCE_MAP,
  module: {
    loaders: [
      {
        test: /\.vue$/,
        loader: 'vue'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
      {
        test: /\.js$/,
        loader: 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        loader: 'style!css!autoprefixer'
      },
      {
        test: /\.scss$/,
        loader: 'style!css!sass?sourceMap'
      },
      {
        test: /\.(gif|jpg|png|jpeg|svg)$/,
        loader: 'url-loader?limit=10000'
      },
      {
        test: /\.(eot|woff|woff2|ttf|svg)$/,
        loader: 'url-loader?limit=5000'
      }
    ]
  }
};

//根据不同环境执行不同配置
if (NODE_ENV === "prod") {
  config.plugins = [
    //删除dist文件夹
    new CleanPlugin(['dist']),
    //资源压缩
    new webpack.optimize.UglifyJsPlugin({
      comments: false,        //去掉注释
      compress: {
        warnings: false    //忽略警告,要不然会有一大堆的黄色字体出现……
      },
      // 排除关键字，不能混淆
      except: ['$', 'exports', 'require']
    }),
    //删除重复的依赖
    new webpack.optimize.DedupePlugin(),
    //分析和优先考虑使用最多的模块，并为它们分配最小的ID，通过分析ID，可以建议降低总文件的大小
    new webpack.optimize.OccurenceOrderPlugin(),
    //通用模块打包
    new webpack.optimize.AggressiveMergingPlugin(),
    /*new CompressionWebpackPlugin({ //gzip 压缩 需要ngix配合，所以关掉
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(js|css)$'    //压缩 js 与 css
      ),
      threshold: 10240,
      minRatio: 0.8
    }),*/
    new BundleAnalyzerPlugin()
  ];
} else {
  config.plugins = [
    //开启热替换插件
    new webpack.HotModuleReplacementPlugin(),
    //编译后自动打开浏览器
    new OPEN_BROWSER({url: OPEN_BROWSER_URL}),
    //跳过编译时出错的代码并记录，使编译后运行时的包不会发生错误
    new webpack.NoErrorsPlugin()
  ];
}


config.plugins.push(
  // 全局挂载zepto插件
  new webpack.ProvidePlugin({
    $: "webpack-zepto"
  }),
  //依赖的包
  new webpack.optimize.CommonsChunkPlugin({
    name: "vendor",
    filename: NODE_ENV === "dev" ? '[name].js' : "[name]-[chunkhash:8].js",
    minChunks: Infinity
  }),
  //生成html
  new HtmlWebpackPlugin({
    filename: BUILD_HTML + 'index.html',
    template: './src/tpls/index.html',
    inject: true,
    title: '首页'
  })
);

module.exports = config;
