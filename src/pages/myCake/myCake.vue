<template>
  <Contain>
    <div class="container">
      <div class="user">
        <div class="filter"></div>
        <div class="head-picture">1111</div>
      </div>
      <div class="account">
        <p>
          0张优惠券
        </p>
        <p>
          ￥0.00余额
        </p>
      </div>
      <van-cell-group>
        <van-cell title="我的订单" is-link icon="pending-orders" />
        <van-cell title="地址管理" is-link icon="logistics" />
        <van-cell title="优惠券" is-link icon="idcard" />
        <van-cell title="余额充值" is-link icon="gold-coin" />
      </van-cell-group>
    </div>
  </Contain>
</template>

<script>
import Contain from 'components/contain/contain'
export default {
  data () {
    return {}
  },
  components: {
    Contain
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/style/variable"
@import "~common/style/base"
.container
  .user
    height 250px
    position relative
    overflow hidden
    .filter
      position absolute
      top -2px
      right -2px
      bottom -2px
      left -2px
      background url('~common/images/pc-bg.jpg') no-repeat center center
      background-size cover
      filter blur(2px)
      z-index 1
    .head-picture
      position relative
      width 90%
      height 50px
      margin 80px auto 0
      background-color #fff
      z-index 2
</style>
