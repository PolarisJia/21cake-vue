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
              <a href="javascript:;" @click="goodDetail(g.cake_goods_id)"><img v-lazy="host.static + g.img_url" :alt="g.name" class="img-responsive"></a>
            </div>
            <p class="en-nam substring">{{g.en_name}}</p>
            <p class="name substring">{{g.name}}</p>
            <div class="opera"><span class="l substring"><output>￥{{g.price}}</output>/{{g.spec}}</span><a href="javascript:;" class="r add-cart fa fa-cart-plus" @click="addCart = true"></a></div>
          </div>
        </van-list>
      </div>
    </div>
    <van-popup v-show="addCart">
      <div class="select-size">
        cart
      </div>
    </van-popup>
  </Contain>
</template>

<script>
import Contain from 'components/contain/contain'
import Search from 'components/search/search'
import { queryGallery } from 'api/cake-vue-resource'
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
      addCart: false
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
    goodDetail (id) {
      console.log(`http://m.21cake.com/goods-${id}.html`)
    }
  },
  created () {
    this._queryGallery()
    this.$toast('哈哈哈')
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
.select-size
  width 90%
  background-color #ff4444
</style>
