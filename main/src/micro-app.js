import store from './store'

const microApps = [
  {
    name: '最简单的vue的结构',
    entry: process.env.VUE_APP_SUB_VUE,
    activeRule: '/sub-vue'
  },
  {
    name: '复杂的vue demo',
    entry: process.env.VUE_APP_SUB_DEMO,
    activeRule: '/vue-demo'
  },
  {
    name: '最简单的react的结构',
    entry: process.env.VUE_APP_SUB_REACT,
    activeRule: '/sub-react'
  },
  {
    name: 'sub-html',
    entry: process.env.VUE_APP_SUB_HTML,
    activeRule: '/sub-html'
  }
]

const apps = microApps.map(item => {
  return {
    ...item,
    container: '#subapp-viewport', // 子应用挂载的div
    props: {
      routerBase: item.activeRule, // 下发基础路由
      getGlobalState: store.getGlobalState // 下发getGlobalState方法
    }
  }
})

export default apps
