<template>
  <div class="verify">
    <mu-content-block>
      授权成功！
    </mu-content-block>
  </div>
</template>

<script>
export default {
  name: 'Verify',
  data () {
    return {
      type: null,
      confId: null
    }
  },
  mounted: function () {
    this.type = this.$route.params.type
    this.confId = this.$route.params.confId
    let info = {
      type: parseInt(this.type),
      confId: parseInt(this.confId)
    }
    localStorage.setItem('confInfo', JSON.stringify(info))
  }
}
</script>

<style scoped lang="stylus">
.verify
  height calc( 100vh - 112px )
  overflow auto
  display flex
  flex-direction column
  justify-content flex-start
  align-items center
</style>
