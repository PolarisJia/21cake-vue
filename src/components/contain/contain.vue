<template>
  <div>
    <main>
      <slot></slot>
    </main>
    <footer>
      <footGuide></footGuide>
    </footer>
  </div>
</template>

<script>
import footGuide from 'components/footer/footer'
export default {
  data () {
    return {}
  },
  components: {
    footGuide
  }
}
</script>

<style lang="stylus" scoped>
main
  padding-top 50px
footer
  height 50px
</style>
