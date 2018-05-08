<template>
  <div class="conference">
    <mu-linear-progress v-if="isBusy"/>
    <ConferenceItem
      v-for="item in conferenceList"
      :key="item.id"
      :confId="item.id"
      :imgSrc="item.img_src"
      :confTitle="item.title"
      :confStartTime="item.start_time"
      :confEndTime="item.end_time"
      :confDescription="item.description"
    >
    </ConferenceItem>
  </div>
</template>

<script>
import ConferenceItem from '@/components/ConferenceItem'
export default {
  name: 'Conference',
  components: {
    ConferenceItem
  },
  data () {
    return {
      isBusy: false,
      conferenceList: []
    }
  },
  mounted: function () {
    this.initConferenceList()
  },
  methods: {
    initConferenceList: function () {
      this.isBusy = true
      this.$http.get('http://47.100.196.172/api/conference/list').then(response => {
        if (response.data.status === 1) {
          let list = response.data.result
          this.conferenceList = list
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
    }
  }
}
</script>

<style scoped lang="stylus">
.conference
  height calc(100vh - 112px)
  overflow auto
</style>
