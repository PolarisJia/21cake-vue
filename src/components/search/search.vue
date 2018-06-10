<template>
  <div class="search-container" v-if="show">
    <div class="search-header">
      <div class="box">
        <div class="input">
          <van-icon name="search" class="icon"/><input type="search" autocomplete="off" placeholder="请输入名称"><van-icon name="close" class="icon"/>
        </div>
      </div>
      <a href="javascript" class="cancel">取消</a>
    </div>
    <div class="search-content">
      <ul>
        <li v-for="(v, i) in searchResult" :key="i">{{v}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    show: {
      type: Boolean,
      default: false
    },
    searchResult: {
      type: Array,
      default () {
        return ['asdsafd', 'sdf', 'sdf', 'cvdf']
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import "~common/style/variable"
@import "~common/style/reset"
.search-container
  width 100%
  height 100%
  .search-header
    width 100%
    height 50px
    background-color $primaryColor
    display flex
    .box
      height 30px
      flex-grow 1
      margin 10px 0 0 5px
      background-color #fff
      border 1px solid $dividerColor
      border-radius 15px
      box-sizing border-box
      .input
        height 30px
        padding 0 10px
        display flex
        .icon
          line-height 16px
          margin-top 6px
          color $secondaryText
        input[type=search]
          flex-grow 1
          height 28px
          line-height 28px
          font-size 14px
          border 0
          padding 0
          margin 0 5px
    .cancel
      width 50px
      height 30px
      line-height 30px
      margin-top 10px
      text-align center
      color #fff
  .search-content
    height 100%
    ul
      padding 0 10px
      li
        line-height 30px
        border-bottom 1px solid $dividerColor
        &:last-child
          border-bottom 0
</style>
