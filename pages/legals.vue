<template>
  <div>
    <div class="cover-back">&nbsp;</div>
    <div class="cover">
      <div class="cover-container container mx-auto">
        <div class="cover-title">
          <h1>{{ $t('legals') }}</h1>
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
      title: this.$t('legals')
    }
  },
  data () {
    return {
      content: require('../assets/content/' + this.$i18n.locale + '/legals.md')
    }
  }
}
</script>


