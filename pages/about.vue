<template>
  <div>
    <div class="cover">
      <div class="cover-back"></div>
      <div class="cover-container">
        <div class="container mx-auto">
          <div class="cover-title">
            <h1>{{ $t('about') }}</h1>
          </div>
        </div>
      </div>
    </div>
    <div class="container mx-auto content text">
      <div>
        <div
          v-lazy-container="{ selector: 'img' }"
          v-html="content">
        </div>
        <no-ssr>
          <component :is="mapComponent"></component>
        </no-ssr>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
  head () {
    return {
      title: this.$t('about'),
      meta: [
        {name: 'description', content: this.$t('description')},
        {property: 'og:title', content: this.$t('about')},
        {property: 'og:description', content: this.$t('description')},
        {property: 'og:image', content: 'https://s.werobot.fr/logo.png'},
      ]
    }
  },
  components: {
    'map-dynamic': () => import('~/components/Map.vue'),
  },
  data () {
    return {
      map: null,
      content: '',
      mapComponent: ''
    }
  },
  mounted () {
    if (this.$isServer) { return }
    this.mapComponent = 'map-dynamic'
    setTimeout(() => {
      if (window.location.hash.indexOf('place') !== -1) {
        document.getElementById('place-anchor').scrollIntoView()
      }
    }, 500)
  },
  methods: {
    initializeMap () {}
  },
  async asyncData(context) {
    return {
      content: require('../assets/content/' + context.app.i18n.locale + '/about.md')
    }
  }
}
</script>

<style src="~/node_modules/ol/ol.css"></style>
