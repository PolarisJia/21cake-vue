<template>
  <Contain>
    <div>
      <header>{{goodsList.length ? `购物车(${this.goodsList.length})` : '购物车'}}</header>
      <ul class="cart-list" v-if="goodsList.length">
        <li v-for="(v, i) in goodsList" :key="i">
          <van-checkbox class="chk" v-model="v.status"></van-checkbox>
          <div class="goods">
            <dl class="clearfix">
              <dt><img :src="host.static + v.img_url" :alt="v.cn_name"></dt>
              <dd>
                <p>{{v.en_name}}</p>
                <p>{{v.cn_name}}</p>
                <p>
                  <span>￥{{v.price}}</span>
                  <van-stepper v-model="v.num" class="stepper r"/>
                </p>
              </dd>
            </dl>
          </div>
          <div class="conf">
            <p>{{v.cutlery_content}}</p>
          </div>
        </li>
      </ul>
      <div class="empty" v-else>
        您的购物车什么都没有，快<router-link to="/gallery">去购物</router-link>吧~
      </div>
      <!-- <van-swipe-cell :right-width="65">
        <div>asfkjdsdflkjfdslslkf<br>dfsdff<br><button>btton</button></div>
        <span slot="right">删除</span>
      </van-swipe-cell> -->
    </div>
  </Contain>
</template>

<script>
import Contain from 'components/contain/contain'
export default {
  data () {
    return {
      host: {
        static: 'https://static.21cake.com/'
      },
      goodsList: []
    }
  },
  created () {
    this.$db.find({}, (err, docs) => {
      if (docs.length) {
        docs.map(d => {
          d.status = false
        })
        this.goodsList = docs
      } else {
        this.goodsList = []
        console.log(err)
      }
    })
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
.cart-list,.empty
  margin-top 60px
.cart-list
  li
    padding 10px
    box-sizing border-box
    position relative
    box-shadow 0 0 5px rgba(0, 0, 0, .5)
  .chk
    display inline-block
    position absolute
    top 50px
    left 10px
  .goods,.conf
    width 85%
    margin-left 15%
    p
      margin 5px 0
    .stepper
      display inline-block
  .goods
    dl
      margin 0
      dt,dd
        float left
      dt
        width 30%
        img
          width 80%
      dd
        width 70%
        margin-left 0
        p
          font-size 12px
        span
          font-size 14px
          vertical-align -webkit-baseline-middle
        .stepper
          margin-right 10px
  .conf
    font-size 12px
.empty
  height 300px
  background url('~common/images/cart-empty.png') no-repeat center
  line-height 550px
  text-align center
  a
    color $primaryColor
</style>
