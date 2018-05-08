<template>
  <div class="mine">
    <mu-list>
      <mu-list-item title="我的门票" :to="'/ticket/' + userId">
        <mu-icon slot="left" value="local_activity"/>
      </mu-list-item>
      <mu-divider/>
      <mu-list-item title="我的资料" :to="'/data/' + userId">
        <mu-icon slot="left" value="bookmark_border"/>
      </mu-list-item>
      <mu-divider/>
      <mu-list-item title="退出登录" @click="logout">
        <mu-icon slot="left" value="exit_to_app"/>
      </mu-list-item>
      <mu-divider/>
    </mu-list>
  </div>
</template>

<script>
import Map from '@/components/Map'
export default {
  name: 'Mine',
  components: {
    Map
  },
  data () {
    return {
    }
  },
  computed: {
    userId: function () {
      return JSON.parse(sessionStorage.getItem('user')).id
    }
  },
  methods: {
    logout: function () {
      sessionStorage.removeItem('user')
      this.$router.push('/conference')
    }
  }
}
</script>

<style scoped lang="stylus">
.mine
  height calc(100vh - 112px)
  overflow auto
</style>
