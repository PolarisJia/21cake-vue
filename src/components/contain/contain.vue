<template>
  <div>
    <main>
      <slot></slot>
    </main>
    <footer>
      <van-tabbar v-model="active" @change="tabbarChange">
        <van-tabbar-item icon="home">首页</van-tabbar-item>
        <van-tabbar-item icon="wap-nav">分类</van-tabbar-item>
        <van-tabbar-item icon="cart">购物车</van-tabbar-item>
        <van-tabbar-item icon="contact">我的</van-tabbar-item>
      </van-tabbar>
    </footer>
  </div>
</template>

<script>
import {mapMutations} from 'vuex'
export default {
  data () {
    return {
      active: 0
    }
  },
  methods: {
    tabbarChange () {
      this.setTabbarActive(this.active)
    },
    ...mapMutations({
      setTabbarActive: 'SET_TABBAR_ACTIVE'
    })
  }
}
</script>

<style lang="stylus" scoped>
main
  padding-bottom 50px
footer
  height 50px
</style>
