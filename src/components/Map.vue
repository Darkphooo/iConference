<template>
  <baidu-map class="map" :center="center" :zoom="zoom" @ready="handler" :mapStyle="{styleJson: styleJson}">
  </baidu-map>
</template>
<script>
export default {
  name: 'Map',
  props: ['coordinate'],
  data () {
    return {
      styleJson: [{
        'featureType': 'all',
        'elementType': 'geometry',
        'stylers': {
          'hue': '#007fff',
          'saturation': 89
        }
      }, {
        'featureType': 'water',
        'elementType': 'all',
        'stylers': {
          'color': '#ffffff'
        }
      }],
      center: {
        lng: 0,
        lat: 0
      },
      zoom: 3
    }
  },
  computed: {
    lng: function () {
      return parseFloat(this.coordinate.split(',')[0]).toFixed(3)
    },
    lat: function () {
      return parseFloat(this.coordinate.split(',')[1]).toFixed(3)
    }
  },
  methods: {
    handler ({BMap, map}) {
      setTimeout(() => {
        this.center.lng = this.lng
        this.center.lat = this.lat
        this.zoom = 17
      }, 500)
    }
  }
}
</script>
<style lang="stylus" scoped>
.map
  width calc( 100vw - 20px)
  height 300px
</style>
