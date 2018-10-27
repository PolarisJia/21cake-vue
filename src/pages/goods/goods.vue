<template>
  <div>
    <van-swipe :autoplay="5000">
      <van-swipe-item v-for="(v, i) in swiperWrapper" :key="i">
        <img v-lazy="v.src" :alt="v.alt" class="img-responsive">
      </van-swipe-item>
    </van-swipe>
    <div class="goods">
      <h3>{{enName}}</h3>
      <p>{{cnName}}</p>
      <p>{{price}}</p>
      <div class="tags">
        <span v-for="(v, i) in tags" :key="i">{{v}}</span>
      </div>
      <ul class="taste">
        <li v-for="(v, i) in taste" :key="i">
          <img :src="v.src" :alt="v.alt" class="img-responsive"><span>{{v.alt}}</span>
        </li>
      </ul>
      <p v-html="details" class="desc"></p>
      <div>
        <img v-for="(v, i) in imgs" :key="i" :src="v" class="img-responsive">
      </div>
    </div>
  </div>
</template>

<script>
import { queryGoodsDetails } from 'api/cake-vue-resource'
import Cheerio from 'cheerio'
export default {
  data () {
    return {
      cakeId: 0,
      swiperWrapper: [],
      enName: '',
      cnName: '',
      price: '',
      tags: [],
      taste: [],
      details: '',
      imgs: []
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
          // this.price = $('.price-label').find('span').text()
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
    }
  },
  created () {
    this.cakeId = this.$route.query.id
    this.getGoodsDetails()
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/style/variable"
@import "~common/style/base"
.goods
  padding 0 10px
  h3,p
    margin 5px 0
  h3
    color $darkPrimaryColor
  .tags
    span
      display inline-block
      padding 2px 6px
      margin-right 10px
      border 1px solid $darkPrimaryColor
      color $darkPrimaryColor
      border-radius 6px
      font-size 12px
  .taste
    height 35px
    margin-top 10px
    li
      width 100px
      height 35px
      float left
      img
        width 35px
        margin-right 8px
        vertical-align middle
  .desc
    font-size 12px
</style>
