<template>
  <Contain>
    <van-swipe :autoplay="5000">
      <van-swipe-item v-for="(img, i) in sliders" :key="i">
        <img v-lazy="host.static + img.img_url" :alt="img.name" class="img-responsive">
      </van-swipe-item>
    </van-swipe>
    <div class="tips">
      <ul>
        <li v-for="(tip, i) in tips" :key="i">
          <van-icon name="warn"></van-icon>{{tip}}
        </li>
      </ul>
    </div>
    <div class="type">
      <ul>
        <li v-for="(cls, i) in classification" :key="i">
          <img v-lazy="host.static + cls.img_url" :alt="cls.name">
          <p>{{cls.name}}</p>
        </li>
      </ul>
    </div>
    <div class="floor" v-for="(flr, i) in floorV2" :key="i">
      <p class="title"><span class="l">{{flr.title}}</span><a href="javascript:;" class="r">更多&gt;&gt;</a></p>
      <div class="product" v-for="(product, i) in flr.contents" :key="i">
        <img v-lazy="host.static + product.imageUrl" :alt="product.name" class="img-responsive">
        <p class="name">{{product.name}}</p>
        <p class="desc">{{product.description}}</p>
        <div class="price-info">
          <div class="l">
            <span class="price">{{product.price}}</span>元/<span>{{product.spec}}</span>
          </div>
          <div class="r">
            <a href="javascript:;" class="add-cart"><van-icon name="shopping-cart"></van-icon></a>
          </div>
        </div>
      </div>
    </div>
  </Contain>
</template>

<script>
import Contain from 'components/contain/contain'
import {queryIndexInfo} from 'api/index'
// import {mapGetters} from 'vuex'

export default {
  data () {
    return {
      host: {
        static: 'http://static.21cake.com/'
      },
      sliders: [],
      tips: [],
      classification: [],
      floorV2: [],
      activity: [],
      magazine: [],
      active: 0
    }
  },
  methods: {
    _queryIndexInfo () {
      let param = '?method=Advertisement.showV2&v=1.0&cityId=1&position=home_top%2Ctips%2Cclassification%2Chome_floor_v2%2Cactivity%2Cmagazine&channel=wap&_=1525223845808'
      queryIndexInfo(param).then(res => {
        this.sliders = res.data[0].data
        this.tips = res.data[1].data
        this.classification = res.data[2].data
        this.floorV2 = res.data[3].data
        this.activity = res.data[4].data
        this.magazine = res.data[5].data
      })
      console.log(this.tabbarActive)
    }
  },
  created () {
    this._queryIndexInfo()
  },
  computed: {
    // ...mapGetters({
    //   tabbarActive: 'setTabbarActive'
    // })
  },
  components: {
    Contain
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/style/variable"
@import "~common/style/base"
.tips,.type
  margin 10px 0
  ul
    display flex
    justify-content space-around
    li
      text-align center
      color $lightPrimaryColor
      font-size 12px
      i
        margin-right 5px
.type
  ul
    li
      width 25%
      color $primaryText
      img
        width 75%
        display inline-block
      p
        margin-top 0
.floor
  width 90%
  margin 0 auto
  font-size 12px
  .title
    height 30px
    line-height 30px
    border-top 1px solid $dividerColor
    span,a
      display inline-block
    span
      padding 0 8px
      border-radius 10px
      background-color $accentColor
      color $iconColor
      line-height 20px
      margin-top 5px
  .product
    box-shadow 0 0 8px 0 rgba(194, 194, 194, .3)
    border-radius 6px
    margin-bottom 20px
    overflow hidden
    .name,.desc
      margin 3px 0
      padding 0 5px
    .name
      font-size 14px
      font-weight bold
    .price-info
      height 35px
      padding 0 5px
      line-height 25px
      .price
        color $priceColor
        font-size 14px
      .add-cart
        color $primaryColor
        font-size 16px
        margin-right 10px
</style>
