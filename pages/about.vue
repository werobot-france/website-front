<template>
  <div>
    <div class="cover-back">&nbsp;</div>
    <div class="cover">
      <div class="cover-container container mx-auto">
        <div class="cover-title">
          <h1>{{ $t('about') }}</h1>
        </div>
      </div>
    </div>
    <div
      class="container mx-auto content text">
      <div v-html="content"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Legals',
  head () {
    return {
      title: this.$t('about')
    }
  },
  data () {
    return {
      content: require('../assets/content/' + this.$i18n.locale + '/about.md')
    }
  }
}
</script>


