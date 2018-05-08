<template>
  <div class="sign-in">
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
    <mu-sub-header>
      签到记录
    </mu-sub-header>
    <mu-content-block v-for="(item, index) in record" :key="index">
      {{timeFormat(item.time)}}
    </mu-content-block>
  </div>
</template>

<script>
export default {
  name: 'SignIn',
  data () {
    return {
      isBusy: false,
      visitorInfo: {},
      record: []
    }
  },
  mounted: function () {
    this.ticketSignIn()
  },
  methods: {
    ticketSignIn: function () {
      this.isBusy = true
      this.$http.post('http://47.100.196.172/api/ticket/signin', {
        ticketId: this.$route.params.ticketId
      }).then(response => {
        if (response.data.status === 1) {
          this.visitorInfo = response.data.result.visitorInfo
          this.record = JSON.parse(response.data.result.record)
          this.isBusy = false
        } else {
          this.$toasted.show(response.data.result.message, {
            theme: 'primary',
            position: 'bottom-center',
            duration: 3000
          })
          this.isBusy = false
        }
      }, response => {
        this.isBusy = true
      })
    },
    timeFormat: function (timestamp) {
      let date = new Date(timestamp)
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      let hour = date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
      let minute = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()
      let second = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
      return year + '.' + month + '.' + day + ' ' + hour + ':' + minute + ':' + second
    }
  }
}
</script>

<style scoped lang="stylus">
.sign-in
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
