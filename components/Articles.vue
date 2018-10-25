<template>
  <div class="articles-list">
    <transition-group name="main-transition">
      <div
        v-if="$store.state.isLoading === true"
        key="1"
        class="loading-container">
        <div class="loading-content">
          <i class="fa fas fa-sync-alt fa-spin"></i>
          {{ $t('loading') }}
        </div>
      </div>
      <div
        v-if="$store.state.isLoading === false"
        key="2">
        <div
          v-if="$store.state.articles.length === 0"
          class="section-error-container">
          <div class="section-error-content">
            <i class="fa fas fa-times-circle"></i>
            {{ $t('articles.empty') }}
          </div>
        </div>
        <div
          v-if="$store.state.articles.length > 0"
          class="articles">
          <article
            v-for="(article, index) in $store.state.articles"
            :key="article.id"
            class="article">
            <header class="article-thumb">
              <router-link
                :to="{name: 'blog-slug', params: {slug: article.slug}}"
                class="link no-opacity">
                <img
                  :src="article.image"
                  alt="article image">
              </router-link>
            </header>
            <span
              v-if="index === 0"
              class="article-status">NEW</span>
            <div class="article-body">
              <div class="article-title">
                <router-link
                  :to="{name: 'blog-slug', params: {slug: article.slug}}"
                  class="link">{{ article.title }}</router-link>
              </div>
              <div class="article-subtitle">
                <router-link
                  :to="{name: 'blog-slug', params: {slug: article.slug}}"
                  class="link">
                  <from-now
                    :value="article.created_at"/>
                </router-link>
              </div>
              <p class="article-description">
                {{ article.description }}
              </p>
            </div>
          </article>
        </div>
      </div>
    </transition-group>
  </div>
</template>
<script>
import FromNow from './FromNow'
export default {
  name: 'Articles',
  components: {
    'from-now': FromNow
  }
}
</script>
