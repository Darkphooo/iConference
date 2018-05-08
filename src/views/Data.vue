<template>
  <div class="data">
    <mu-linear-progress v-if="isBusy"/>
    <mu-content-block v-if="!haveData">
      <mu-text-field class="data-input" label="姓名" v-model="data.name" labelFloat/>
      <mu-text-field class="data-input" label="身份证号" v-model="data.idNum" labelFloat/>
      <mu-text-field class="data-input" label="手机号" v-model="data.mobile" labelFloat/>
      <mu-raised-button @click="updateData" fullWidth>提交资料</mu-raised-button>
    </mu-content-block>
    <mu-content-block v-if="haveData">
      <mu-content-block class="tip">请将二维码出示给工作人员进行签到</mu-content-block>
      <mu-paper class="qrcode-box" :zDepth="2">
        <qrcode :value="qrcode" :options="{ size: 200 }"></qrcode>
      </mu-paper>
      <mu-raised-button @click="haveData = false" fullWidth>编辑资料</mu-raised-button>
    </mu-content-block>
  </div>
</template>

<script>
export default {
  name: 'Data',
  data () {
    return {
      isBusy: false,
      haveData: true,
      data: {
        name: null,
        idNum: null,
        mobile: null
      }
    }
  },
  mounted: function () {
    this.initData()
  },
  computed: {
    qrcode: function () {
      return 'http://47.100.196.172/checkVisitor/' + encodeURI(this.data.name) + '/' + this.data.idNum + '/' + this.data.mobile
    }
  },
  methods: {
    initData: function () {
      this.isBusy = true
      this.$http.get('http://47.100.196.172/api/user/detail', {
        params: {
          userId: this.$route.params.userId
        }
      }).then(response => {
        if (response.data.status === 1) {
          let obj = {}
          obj.name = response.data.result[0].name
          obj.idNum = response.data.result[0].id_num
          obj.mobile = response.data.result[0].mobile
          this.data = obj
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
    updateData: function () {
      this.$http.post('http://47.100.196.172/api/user/update', {
        userId: this.$route.params.userId,
        name: this.data.name,
        id_num: this.data.idNum,
        mobile: this.data.mobile
      }).then(response => {
        if (response.data.status === 1) {
          this.$toasted.show('修改成功', {
            theme: 'primary',
            position: 'bottom-center',
            duration: 3000
          })
          this.haveData = true
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
    }
  }
}
</script>

<style scoped lang="stylus">
.data
  height calc( 100vh - 112px )
  overflow auto
  display flex
  flex-direction column
  justify-content flex-start
  align-items center

  .tip
    font-size 16px
    text-align center
    margin 40px 0
  .qrcode-box
    margin 0 auto 20px auto
    width 200px
    height 200px
    text-align center
  .data-input
    width calc( 100% - 40px )
    margin 0 20px
</style>
