<template>
  <div class="ticket-detail">
    <mu-linear-progress v-if="isBusy"/>
    <mu-content-block>
      <mu-paper class="ticket-box" :zDepth="1">
        <mu-sub-header>{{confInfo.title}}</mu-sub-header>
        <mu-content-block>{{confInfo.location}}</mu-content-block>
        <mu-content-block>{{timeFormat(confInfo.start_time)}}</mu-content-block>
        <mu-content-block>{{ticketInfo.label}}</mu-content-block>
      </mu-paper>
      <mu-content-block class="tip">请将二维码出示给工作人员进行签到</mu-content-block>
      <mu-paper class="qrcode-box" :zDepth="2">
        <qrcode :value="qrcode" :options="{ size: 200 }"></qrcode>
      </mu-paper>
    </mu-content-block>
  </div>
</template>

<script>
export default {
  name: 'TicketDetail',
  data () {
    return {
      isBusy: false,
      confInfo: {},
      ticketInfo: {}
    }
  },
  mounted: function () {
    this.initTicketDetail()
  },
  computed: {
    qrcode: function () {
      return 'http://47.100.196.172/signIn/' + this.$route.params.ticketId
    }
  },
  methods: {
    initTicketDetail: function () {
      this.isBusy = true
      this.$http.get('http://47.100.196.172/api/ticket/detail', {
        params: {
          ticketId: this.$route.params.ticketId
        }
      }).then(response => {
        if (response.data.status === 1) {
          let obj = response.data.result.confInfo[0]
          this.confInfo = obj
          this.ticketInfo = response.data.result.ticketInfo
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
    },
    goToDetail: function (id) {
      this.$router.push('/ticketDetail/' + id)
    }
  }
}
</script>

<style scoped lang="stylus">
.ticket-detail
  height calc( 100vh - 112px )
  overflow auto
  display flex
  flex-direction column
  justify-content flex-start
  align-items center

  .ticket-box
    margin 10px 10px 40px 10px
  .tip
    font-size 16px
    text-align center
    margin-bottom 40px
  .qrcode-box
    margin auto
    width 200px
    height 200px
    text-align center
</style>
