<template>
  <div>
    <div
      :style="'background-image: url(' + $store.state.article.image + '); background-size: cover;'"
      class="cover-back"
    >&nbsp;</div>
    <div class="cover">
      <div class="cover-container container mx-auto">
        <div class="cover-title">
          <h1>{{ $store.state.article.title }}</h1>
        </div>
      </div>
    </div>
    <div
      class="container mx-auto content content-container text">
      <div class="page-details">
        <div
          class="page-details-item"
          style="margin-bottom: 3em">
          <i class="fa fas fa-clock"></i>
          {{ $store.state.article.created_at }}
        </div>
      </div>
      <div
        class="blog-article"
        v-html="$store.state.article.content"></div>
    </div>
  </div>
</template>

<script>
export default {
  head () {
    return {
      title: this.$store.state.article.title,
      meta: [
        {name: 'description', content: this.$store.state.article.description},
        {property: 'og:title', content: this.$store.state.article.title},
        {property: 'og:description', content: this.$store.state.article.description},
        {property: 'og:locale', content: this.$i18n.locale},
        {property: 'og:image', content: this.$store.state.article.image},
      ],
    }
  },
  created () {
    this.$store.commit('SET_ON_SWAPPED_LOCALE', locale => {
      return new Promise((resolve) => {
        this.$axios.get('/post?identifier=' + this.$store.state.article.identifier + '&locale=' + locale).then(response => {
          resolve(window.location.toString().replace(this.$store.state.article.slug, response.data.data.posts[0].slug))
        })
      })
    })
  },
  async fetch (context) {
    if (process.server) {
      await context.store.dispatch('fetchArticle', {context: context, slug: context.params.slug})
    } else {
      context.store.dispatch('fetchArticle', {context: context, slug: context.params.slug})
    }
  }
}
</script>
