<template>
  <div>
    <div
      :class="'cover-mode-' + $store.state.article.cover_mode"
      class="cover"
    >
      <div
        :style="'background-image: url(' + $store.state.article.image + '); background-size: cover; ' + $store.state.article.cover_position"
        class="cover-back"
      ></div>
      <div class="cover-container">
        <div class="container mx-auto">
          <div class="cover-title">
            <h1>{{ $store.state.article.title }}</h1>
          </div>
          <div
            v-if="$store.state.article.cover_mode && false"
            class="cover-date"
          >
            <div class="cover-date-icon">
              <i class="fa fas fa-clock"></i>
            </div>
            <div class="cover-date-text">
              Le {{ $store.state.article.created_at }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="container mx-auto content content-container text transition-parent">
      <transition name="main-transition">
        <div
          v-if="$store.state.isLoading && $store.state.article.title === ''"
          class="transition-child loading-container">
          <div class="loading-content">
            <i class="fa fas fa-sync-alt fa-spin"></i>
            {{ $t('loading') }}
          </div>
        </div>
      </transition>
      <transition name="main-transition">
        <div v-if="!$store.state.isLoading && $store.state.article.title !== ''">
          <div class="page-details">
            <div class="page-details-item">
              <div>
                <i class="fa fas fa-clock"></i>
              </div>
              <div>
                {{ $store.state.article.created_at }}
              </div>
            </div>
          </div>
          <div
            v-lazy-container="{ selector: 'img' }"
            class="blog-article"
            v-html="$store.state.article.content">
          </div>
        </div>
      </transition>
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
        {property: 'og:image', content: this.$store.state.article.image},
        {property: 'og:type', content: 'article'},

        {property: 'twitter:card', content: 'summary_large_image'},
        {property: 'twitter:title', content: this.$store.state.article.title},
        {property: 'twitter:description', content: this.$store.state.article.description},
        {property: 'twitter:image', content: this.$store.state.article.image}
      ],
    }
  },
  created () {
    this.$store.commit('SET_ON_SWAPPED_LOCALE', locale => {
      return new Promise((resolve) => {
        this.$axios.get('/post?identifier=' + this.$store.state.article.identifier + '&locale=' + locale).then(response => {
          if (response.data.data.posts.length === 0) {
            resolve(null)
          } else {
            resolve(window.location.toString().replace(this.$store.state.article.slug, response.data.data.posts[0].slug))
          }
        })
      })
    })
  },
  mounted () {
    if (!this.$isServer) {
      this.$Lazyload.lazyLoadHandler()
      setTimeout(() => {
        this.$Lazyload.lazyLoadHandler()
      }, 400)
    }
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
