<template>
  <div>myCake</div>
</template>

<script>
import { queryGoodsDetails } from 'api/cake-vue-resource'
import Cheerio from 'cheerio'
export default {
  data () {
    return {
      cakeId: 0
    }
  },
  methods: {
    getGoodsDetails () {
      queryGoodsDetails(this.cakeId).then(res => {
        if (res) {
          let html = res.replace(/\\"/g, '"')
          let $goodsHTML = html.substring(html.indexOf('<div class="swiper-container">'), html.indexOf('<div class="recommend-list">'))
          let $ = Cheerio.load($goodsHTML)
          $('.swiper-wrapper').find('.swiper-slide').each(function (i, el) {
            console.log($(this).find('img').attr('src'))
          })
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
    // console.log(Cheerio)
  }
}
</script>

<style lang="stylus" scoped>

</style>
