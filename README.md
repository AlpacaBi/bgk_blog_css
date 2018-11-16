硬广植入：本人自己搭建了个git代码托管服务器，各位大佬可以在我的git服务器里建立免费的私有库，也可以作为备用代码储存点，毕竟github总是会出问题的，本git服务器架设在华为云的广州节点上，git代码托管地址如下：
http://gayhub.fun (ps.本人不是基佬)

---



# 项目简介
本项目是我个人网站[Alpaca Bi的个人博客](https:biguokang.cn)的前台源码，基于react开发，使用了create-react-app脚手架创建，该项目目前依然在维护中。想看本项目完整效果，可以访问我的个人网站

# 安装与使用方法
### 安装过程
1. 在你的项目目录下，使用`git clone https://github.com/biguokang/bgk_blog_css.git `命令
2. 下载完成后，进入目录，输入`npm install`命令
3. 之后输入`npm start`，项目即可运行

### 注意事项
- 本项目只是单纯的前台，如果你想体验完整效果，你必须先要架设后台，这样前台才能取到数据，你需要去下载并运行我的后台代码，你可以[点击这里](https://baidu.com)下载后台代码和架设方法
- 本项目webpack-dev-server默认端口为3000，而后台端口号为8888，所以为了解决跨域问题，本人设置了反向代理(create-react-app如何设置反代自己百度)，如果你想更改反向代理的配置，你进入更目录下package.json文件修改如下代码即可
```json
"proxy": {
    "/apis": {
      "target": "http://localhost:8888",
      "changeOrigin": true,
      "pathRewrite": {
        "^/apis": "/"
      }
    }
}
```


# 本前台项目所用到的技术和工具
- 开发语言：JavaScript和ES6标准
- 框架：react
- 状态管理：redux react-redux
- 异步处理中间件：redux-saga
- 路由管理：react-router-dom
- 脚手架：create-react-app
- 模态框：react-modal
- 下拉框：react-select
- 网络请求工具：axios
- MD5签名工具：node-forge
- 反向代理工具：nginx（线上环境）
- 服务器：阿里云华南节点
- 右下角的ai小人：基于live2d.js技术的web嵌入式智能ai，这也是本人的另一个项目，想了解可以[点此这里](https://github.com/biguokang/live2d_ai)






