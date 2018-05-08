<template>
  <div class="conference-item">
    <mu-card>
      <mu-card-media>
        <img :src="imgSrc" />
      </mu-card-media>
      <mu-card-title :title="confTitle" :subTitle="confStartDate + ' - ' + confEndDate"/>
      <mu-card-text>
        {{ confDescription }}
      </mu-card-text>
      <mu-card-actions class="action-area">
        <mu-raised-button primary :to="'/confRegister/' + confId" label="立即报名" v-if="confStartTime > currentTime"/>
        <mu-raised-button secondary :to="'/confDetail/' + confId" label="查看详情"/>
      </mu-card-actions>
    </mu-card>
  </div>
</template>

<script>
export default {
  name: 'ConferenceItem',
  props: ['confId', 'imgSrc', 'confTitle', 'confStartTime', 'confEndTime', 'confDescription'],
  computed: {
    currentTime: function () {
      let now = new Date().getTime()
      return now
    },
    confStartDate: function () {
      return this.dateFormat(this.confStartTime)
    },
    confEndDate: function () {
      return this.dateFormat(this.confEndTime)
    }
  },
  methods: {
    dateFormat: function (timestamp) {
      let date = new Date(timestamp)
      let year = date.getFullYear()
      let month = date.getMonth() + 1
      let day = date.getDate()
      return year + '.' + month + '.' + day
    }
  }
}
</script>

<style scoped lang="stylus">
.conference-item
  margin 25px 10px
.action-area
  display flex
  flex-direction row
  justify-content space-around
  align-items center
</style>
