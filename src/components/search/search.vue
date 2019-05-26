<template>
  <div class="search-container">
    <div class="search-header">
      <a href="javascript:;" class="location" v-if="location" @click="openCity = !openCity"><van-icon name="location" /><span>{{currentCity}}</span></a>
      <div class="box" :class="{'ml': !location}">
        <form action="#" class="input">
          <van-icon name="search" class="icon"/>
          <input type="search" autocomplete="off" placeholder="请输入名称" autofocus v-model.trim="searchVal">
          <van-icon name="close" class="icon" @click="searchVal = ''"/>
        </form>
        <a href="javascript:;" class="cancel" @click="searchCancel">取消</a>
        <div class="input-false" v-if="!searchIng" @click="search($event)">
          <van-icon name="search" class="icon"/>黑森林
        </div>
      </div>
    </div>
    <div class="search-content" :class="{'open': searchIng}" :style="{'height': clientHeight + 'px'}" @touchmove="noScroll($event)">
      <ul>
        <li v-for="(v, i) in searchResult" :key="i">{{v}}</li>
      </ul>
    </div>
    <transition name="open">
      <div class="select-city" v-if="openCity" :style="{'height': clientHeight + 'px'}" @touchmove.prevent="() => false">
        <p><a href="javascript:;" class="close l" @click="openCity = !openCity">&times;</a>选择城市</p>
        <div class="city-list">
          <p>定位/最近访问</p>
          <div>
            <a href="javascript:;" class="current-city" @click="currentCity = locationCity,openCity = !openCity">
              <van-icon name="location"/><span>{{locationCity}}</span><span class="no-open">暂未开通</span>
            </a>
            <a href="javascript:;">{{historyCity}}</a>
          </div>
          <p>热门城市</p>
          <div>
            <a href="javascript:;" v-for="(h, i) in hotCity" :key="i" @click="currentCity = h,openCity = !openCity">{{h}}</a>
          </div>
          <p>城市列表</p>
        </div>
        <ul>
          <li v-for="(c, i) in cityList" :key="i" @click="currentCity = c,openCity = !openCity">{{c}}</li>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data () {
    return {
      clientHeight: 0,
      searchVal: '',
      searchIng: false,
      openCity: false,
      currentCity: '上海',
      locationCity: '定位中',
      historyCity: '',
      hotCity: ['北京', '杭州', '深圳'],
      cityList: ['上海', '北京', '天津', '杭州', '无锡', '苏州', '广州', '深圳']
    }
  },
  props: {
    location: {
      type: Boolean,
      default: false
    },
    searchResult: {
      type: Array,
      default () {}
    }
  },
  methods: {
    search (e) {
      this.searchIng = !this.searchIng
      document.body.style.overflow = 'hidden'
      document.body.style.position = 'relative'
      document.querySelector('.search-header').addEventListener('touchmove', this.noScroll)
    },
    noScroll (e) {
      e.preventDefault()
    },
    searchCancel () {
      this.searchIng = !this.searchIng
      document.body.style.overflow = 'visible'
      document.body.style.position = 'static'
      document.querySelector('.search-header').removeEventListener('touchmove', this.noScroll)
    }
  },
  created () {
    this.clientHeight = document.documentElement.clientHeight
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/style/variable"
@import "~common/style/reset"
.search-container
  width 100%
  height 50px
  background-color #fff
  position fixed
  top 0
  left 0
  z-index 999
  .search-header
    width 100%
    height 50px
    background-color $primaryColor
    display flex
    .location
      width 60px
      height 30px
      line-height 33px
      font-size 14px
      margin-top 10px
      text-align center
      color #fff
      i
       top 1px
       right 3px
      span
        display inline-block
        width auto
        max-width 40px
        line-height 14px
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
    .box
      height 30px
      flex-grow 1
      margin 10px 10px 0 0
      border-radius 15px
      box-sizing border-box
      display flex
      position relative
      .icon
        line-height 16px
        margin-top 5px
        top 2px
        color $secondaryText
      .input
        height 30px
        padding 0 10px
        border-radius 15px
        flex-grow 1
        display flex
        background-color #fff
        i
          font-size 14px
        input[type=search]
          flex-grow 1
          height 30px
          line-height 32px
          font-size 14px
          border 0
          padding 0
          margin 0 5px
      a
        width 45px
        height 30px
        line-height 30px
        text-align center
        color #fff
      .input-false
        width 100%
        height 30px
        border-radius 15px
        background-color $darkPrimaryColor
        color $dividerColor
        font-size 14px
        padding-left 15px
        box-sizing border-box
        position absolute
        top 0
        left 0
        i
          right 5px
          color $dividerColor
    .ml
      margin-left 10px
  .search-content
    width 100%
    background-color #fff
    display none
    position absolute
    top 50px
    left 0
    ul
      padding 0 10px
      li
        line-height 30px
        border-bottom 1px solid $dividerColor
        &:last-child
          border-bottom 0
  .open
    display block
  .select-city
    width 100%
    background #fff
    position absolute
    top 0
    left 0
    >p
      line-height 40px
      background-color #fff
      text-align center
      margin 0
      border-bottom 2px solid $primaryColor
      position relative
      .close
        position absolute
        top 0
        left 10px
        color $primaryColor
        font-size 26px
    .city-list
      width 100%
      padding 4% 4% 10px
      box-sizing border-box
      background-color #f4f4f4
      font-size 12px
      p
        color $secondaryText
        margin 8px 0
        &:first-child
          margin-top 0
        &:last-child
          margin-bottom 0
      div
        &:after
          display block
          content: ' '
          clear both
        a
          width 32.3%
          line-height 25px
          text-align center
          background-color #fff
          float left
          margin 0 1% 1% 0
        .current-city
          position relative
          i
            color $primaryColor
            top 1px
            right 3px
          .no-open
            position absolute
            top -12px
            right -25px
            padding 0 4px
            color #fff
            font-size 12px
            line-height 18px
            background-color $primaryColor
            border-radius 6px
    ul
      width 100%
      padding 0 4%
      box-sizing border-box
      height auto
      overflow auto
      li
        width 100%
        line-height 30px
        background-color #fff
        font-size 12px
        border-bottom 1px solid $dividerColor
  .open-enter-active,.open-leave-active
    transition top .3s
  .open-enter,.open-leave-to
    top 3000px
</style>
