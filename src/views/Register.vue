<template>
  <div class="register">
    <mu-sub-header inset>注册</mu-sub-header>
    <mu-text-field v-model="username" label="用户名" labelFloat/>
    <mu-text-field v-model="password" type="password" label="密码" labelFloat/>
    <mu-text-field v-model="name" label="姓名" labelFloat/>
    <mu-text-field v-model="idNum" type="number" label="身份证号" labelFloat/>
    <mu-text-field v-model="mobile" type="number" label="手机" labelFloat/>
    <mu-raised-button primary class="register-btn" @click="register">注 册</mu-raised-button>
  </div>
</template>

<script>
import md5 from 'js-md5'
export default {
  name: 'Register',
  data () {
    return {
      username: null,
      password: null,
      name: null,
      idNum: null,
      mobile: null
    }
  },
  methods: {
    register: function () {
      this.$http.post('http://47.100.196.172/api/user/register', {
        username: this.username,
        password: md5(this.password),
        name: this.name,
        id_num: this.idNum,
        mobile: this.mobile
      }).then(response => {
        if (response.data.status === 1) {
          this.$toasted.show('注册成功', {
            theme: 'primary',
            position: 'bottom-center',
            duration: 3000
          })
          this.$router.push('/login')
        } else {
          this.$toasted.show(response.data.result.message, {
            theme: 'primary',
            position: 'bottom-center',
            duration: 3000
          })
        }
      }, response => {
      })
    }
  }
}
</script>

<style scoped lang="stylus">
.register
  height calc( 100vh - 112px )
  overflow auto
  display flex
  flex-direction column
  justify-content center
  align-items center

  .register-btn
    width 250px
    margin 10px 0
</style>
