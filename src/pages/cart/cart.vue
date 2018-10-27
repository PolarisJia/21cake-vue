<template>
  <Contain>
    <div>
      <header>购物车</header>
      <ul class="cart-list">
        <li>
          <van-checkbox class="chk"></van-checkbox>
          <div class="goods">
            <img src="#" alt="">
            <p>111</p>
            <p>222</p>
            <p>
              <span>3333</span>
              <van-stepper v-model="num" class="stepper"/>
            </p>
          </div>
          <div class="conf">
            <p>4444</p>
            <p>5555</p>
          </div>
        </li>
      </ul>
    </div>
  </Contain>
</template>

<script>
import Contain from 'components/contain/contain'
export default {
  data () {
    return {
      num: 1
    }
  },
  components: {
    Contain
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/style/variable"
@import "~common/style/base"
header
  width 100%
  height 50px
  line-height 50px
  background-color $primaryColor
  font-size 16px
  text-align center
  color #ffffff
  font-weight bold
  position fixed
  top 0
  left 0
.cart-list
  margin-top 50px
  li
    position relative
  .chk
    display inline-block
    position absolute
    top 80px
    left 10px
  .goods,.conf
    width 85%
    margin-left 15%
    p
      margin 5px 0
    .stepper
      display inline-block
  .goods
    img
      width 45%
</style>
