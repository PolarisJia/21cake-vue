<template>
  <Contain>
    <Search></Search>
    <div class="container">
      <div class="title fixed">
        <a href="javascript:;" :class="{'active': active === i}" v-for="(v, i) in tabs" :key="i" @click="active = i">{{v.title}}</a>
      </div>
      <div class="filter fixed">
        <ul>
          <li><a href="javascript:;">默认</a></li>
          <li><a href="javascritp:;">价格</a></li>
          <li><a href="javascritp:;" class="fa fa-filter"> 筛选</a></li>
        </ul>
      </div>
      <div class="goods">
        <van-list v-model="loading" :finished="finished" @load="loadGoods">
          <div class="good" v-for="(g, j) in goods" :key="j">
            <div class="imgs">
              <img v-if="g.label && g.label.length" v-lazy="host.static + g.label[0].icon" :alt="g.label[0].name" class="img-responsive tag">
              <router-link :to="`/goods?id=${g.cake_goods_id}`"><img v-lazy="host.static + g.img_url" :alt="g.name" class="img-responsive"></router-link>
            </div>
            <p class="en-nam substring">{{g.en_name}}</p>
            <p class="name substring">{{g.name}}</p>
            <div class="opera"><span class="l substring"><output>￥{{g.price}}</output>/{{g.spec}}</span><a href="javascript:;" class="r add-cart fa fa-cart-plus" @click="getGoodsSize(g.cake_goods_id)"></a></div>
          </div>
        </van-list>
      </div>
    </div>
    <van-popup v-model="addCart" @click-overlay="clearGoodsInfo">
      <div class="size-box">
        <p><span class="price">￥{{goodsSizes[goodsCurrentSize].price}}</span><a href="javascript:;" class="r close" @click="addCart = false">&times;</a></p>
        <ul>
          <li><i class="fa fa-arrows-alt"></i>{{goodsSizes[goodsCurrentSize].size}}</li>
          <li><i class="fa fa-users"></i>{{goodsSizes[goodsCurrentSize].suite_amount}}</li>
          <li><i class="fa fa-cutlery"></i>{{goodsSizes[goodsCurrentSize].cutlery_content}}</li>
          <li><i class="fa fa-clock-o"></i>须提前{{goodsSizes[goodsCurrentSize].booking_hour_limited}}小时预订</li>
        </ul>
        <img v-if="goodsSizes[0].price" :src="host.static + goodsSizes[goodsCurrentSize].img_url" :alt="goodsSizes[goodsCurrentSize].size" class="img-responsive">
        <p>商品规格</p>
        <p class="select-size">
          <button type="button" v-if="goodsSizes[0].price" v-for="(v, i) in goodsSizes" :key="i" @click="goodsCurrentSize = i" :class="{'select': goodsCurrentSize === i}">{{v.spec}}</button>
        </p>
        <a href="javascript:;" class="add-cart-size" @click="addGoodsToCart">加入购物车（￥{{goodsSizes[goodsCurrentSize].price}}）</a>
      </div>
    </van-popup>
  </Contain>
</template>

<script>
import Contain from 'components/contain/contain'
import Search from 'components/search/search'
import { queryGallery, queryGoodsSize } from 'api/cake-vue-resource'
export default {
  data () {
    return {
      host: {
        static: 'https://static.21cake.com/'
      },
      active: 0,
      tabs: [{
        title: '蛋糕',
        value: 6
      }, {
        title: '冰淇淋',
        value: 23
      }, {
        title: '咖啡下午茶',
        value: 8
      }, {
        title: '常温蛋糕',
        value: 24
      }, {
        title: '设计师礼品',
        value: 21
      }],
      goods: [],
      goodsCache: [],
      loading: false,
      finished: false,
      startIndex: 0,
      endIndex: 10,
      addCart: false,
      goodsCurrentSize: 0,
      goodsSizes: [{
        price: 0,
        size: '',
        suite_amount: '',
        cutlery_content: '',
        booking_hour_limited: '',
        img_url: ''
      }],
      goodsSaleTime: {}
    }
  },
  methods: {
    _queryGallery () {
      queryGallery(`?method=Gallery.goodsList&v=1.0&catId=${this.tabs[this.active].value}&cityId=2&channel=wap&_=${+new Date()}`).then(res => {
        if (res.code === 0) {
          this.goodsCache = res.data.goodsArr['1'].goods
        }
      })
    },
    loadGoods () {
      let timer = setTimeout(_ => {
        this.goods = this.goods.concat(this.goodsCache.slice(this.startIndex, this.endIndex))
        this.startIndex += 10
        this.endIndex += 10
        this.loading = false
        if (this.startIndex > this.goodsCache.length) this.finished = true
        clearTimeout(timer)
      }, 800)
    },
    getGoodsSize (id) {
      queryGoodsSize(`?method=Goods.goodsDetail&v=1.0&cityId=2&channel=wap&goodsId=${id}&_=${+new Date()}`).then(res => {
        if (res.code !== 0) {
          this.$toast({message: res.message ? res.message : '获取商品规格失败', type: 'fail'})
        } else {
          if (res.data.type === 'normal') {
            let proArr = Object.values(res.data.productsArr)
            let proIndex = proArr.findIndex(f => f.is_default === 'true')
            if (proArr.length > 1) {
              this.goodsSizes = proArr
              this.goodsSaleTime = res.data.saleTime
              this.goodsCurrentSize = proIndex
            } else {
              return false
            }
          } else if (res.data.type === 'multiply') {
            this.goodsSizes = Object.values(res.data.productsArr[0].productsArr)
            this.goodsSaleTime = res.data.productsArr.saleTime
          }
          this.addCart = true
        }
      })
    },
    clearGoodsInfo () {
      this.goodsSizes = [{
        price: 0,
        size: '',
        suite_amount: '',
        cutlery_content: '',
        booking_hour_limited: '',
        img_url: ''
      }]
      this.goodsSaleTime = {}
      this.goodsCurrentSize = 0
    },
    addGoodsToCart () {
      // 1
    }
  },
  created () {
    this._queryGallery()
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
.fixed
  position fixed
  left 0
  z-index 998
.title
  width 100%
  top 50px
  line-height 33px
  display flex
  justify-content space-around
  background-color #fff
  a
    font-size 14px
    border-bottom 2px solid transparent
  .active
    color $primaryColor
    border-color $primaryColor
.filter
  width 100%
  top 85px
  background-color #fff
  li
    line-height 28px
    float left
    text-align center
    border-top 1px solid $dividerColor
    border-bottom 1px solid $dividerColor
    font-size 12px
    &:nth-child(1),&:nth-child(2)
      width 35%
      border-right 1px solid $dividerColor
    &:nth-child(3)
      width 29.1%
  .active
    color $dividerColor
.goods
  height auto
  overflow auto
  padding 10px
  margin-top 75px
  .good
    width 50%
    margin-bottom 10px
    float left
    font-size 14px
    .imgs
      position relative
      width 100%
      .tag
        position absolute
        top 0
        left 0
        width 25%
    p
      margin 3px 0
    .opera
      span
        display inline-block
        width 80%
      output
        color $priceColor
      .add-cart
        display inline-block
        width 20%
        text-align center
        color $accentColor
        font-size 18px
.size-box
  width 50vh
  padding 0 20px
  box-sizing border-box
  .price
    color $priceColor
  .close
    display inline-block
    width 20px
    height 20px
    line-height 20px
    font-size 30px
  ul
    height 50px
    margin-bottom 20px
    li
      width 50%
      height 25px
      line-height 25px
      float left
      i
        display inline-block
        width 25px
        height 25px
        line-height 25px
  .select-size
    button
      background-color $dividerColor
      border 1px solid $dividerColor
      border-radius 4px
      margin 0 5px 10px
    .select
      background-color $primaryColor
      border-color $primaryColor
      color #fff
  .add-cart-size
    display block
    width 80%
    height 40px
    line-height 40px
    text-align center
    background-color $primaryColor
    color #fff
    border-radius 4px
    margin 0 auto 20px
</style>
