module.exports = {
  transpileDependencies: ['common'],
  chainWebpack: config => {
    config.plugin('html')
      .tap((args) => {
        args[0].title = 'micro-template'
        return args
      })
  },
  devServer: {
    proxy: {
      '/dev-api/*': {
        target: 'http://localhost:9527/dev-api/'
      }
    }
  }
}
