<template>
  <div id="app">
    <mu-appbar title="iConference" :titleClass="titleClassObject">
      <mu-icon-button icon="keyboard_arrow_left" slot="left" v-if="showBack" @click="moveBack"/>
    </mu-appbar>
    <router-view/>
    <mu-paper class="footbar">
      <mu-bottom-nav :value="bottomNav" shift @change="changePage">
        <mu-bottom-nav-item value="/conference" title="会议" icon="people"/>
        <mu-bottom-nav-item value="/mine" title="我的" icon="face"/>
      </mu-bottom-nav>
    </mu-paper>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
    return {
    }
  },
  computed: {
    bottomNav: {
      get: function () {
        return this.$route.path
      },
      set: function () {
      }
    },
    titleClassObject: function () {
      return {
        'app-title': true,
        'left-visible': this.showBack
      }
    },
    showBack: function () {
      if (this.$route.path !== '/conference' && this.$route.path !== '/mine' && this.$route.path.indexOf('/signIn') === -1) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    changePage: function (val) {
      this.bottomNav = val
      this.$router.push(val)
    },
    moveBack: function () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="stylus">
#app
  font-family "Microsoft Yahei"
  -webkit-font-smoothing antialiased
  -moz-osx-font-smoothing grayscale
  color #2c3e50
  height 100vh
  display flex
  flex-direction column
  justify-content space-between
  align-items space-between
.app-title
  text-align center
.left-visible
  margin-left -48px
</style>
