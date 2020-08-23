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
        <div v-html="content"></div>
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
  data () {
    return {
      content: require('../assets/content/' + this.$i18n.locale + '/about.md')
    }
  },
  mounted () {
    setTimeout(() => {
      this.content = require('../assets/content/' + this.$i18n.locale + '/about.md')
    }, 500)
  }
}
</script>
