<template>
  <div class="articles-list transition-parent">
    <transition name="main-transition">
      <div
        v-if="$store.state.isLoading === true"
        class="loading-container transition-child"
        style="height: 100%;">
        <div class="loading-content">
          <i class="fa fas fa-sync-alt fa-spin"></i>
          {{ $t('loading') }}
        </div>
      </div>
    </transition>
    <transition name="main-transition">
      <div
        v-if="$store.state.isLoading === false && $store.state.articles.length === 0"
        class="section-error-container transition-child"
        style="height: 100%;">
        <div class="section-error-content">
          <i class="fa fas fa-times-circle"></i>
          {{ $t('articles.empty') }}
        </div>
      </div>
    </transition>
    <transition name="main-transition">
      <div
        v-if="$store.state.articles.length > 0"
        class="articles">
        <router-link
          v-for="(article, index) in $store.state.articles"
          :key="article.id"
          :to="{name: 'blog-slug', params: {slug: article.slug}}"
          class="article">
          <article>
            <div
              v-lazy:background-image="article.image"
              class="article-thumb">
            </div>
            <span
              v-if="index === 0 && article.isRecent"
              class="article-status">NEW</span>
            <div class="article-body">
              <div class="article-title">
                {{ article.title }}
              </div>
              <div class="article-subtitle">
                <from-now :value="article.created_at"/>
              </div>
              <p class="article-description">
                {{ article.description }}
              </p>
            </div>
          </article>
        </router-link>
      </div>
    </transition>
  </div>
</template>
<script>
import FromNow from './FromNow'
export default {
  name: 'Articles',
  components: {
    'from-now': FromNow
  },
  mounted () {
    if (!this.$isServer) {
      this.$Lazyload.lazyLoadHandler()
      setTimeout(() => {
        this.$Lazyload.lazyLoadHandler()
      }, 400)
    }
  }
}
</script>
