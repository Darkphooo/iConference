<template>
  <div class="ticket">
    <mu-linear-progress v-if="isBusy"/>
    <mu-content-block>
      <mu-paper class="ticket-box" :zDepth="1" v-for="item in ticket" :key="item.id" @click.native="goToDetail(item.id)">
        <mu-sub-header>{{item.confInfo.title}}</mu-sub-header>
        <mu-content-block>{{item.confInfo.location}}</mu-content-block>
        <mu-content-block>{{timeFormat(item.confInfo.startTime)}}</mu-content-block>
        <mu-content-block>{{item.ticketInfo.label}}</mu-content-block>
      </mu-paper>
    </mu-content-block>
  </div>
</template>

<script>
export default {
  name: 'Ticket',
  data () {
    return {
      isBusy: false,
      ticket: []
    }
  },
  mounted: function () {
    this.initTicketList()
  },
  methods: {
    initTicketList: function () {
      this.isBusy = true
      this.$http.get('http://47.100.196.172/api/user/ticket/list', {
        params: {
          userId: this.$route.params.userId
        }
      }).then(response => {
        if (response.data.status === 1) {
          let list = response.data.result.ticketInfo
          this.ticket = list
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
.ticket
  height calc( 100vh - 112px )
  overflow auto
  display flex
  flex-direction column
  justify-content flex-start
  align-items center

  .ticket-box
    margin 10px
</style>
