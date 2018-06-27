<template>
  <div class="ticket-detail">
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
      visitorInfo: {
        name: null,
        idNum: null,
        mobile: null
      },
      type: null,
      confId: null
    }
  },
  mounted: function () {
    this.initData()
    this.type = parseInt(JSON.parse(localStorage.getItem('confInfo')).type)
    this.confId = parseInt(JSON.parse(localStorage.getItem('confInfo')).confId)
    this.checkIn()
  },
  methods: {
    initData: function () {
      this.isBusy = true
      this.visitorInfo.id = parseInt(this.$route.params.id)
      this.visitorInfo.name = this.$route.params.name
      this.visitorInfo.idNum = parseInt(this.$route.params.idNum)
      this.visitorInfo.mobile = parseInt(this.$route.params.mobile)
    },
    checkIn: function () {
      this.$http.post('http://47.100.196.172/api/meeting/signin', {
        userId: this.visitorInfo.id,
        type: this.type,
        meetingId: this.confId
      }).then(response => {
        this.$toasted.show(response.data.result.message, {
          theme: 'primary',
          position: 'bottom-center',
          duration: 3000
        })
      }, response => {
      })
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
