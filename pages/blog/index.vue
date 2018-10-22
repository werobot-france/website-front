<template>
  <div>
    <div class="cover-back">&nbsp;</div>
    <div class="cover">
      <div class="cover-container container mx-auto">
        <div class="cover-title">
          <h1>{{ $t('blog.title') }}</h1>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="container mx-auto">
        <h2 class="index-icon-title pt-2">
          <i class="fa fas fa-newspaper"></i>
          {{ $t('articles.all') }}
        </h2>
        <articles :locale="$i18n.locale" />
      </div>
    </div>
  </div>
</template>

<script>
import Articles from '~/components/Articles.vue'
export default {
  head () {
    return {
      title: this.$t('blog.title')
    }
  },
  components: {
    'articles': Articles
  },
  async fetch ({ isServer, store, app }) {
    if (process.server) {
      await store.dispatch('fetchArticles', {app: app, limit: 20})
    } else {
      store.dispatch('fetchArticles', {app: app, limit: 20})
    }
  }
}
</script>

<style>
</style>
