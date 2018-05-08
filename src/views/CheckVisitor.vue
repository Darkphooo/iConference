<template>
  <div class="ticket-detail">
    <mu-linear-progress v-if="isBusy"/>
    <mu-content-block>
      姓名：{{visitorInfo.name}}
    </mu-content-block>
    <mu-content-block>
      身份证号：{{visitorInfo.idNum}}
    </mu-content-block>
    <mu-content-block>
      手机号：{{visitorInfo.mobile}}
    </mu-content-block>
  </div>
</template>

<script>
export default {
  name: 'CheckVisitor',
  data () {
    return {
      isBusy: false,
      visitorInfo: {
        name: null,
        idNum: null,
        mobile: null
      }
    }
  },
  mounted: function () {
    this.initData()
  },
  methods: {
    initData: function () {
      this.isBusy = true
      this.visitorInfo.name = this.$route.params.name
      this.visitorInfo.idNum = this.$route.params.idNum
      this.visitorInfo.mobile = this.$route.params.mobile
      this.isBusy = false
    }
  }
}
</script>

<style scoped lang="stylus">
.check-visitor
  height calc( 100vh - 112px )
  overflow auto
  display flex
  flex-direction column
  justify-content flex-start
  align-items center

  .ticket-box
    margin 10px 10px 100px 10px
  .qrcode-box
    margin auto
    width 200px
    height 200px
    text-align center
</style>
