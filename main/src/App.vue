<template>
  <div class="layout-wrapper">
    <div class="layout-header">
      <el-menu
        class="el-menu-demo"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :default-active="current"
        mode="horizontal"
        @select="goto"
      >
        <el-submenu index="main">
          <template slot="title">我的应用</template>
          <el-menu-item
            v-for="item in microApps"
            :key="item.activeRule"
            :index="item.activeRule"
          >
            {{item.name}}
          </el-menu-item>
        </el-submenu>
        <el-menu-item
          v-for="item in microApps"
          :key="item.activeRule"
          :index="item.activeRule"
        >
          {{item.name}}
        </el-menu-item>
      </el-menu>
    </div>
    <div id="subapp-viewport" />
  </div>
</template>

<script>
import NProgress from 'nprogress'
import microApps from './micro-app'
import store from '@/store'
import { Menu, MenuItem, Submenu } from 'element-ui'
export default {
  name: 'App',
  data () {
    return {
      isLoading: true,
      microApps,
      current: '/sub-vue/'
    }
  },
  computed: {
    state () {
      // 如果只需要取某个命名空间下的state，比如 user ，可以加上参数
      // return store.getGlobalState('user')
      // 返回所有的state则不需添加参数
      return store.getGlobalState()
    }
  },
  watch: {
    isLoading (val) {
      if (val) {
        NProgress.start()
      } else {
        this.$nextTick(() => {
          NProgress.done()
        })
      }
    }
  },
  components: {
    'el-menu': Menu,
    'el-menu-item': MenuItem,
    'el-submenu': Submenu
  },
  methods: {
    goto (item, event) {
      history.pushState(null, item, item)
    },
    bindCurrent () {
      const path = window.location.pathname
      if (this.microApps.findIndex(item => item.activeRule === path) >= 0) {
        this.current = path
      }
    },
    listenRouterChange () {
      // NOTE: 兼容IE
      const _wr = function (type) {
        const orig = history[type]
        return function () {
          const rv = orig.apply(this, arguments)
          const e = new Event(type)
          e.arguments = arguments
          window.dispatchEvent(e)
          return rv
        }
      }
      history.pushState = _wr('pushState')
      window.addEventListener('pushState', this.bindCurrent)
      window.addEventListener('popstate', this.bindCurrent)
      this.$once('hook:beforeDestroy', () => {
        window.removeEventListener('pushState', this.bindCurrent)
        window.removeEventListener('popstate', this.bindCurrent)
      })
    }
  },
  created () {
    this.bindCurrent()
    NProgress.start()
  },
  mounted () {
    this.listenRouterChange()
  }
}
</script>

<style lang="scss">
html, body{
  margin: 0 !important;
  padding: 0;
}
.layout-wrapper{
  .layout-header{
    height: 60px;
    width: 100%;
    overflow: hidden;
  }
}
</style>
