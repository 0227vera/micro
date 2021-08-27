# micro-template

使用框架 qiankun, 作为模板:

1. 主应用 vue，子应用使用 `react`, `vue` 和 `原生HTML`
2. 最简单的功能和简单的demo

## 开始

安装根目录工程依赖

```shell
npm i
```

一键安装所有主子应用的依赖

```shell
npm run install
```

如果sub-html中的没有安装上

```shell
cd sub-html && npm i
```

一键启动所有所有应用

```shell
npm start
```

通过 [http://localhost:8080/](http://localhost:8080/) 访问主应用。

## 发布

一键构建并打包所有主子应用

```shell
npm run build
```
