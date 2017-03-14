基础环境：nodejs

###注意：
1.执行`npm install`命令， 如果安装了cnpm 也可以执行 `cnpm install`
2.package.json的scripts中已经配置好相关命令(不同操作平台执行的命令是不一样的)
3.以windows为例：本地开发调试执行`dev-win`；执行命令以后可以通过 http://localhost:8080 端口访问，也可通过 http://localhost:8080/webpack-dev-server 访问,
 同时也需要修改tpls下的入口文件注释`<script src="../../../dist/main.js"></script>`，放开`<script src="http://localhost:8080/wui/src/main/webapp/m/dist/main.js"></script>`的注释
4.上线打包执行`publish-win`
5.注意：webpack.config.js中的publicPath配置的地址不同的环境有可能不一样


vue2.0+vue-router2.0+mint-ui

.eslintrc       是代码规范检查的配置文件
.eslintignore   是忽略检查哪些目录的配置文件
.editorconfig   编码规范
.babelrc        es6转es5
