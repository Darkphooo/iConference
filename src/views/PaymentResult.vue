<template>
  <div class="payment">
    <mu-linear-progress v-if="isBusy"/>
    <mu-content-block>
      <mu-paper class="ticket-box" :zDepth="1">
        <mu-content-block>您已成功购买</mu-content-block>
        <mu-content-block>{{confInfo.title}}</mu-content-block>
        <mu-content-block>{{ticketInfo.label}}</mu-content-block>
        <mu-content-block>如有疑问，请联系客服支持</mu-content-block>
      </mu-paper>
    </mu-content-block>
    <mu-raised-button primary class="register-btn" @click="goToDetail">查看门票</mu-raised-button>
  </div>
</template>

<script>
export default {
  name: 'Payment',
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
  methods: {
    initTicketDetail: function () {
      this.isBusy = true
      this.$http.get('http://47.100.196.172/api/ticket/detail', {
        params: {
          ticketId: this.$route.params.ticketId
        }
      }).then(response => {
        if (response.data.status === 1) {
          this.confInfo = response.data.result.confInfo[0]
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
    goToDetail: function () {
      this.$router.push('/ticketDetail/' + this.$route.params.ticketId)
    }
  }
}
</script>

<style scoped lang="stylus">
.payment
  height calc( 100vh - 112px )
  overflow auto
  display flex
  flex-direction column
  justify-content flex-start
  align-items center
</style>
