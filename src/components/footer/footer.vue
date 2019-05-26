<template>
  <van-tabbar v-model="active">
    <van-tabbar-item icon="home" to="/index">首页</van-tabbar-item>
    <van-tabbar-item icon="wap-nav" to="/gallery">列表</van-tabbar-item>
    <van-tabbar-item icon="cart" to="/cart">购物车</van-tabbar-item>
    <van-tabbar-item icon="contact" to="/mycake">我的</van-tabbar-item>
  </van-tabbar>
</template>

<script>
export default {
  data () {
    return {
      active: 0
    }
  },
  mounted () {
    if (sessionStorage['TABBARACTIVE']) {
      this.active = sessionStorage['TABBARACTIVE'] - 0
    } else {
      this.active = 0
    }
  },
  beforeDestroy () {
    sessionStorage['TABBARACTIVE'] = this.active
  }
}
</script>
