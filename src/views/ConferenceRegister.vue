<template>
  <div class="conference-register">
    <mu-linear-progress v-if="isBusy"/>
    <img :src="confInfo.img_src" style="width: 100%;"/>
    <h2>{{confInfo.title}}</h2>
    <mu-content-block>会议报名</mu-content-block>
    <mu-sub-header>请选择门票</mu-sub-header>
    <mu-content-block>
      <mu-paper class="ticket-box" :zDepth="1" v-for="(item, index) in ticket" :key="item.id" @click.native="toggleCheck(index, item.checked)" :class="{'ticket-active': item.checked, 'ticket-diabled': item.stock <= 0}">
        <mu-content-block>{{item.label}}</mu-content-block>
        <mu-content-block>售价：{{item.value}}元</mu-content-block>
        <mu-content-block>剩余：{{item.stock}}张</mu-content-block>
      </mu-paper>
    </mu-content-block>
    <mu-sub-header>请选择支付方式</mu-sub-header>
    <mu-content-block>
      <mu-paper class="payment-box" :zDepth="1" @click.native="payMethod = 'alipay'" :class="{'payment-active': payMethod === 'alipay'}">
        <mu-content-block>支付宝</mu-content-block>
      </mu-paper>
      <mu-paper class="payment-box" :zDepth="1" @click.native="payMethod = 'wechatpay'" :class="{'payment-active': payMethod === 'wechatpay'}">
        <mu-content-block>微信支付</mu-content-block>
      </mu-paper>
    </mu-content-block>
    <mu-raised-button primary class="register-btn" @click="pay" :disabled="disabled">立即支付</mu-raised-button>
  </div>
</template>

<script>
export default {
  name: 'ConferenceRegister',
  data () {
    return {
      isBusy: false,
      name: null,
      idNum: null,
      mobile: null,
      confInfo: {},
      selectedTicketIndex: null,
      payMethod: null,
      ticket: []
    }
  },
  mounted: function () {
    this.initConferenceDetail()
  },
  computed: {
    disabled: function () {
      let list = this.ticket
      if (this.payMethod) {
        for (let i in list) {
          if (!list[i].checked) {
            continue
          } else {
            return false
          }
        }
        return true
      } else {
        return true
      }
    }
  },
  methods: {
    initConferenceDetail: function () {
      this.isBusy = true
      this.$http.get('http://47.100.196.172/api/conference/detail', {
        params: {
          confId: this.$route.params.confId
        }
      }).then(response => {
        if (response.data.status === 1) {
          let obj = response.data.result.confInfo[0]
          this.confInfo = obj
          let list = response.data.result.ticket
          for (let i in list) {
            list[i].checked = false
          }
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
    pay: function () {
      this.isBusy = true
      this.$http.post('http://47.100.196.172/api/conference/register', {
        confId: this.confInfo.id,
        ticketId: this.checkedTicketId,
        userId: JSON.parse(localStorage.getItem('user')).id
      }).then(response => {
        if (response.data.status === 1) {
          this.$toasted.show('报名成功', {
            theme: 'primary',
            position: 'bottom-center',
            duration: 3000
          })
          this.$router.push('/paymentResult/' + response.data.result.id)
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
        this.isBusy = false
      })
    },
    toggleCheck: function (index, checked) {
      this.selectedTicketIndex = index
      let list = this.ticket
      if (list[index].stock > 0) {
        if (checked) {
          list[index].checked = false
        } else {
          for (let i in list) {
            list[i].checked = false
          }
          list[index].checked = true
        }
        this.checkedTicketId = list[index].id
        this.ticket = list
      }
    }
  }
}
</script>

<style scoped lang="stylus">
.conference-register
  height calc( 100vh - 112px )
  overflow auto
  display flex
  flex-direction column
  justify-content flex-start
  align-items center

  .register-btn
    width 250px
    margin 10px 0 20px 0
  .ticket-box
    position relative
    height 113px
    margin 11px
  .ticket-active
    border 1px solid #2196f3
  .ticket-active:after
    content "✔"
    font-size 48px
    color #2196f3
    line-height 72px
    position absolute
    top calc( 50% - 36px )
    right 20px
  .ticket-diabled
    color #9b9b9b
  .payment-box
    position relative
    height 53px
    margin 11px
    display flex
    justify-content flex-start
    align-items center
  .payment-active
    border 1px solid #2196f3
  .payment-active:after
    content "✔"
    font-size 24px
    color #2196f3
    line-height 36px
    position absolute
    top calc( 50% - 18px )
    right 20px
</style>
