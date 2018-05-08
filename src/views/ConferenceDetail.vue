<template>
  <div class="conference-detail">
    <mu-linear-progress v-if="isBusy"/>
    <img :src="confInfo.img_src" style="width: 100%;"/>
    <h2 style="text-align: center;">{{confInfo.title}}</h2>
    <div class="btn-area">
      <mu-raised-button primary :to="'/confRegister/' + confInfo.id" label="立即报名" v-if="confInfo.start_time > currentTime"/>
    </div>
    <mu-sub-header>会议简介</mu-sub-header>
    <mu-content-block>
      {{confInfo.description}}
    </mu-content-block>
    <mu-sub-header>会议时间</mu-sub-header>
    <mu-content-block>
      {{confStartDate + ' - ' + confEndDate}}
    </mu-content-block>
    <mu-sub-header>会议地点</mu-sub-header>
    <mu-content-block>
      {{confInfo.location}}
    </mu-content-block>
    <Map :coordinate="confInfo.coordinate" class="map"></Map>
    <mu-sub-header v-if="confInfo.start_time > currentTime">门票信息</mu-sub-header>
    <mu-content-block v-if="confInfo.start_time > currentTime">
      <mu-paper class="ticket-box" :zDepth="1" v-for="item in ticket" :key="item.id">
        <mu-content-block>{{item.label}}</mu-content-block>
        <mu-content-block>售价：{{item.value}}元</mu-content-block>
        <mu-content-block>剩余：{{item.stock}}张</mu-content-block>
      </mu-paper>
    </mu-content-block>
    <div class="btn-area">
      <mu-raised-button primary :to="'/confRegister/' + confInfo.id" label="立即报名" v-if="confInfo.start_time > currentTime"/>
    </div>
  </div>
</template>

<script>
import Map from '@/components/Map.vue'
export default {
  name: 'ConferenceDetail',
  components: {
    Map
  },
  data () {
    return {
      isBusy: false,
      confInfo: {},
      ticket: []
    }
  },
  mounted: function () {
    this.initConferenceDetail()
  },
  computed: {
    currentTime: function () {
      let now = new Date().getTime()
      return now
    },
    confStartDate: function () {
      return this.dateFormat(this.confInfo.start_time)
    },
    confEndDate: function () {
      return this.dateFormat(this.confInfo.end_time)
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
          this.ticket = response.data.result.ticket
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
.conference-detail
  height calc( 100vh - 112px )
  overflow auto

  .ticket-box
    margin 10px
  .btn-area
    text-align center
    margin auto
  .map
    margin 0 auto 20px auto
</style>
