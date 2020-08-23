<template>
  <div>
    <div class="cover">
      <div class="cover-back"></div>
      <div class="cover-container">
        <div class="container mx-auto">
          <div class="cover-title">
            <h1>{{ $t('blog.title') }}</h1>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="container mx-auto">
        <transition name="main-transition">
          <div
            v-if="showDatesList"
            class="sort-by-dates-container"
          >
            <h3>{{ $t('articles.sort-by-dates.title') }}</h3>
            <ul class="dates-mosaic">
              <li
                v-for="(categories, index) in datesCategories"
                :key="index"
              >
                <a
                  class="link"
                  href="#"
                  @click="sortBy(index)">{{ index }}</a> : {{ categories.length }} {{ $t('articles.sort-by-dates.posts') }}
              </li>
            </ul>
          </div>
        </transition>
        <div
          style="display: flex; justify-content: space-between; align-items: center"
          class="py-2">
          <h2 class="index-icon-title">
            <i class="fa fas fa-newspaper"></i>
            {{ $t('articles.all') }}
          </h2>
          <div>
            <div
              class="link button button-primary"
              @click="fetchDates">
              <div class="button-icon">
                <i
                  v-if="!showDatesList"
                  class="fa fas fa-calendar"></i>
                <i
                  v-else
                  class="fa fas fa-times"></i>
              </div>
              <div
                v-if="!showDatesList"
                class="button-text">{{ $t('articles.sort-by-dates.title') }}</div>
              <div
                v-else
                class="button-text">{{ $t('articles.sort-by-dates.close') }}</div>
            </div>
          </div>
        </div>

        <div class="mt-4">
          <articles :locale="$i18n.locale" />
        </div>
        
      </div>
    </div>
  </div>
</template>

<script>
import Articles from '~/components/Articles.vue'
export default {
  head () {
    return {
      title: this.$t('blog.title'),
      meta: [
        {name: 'description', content: this.$t('blog.description')},
        {property: 'og:title', content: this.$t('blog.title')},
        {property: 'og:description', content: this.$t('blog.description')},
        {property: 'og:image', content: 'https://s.werobot.fr/logo.png'},
      ]
    }
  },
  components: {
    'articles': Articles
  },
  data: () => ({
    sortDateIndex: '',
    showDatesList: false,
    datesCategories: {}
  }),
  async fetch ({ isServer, store, app }) {
    if (process.server) {
      await store.dispatch('fetchArticles', {app: app, limit: -1})
    } else {
      store.dispatch('fetchArticles', {app: app, limit: -1})
    }
  },
  watch: {
    showDatesList: function () {
      if (!this.showDatesList) {
        this.$store.dispatch('fetchArticles', {app: this, limit: -1, locale: this.$i18n.locale})
      }
    }
  },
  methods: {
    async fetchDates () {
      this.showDatesList = !this.showDatesList
      if (this.showDatesList) {
        this.datesCategories = await this.$axios.$get('/post/dates?locale=' + this.$i18n.locale).then(response => {
          return response.data
        })
      }
    },
    sortBy (dateCategory) {
      this.$store.commit('SET_ARTICLES', this.datesCategories[dateCategory])
    }
  }
}
</script>

<style>
  .sort-by-dates-container {
    background-color: #f5f6fa;
    padding: 10px;
    margin-bottom: 2.5em;
  }
</style>
