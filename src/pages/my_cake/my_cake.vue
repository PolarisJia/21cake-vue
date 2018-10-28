<template>
  <Contain>
    <div class="container">
      <div class="user">
        <div class="filter"></div>
        <div class="head-picture">
          <i></i>
          WangJia
        </div>
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
      i
        display inline-block
        width 70px
        height 70px
        background url('~common/images/300x300.jpg') no-repeat
        background-size cover
        vertical-align -webkit-baseline-middle
        border-radius 70px
        margin-left 10px
        margin-top -10px
  .account
    height 50px
    p
      width 50%
      height 50px
      line-height 50px
      margin 0
      float left
      text-align center
      box-sizing border-box
      &:first-child
        border-right 1px solid $dividerColor
</style>
