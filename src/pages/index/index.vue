<template>
  <Contain>
    <Search :location="true" class="search"></Search>
    <van-swipe :autoplay="5000" class="swiper">
      <van-swipe-item v-for="(img, i) in sliders" :key="i">
        <img v-lazy="host.static + img.img_url" :alt="img.name" class="img-responsive">
      </van-swipe-item>
    </van-swipe>
    <div class="tips">
      <ul>
        <li v-for="(tip, i) in tips" :key="i">
          <van-icon name="info-o"></van-icon>{{tip}}
        </li>
      </ul>
    </div>
    <div class="type">
      <ul class="clearfix">
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
    <div class="activity" v-for="a in activity" :key="a.title">
      <p class="title"><span class="l">{{a.title}}</span></p>
      <ul>
        <li v-for="(d, i) in a.data" :key="i + d.name">
          <div class="desc l">
            <p>{{d.name}}</p>
            <p>{{d.remain}}</p>
          </div>
          <img v-lazy="host.static + d.img_url" :alt="d.name" class="l">
        </li>
      </ul>
    </div>
    <div class="magazine" v-for="m in magazine" :key="m.title">
      <p class="title"><span class="l">{{m.title}}</span></p>
      <ul>
        <li v-for="(d, i) in m.data" :key="i + d.name">
          <img v-lazy="host.static + d.banner" :alt="d.name">
          <span>{{d.name}}</span>
        </li>
      </ul>
    </div>
    <p class="no-more">————— 我也是有底线的 —————</p>
  </Contain>
</template>

<script>
import Contain from 'components/contain/contain'
import Search from 'components/search/search'
import { queryIndexData } from 'api/cake-vue-resource'
export default {
  data () {
    return {
      host: {
        static: 'https://static.21cake.com/'
      },
      sliders: [],
      tips: [],
      classification: [],
      floorV2: [],
      activity: [],
      magazine: []
    }
  },
  methods: {
    _queryIndexData () {
      queryIndexData(`?method=Advertisement.showV2&v=1.0&cityId=1&position=home_top%2Ctips%2Cclassification%2Chome_floor_v2%2Cactivity%2Cmagazine&channel=wap`).then(res => {
        this.sliders = res.data[0].data
        this.tips = res.data[1].data
        this.classification = res.data[2].data
        this.floorV2 = res.data[3].data
        this.activity = [res.data[4]]
        this.magazine = [res.data[5]]
      })
    }
  },
  created () {
    this._queryIndexData()
  },
  components: {
    Contain,
    Search
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/style/variable"
@import "~common/style/base"
.swiper
  margin-top 50px
.search
  margin-bottom 50px
.tips
  margin 10px 0
  ul
    display flex
    justify-content space-around
    li
      text-align center
      color $lightPrimaryColor
      font-size 12px
      i
        top 2px
        right 5px
.type
  ul
    li
      width 25%
      height 110px
      color $primaryText
      text-align center
      font-size 12px
      float left
      img
        width 75%
        display inline-block
      p
        margin-top 0
.floor,.activity,.magazine
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
.floor
  .product
    box-shadow()
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
.activity
  margin-bottom 20px
  li
    height 150px
    box-shadow()
    .desc
      width 35%
      p
        padding-left 10px
    img
      width 65%
      height 150px
.magazine
  ul
    width 100%
    height 150px
    overflow hidden
    overflow-x scroll
    white-space nowrap
    li
      display inline-block
      width 70%
      height 145px
      overflow hidden
      margin-right 15px
      white-space normal
      border-radius 4px
      box-shadow()
      img
        width 100%
        height 120px
      span
        margin-left 10px
.no-more
  text-align center
  color $dividerColor
  font-size 12px
</style>
