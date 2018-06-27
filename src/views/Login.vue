<template>
  <div class="login">
    <mu-paper class="logo" circle :zDepth="1" />
    <mu-text-field v-model="username" label="用户名" labelFloat/>
    <mu-text-field v-model="password" type="password" label="密码" labelFloat/>
    <mu-raised-button primary class="login-btn" @click="login">登 录</mu-raised-button>
    <mu-raised-button secondary class="login-btn" @click="register">注 册</mu-raised-button>
  </div>
</template>

<script>
import md5 from 'js-md5'
export default {
  name: 'Login',
  data () {
    return {
      username: null,
      password: null
    }
  },
  methods: {
    login: function () {
      var expire = new Date().getTime() + 604800000
      var moveTo = sessionStorage.getItem('moveTo')
      this.$http.post('http://47.100.196.172/api/user/login', {
        username: this.username,
        password: md5(this.password)
      }).then(response => {
        if (response.data.status === 1) {
          localStorage.setItem('user', JSON.stringify({'id': response.data.result.id, 'role': response.data.result.role, 'expire': expire}))
          this.$toasted.show('欢迎回来，' + response.data.result.username, {
            theme: 'primary',
            position: 'bottom-center',
            duration: 3000
          })
          this.$router.push(moveTo)
        } else {
          this.$toasted.show(response.data.result.message, {
            theme: 'primary',
            position: 'bottom-center',
            duration: 3000
          })
        }
      }, response => {
      })
    },
    register: function () {
      this.$router.push('/register')
    }
  }
}
</script>

<style scoped lang="stylus">
.login
  height calc( 100vh - 112px )
  overflow auto
  display flex
  flex-direction column
  justify-content center
  align-items center

  .logo
    width 125px
    height 125px
    background-image url('../assets/logo.jpg')
    background-size 125px

  .login-btn
    width 250px
    margin 10px 0
</style>
