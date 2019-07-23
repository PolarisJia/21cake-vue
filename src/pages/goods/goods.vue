<template>
  <div>
    <div class="swipe">
      <van-swipe :autoplay="5000">
        <van-swipe-item v-for="(v, i) in swiperWrapper" :key="i">
          <img v-lazy="v.src" :alt="v.alt" class="img-responsive">
        </van-swipe-item>
      </van-swipe>
      <div class="nav">
        <a href="javascript:;" class="fa fa-angle-left l" @click="$router.go(-1)"></a>
        <router-link class="fa fa-shopping-cart r" to="/cart"></router-link>
      </div>
    </div>
    <div class="goods">
      <h3>{{enName}}</h3>
      <p>{{cnName}}</p>
      <p class="price">{{price}}</p>
      <div class="tags">
        <span v-for="(v, i) in tags" :key="i">{{v}}</span>
      </div>
      <ul class="taste">
        <li v-for="(v, i) in taste" :key="i">
          <img :src="v.src" :alt="v.alt" class="img-responsive"><span>{{v.alt}}</span>
        </li>
      </ul>
      <div class="sizes">
        <p class="select" @click="popup = true">已选择：{{goodsSizes[goodsCurrentSize].spec}}<i class="fa fa-angle-right r"></i></p>
        <ul class="clearfix">
          <li><i class="fa fa-arrows-alt"></i> {{goodsSizes[goodsCurrentSize].size}}</li>
          <li><i class="fa fa-users"></i> {{goodsSizes[goodsCurrentSize].cutlery_content}}</li>
          <li><i class="fa fa-cutlery"></i> {{goodsSizes[goodsCurrentSize].suite_amount}}</li>
          <li><i class="fa fa-clock-o"></i> 须提前{{goodsSizes[goodsCurrentSize].booking_hour_limited}}小时预订</li>
        </ul>
        <p>保鲜条件&nbsp;&nbsp;&nbsp;&nbsp;0－4℃保藏10小时，5℃食用为佳</p>
        <p>参考甜度&nbsp;&nbsp;&nbsp;&nbsp;不好获取</p>
      </div>
      <van-popup v-model="popup" position="bottom">
        <div class="size-list">
          <p class="price">￥{{goodsSizes[goodsCurrentSize].price}}<a href="javascript:;" class="r" @click="popup = false">&times;</a></p>
          <dl class="clearfix">
            <dt>
              <img :src="host.static + goodsSizes[goodsCurrentSize].img_url" :alt="goodsSizes[goodsCurrentSize].size">
            </dt>
            <dd>
              <p><i class="fa fa-arrows-alt"></i> {{goodsSizes[goodsCurrentSize].size}}</p>
              <p><i class="fa fa-users"></i> {{goodsSizes[goodsCurrentSize].cutlery_content}}</p>
              <p><i class="fa fa-cutlery"></i> {{goodsSizes[goodsCurrentSize].suite_amount}}</p>
              <p><i class="fa fa-clock-o"></i> 须提前{{goodsSizes[goodsCurrentSize].booking_hour_limited}}小时预订</p>
            </dd>
          </dl>
          <p class="goods-size">商品规格</p>
          <ul>
            <li v-for="(v, i) in goodsSizes" :key="i" @click="goodsCurrentSize = i">{{v.spec}}</li>
          </ul>
        </div>
      </van-popup>
      <p v-html="details" class="desc"></p>
      <div>
        <img v-for="(v, i) in imgs" :key="i" :src="v" class="img-responsive">
      </div>
      <van-goods-action>
        <van-goods-action-icon icon="chat" text="客服" />
        <van-goods-action-icon icon="cart" text="购物车" to="/cart" />
        <van-goods-action-button text="加入购物车" @click="addCart"/>
        <van-goods-action-button text="立即购买" primary/>
      </van-goods-action>
    </div>
  </div>
</template>

<script>
import { queryGoodsDetails, queryGoodsSize } from 'api/cake'
import Cheerio from 'cheerio'
export default {
  data () {
    return {
      host: {
        static: 'https://static.21cake.com/'
      },
      cakeId: 0,
      swiperWrapper: [],
      enName: '',
      cnName: '',
      price: '',
      tags: [],
      taste: [],
      details: '',
      imgs: [],
      goodsCurrentSize: 0,
      goodsSizes: [{
        price: 0,
        size: '',
        suite_amount: '',
        cutlery_content: '',
        booking_hour_limited: '',
        img_url: ''
      }],
      goodsSaleTime: {},
      popup: false
    }
  },
  methods: {
    getGoodsDetails () {
      queryGoodsDetails(this.cakeId).then(res => {
        if (res) {
          let html = res.replace(/\\"/g, '"')
          let $goodsHTML = html.substring(html.indexOf('<div class="swiper-container">'), html.indexOf('<div class="recommend-list">'))
          let $ = Cheerio.load($goodsHTML)
          let _swiper = []
          $('.swiper-wrapper').find('.swiper-slide').each(function (i, el) {
            let $img = $(this).find('img')
            _swiper.push({src: $img.attr('src'), alt: $img.attr('alt')})
          })
          this.swiperWrapper = _swiper
          this.enName = $('.pro-title').find('h3').text()
          this.cnName = $('.pro-title').find('span').text()
          let _tags = []
          $('.pro-details-label').find('a').each(function (i, el) {
            _tags.push($(this).text())
          })
          this.tags = _tags
          let _taste = []
          $('.details-taste').find('img').each(function (i, el) {
            _taste.push({src: $(this).attr('src'), alt: $(this).attr('alt')})
          })
          this.taste = _taste
          let _details = $('.details-introduction').find('div').text()
          _details = _details.replace(/\\n/g, '<br>')
          _details = _details.replace(/<br><br><br>/g, '')
          this.details = _details
          let _imgs = []
          $('.details-img').find('img').each(function (i, el) {
            _imgs.push($(this).attr('src'))
          })
          this.imgs = _imgs
        } else {
          this.$toast({message: '获取商品详情失败', type: 'fail'})
          this.$route.go(-1)
        }
      })
    },
    queryGoodsSize () {
      queryGoodsSize(`?method=Goods.goodsDetail&v=1.0&cityId=2&channel=wap&goodsId=${this.cakeId}&_=${+new Date()}`).then(res => {
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
              this.price = '￥' + this.goodsSizes[this.goodsCurrentSize].price
            } else {
              return false
            }
          } else if (res.data.type === 'multiply') {
            this.goodsSizes = Object.values(res.data.productsArr[0].productsArr)
            this.goodsSaleTime = res.data.productsArr.saleTime
          }
        }
      })
    },
    addCart () {
      let cart = {
        'en_name': this.enName,
        'cn_name': this.cnName,
        'spec': this.goodsSizes[this.goodsCurrentSize].spec,
        'price': this.goodsSizes[this.goodsCurrentSize].price,
        'cutlery_content': this.goodsSizes[this.goodsCurrentSize].cutlery_content,
        'img_url': this.swiperWrapper[0].src,
        'num': 1,
        'goods_id': this.cakeId
      }
      this.$db.find({'goods_id': this.cakeId}, (err, docs) => {
        if (docs.length && docs[0].spec === this.goodsSizes[this.goodsCurrentSize].spec) {
          let num = docs[0].num
          num++
          this.$db.update({'goods_id': this.cakeId}, {$set: {'num': num}}, {}, (err, numReplaced) => {
            if (numReplaced) {
              this.$toast({message: '加入成功', type: 'success'})
            } else {
              console.log(err)
            }
          })
        } else {
          this.$db.insert(cart, (err, ret) => {
            if (Object.values(ret).length) {
              this.$toast({message: '加入成功', type: 'success'})
            } else {
              console.log(err)
            }
          })
        }
        console.log(err)
      })
    }
  },
  created () {
    this.cakeId = this.$route.query.id
    this.getGoodsDetails()
    this.queryGoodsSize()
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/style/variable"
@import "~common/style/base"
.swipe
  position relative
  .nav
    width 100%
    height 30px
    line-height 30px
    padding 0 10px
    box-sizing border-box
    position absolute
    top 10px
    left 0
    a
      width 30px
      height 30px
      line-height 30px
      text-align center
      background-color rgba(0, 0, 0, .5)
      border-radius 30px
      color #fff
      font-size 18px
.goods
  padding 0 10px
  h3,p
    margin 5px 0
  .price
    color $priceColor
    font-size 18px
    font-weight bold
  h3
    color $darkPrimaryColor
  .tags
    span
      display inline-block
      padding 2px 6px
      margin-right 10px
      margin-bottom 10px
      border 1px solid $darkPrimaryColor
      color $darkPrimaryColor
      border-radius 6px
      font-size 12px
  .taste
    height 35px
    margin 10px 0
    li
      height 35px
      font-size 14px
      margin-right 10px
      float left
      img
        width 35px
        margin-right 8px
        vertical-align middle
  .sizes
    padding 0 10px 10px
    box-shadow 0 0 5px rgba(0, 0, 0, .5)
    .select
      line-height 30px
      margin 0 -10px 0
      padding-left 10px
      background-color $accentColor
      i
        margin 8px
    li
      width 50%
      font-size 14px
      float left
    p
      font-size 14px
  .desc
    font-size 12px
.size-list
  padding 10px
  box-sizing border-box
  .price
    color $priceColor
    a
      margin-top -8px
      font-size 28px
  dl
    dt,dd
      width 50%
      box-sizing border-box
      float left
      img
        width 100%
    dd
      margin-left 0
      padding-left 10px
      font-size 12px
  .goods-size
    font-size 12px
  ul
    li
      width 70px
      height 30px
      line-height 30px
      text-align center
      background-color #f1f1f1
      margin-right 10px
      margin-bottom 10px
      font-size 14px
      float left
.van-goods-action
  .van-button
    color #fff
</style>
