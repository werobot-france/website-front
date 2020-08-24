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
            <h3 class="ml-2">{{ $t('articles.sort-by-years.title') }}</h3>
            <ul class="dates-mosaic">
              <li>
                <a
                  class="link link-primary"
                  @click="filterYear(null)">{{ $t('articles.all') }}</a>
              </li>
              <li
                v-for="(year, index) in datesCategories"
                :key="index"
              >
                <a
                  class="link link-primary"
                  @click="filterYear(year.name)">{{ year.name }}</a> : {{ year.count }} {{ $t('articles.sort-by-years.posts') }}
              </li>
            </ul>
          </div>
        </transition>
        <div class="blog-title-container py-2">
          <h2 class="index-icon-title">
            <i class="fa fas fa-newspaper"></i>
            {{ $t('articles.all') }}
          </h2>
          <div class="sort">
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
                class="button-text">{{ $t('articles.sort-by-years.title') }}</div>
              <div
                v-else
                class="button-text">{{ $t('articles.sort-by-years.close') }}</div>
            </div>
          </div>
        </div>

        <div class="mt-4">
          <articles :locale="$i18n.locale" />
        </div>

        <div class="mt-6 pt-2 blog-pagination">
          <div class="blog-pagination-previous">
            <a
              :class="$store.state.pagination.previous_page == null ? 'disabled' : ''"
              class="button button-primary mobile-icon"
              @click="previous()">
              <div class="button-icon">
                <i class="fa fas fa-arrow-left"></i>
              </div>
              <div class="link button-text">
                {{ $t('previous') }}
              </div>
            </a>
          </div>
          <div class="blog-pagination-current">
            <template v-if="!$store.state.isLoading">
              Page {{ $store.state.pagination.current_page }}/{{ $store.state.pagination.total_page }}
            </template>
          </div>
          <div class="blog-pagination-next">
            <a
              :class="$store.state.pagination.next_page == null ? 'disabled' : ''"
              class="button button-primary mobile-icon"
              @click="next()">
              <div class="link button-text">
                {{ $t('next') }}
              </div>
              <div class="button-icon">
                <i class="fa fas fa-arrow-right"></i>
              </div>
            </a>
          </div>
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
    datesCategories: [],
    year: null
  }),
  async fetch ({ isServer, store, app, query }) {
    let page = (query.page == null || query.page < 1) ? 1 : query.page
    if (process.server) {
      await store.dispatch('fetchArticles', {app: app, page })
    } else {
      store.dispatch('fetchArticles', {app: app, page })
    }
  },
  watch: {
    showDatesList: function () {
      if (!this.showDatesList) {
        this.$store.dispatch('fetchArticles', {app: this, page: this.page, locale: this.$i18n.locale})
      }
    },
    '$route': function (val) {
      this.fetchData(val.query.page)
    }
  },
  methods: {
    async fetchDates () {
      if (!this.showDatesList) {
        this.datesCategories = await this.$axios.$get('/post/years?locale=' + this.$i18n.locale)
          .then(res => res.data.years)
      }
      this.showDatesList = !this.showDatesList
    },
    filterYear (year) {
      this.year = year
      if (year == null) {
        year = 'all'
      }
      this.$router.push({ query: { page: 1, year } })
    },
    fetchData (page) {
      this.$store.dispatch('fetchArticles', {app: this, locale: this.$i18n.locale, page, year: this.year})
    },
    previous () {
      if (this.$store.state.pagination.previous_page == null) { return; }
      let page = this.$store.state.pagination.current_page
      if (page === 1) { return; }
      page = page - 1
      window.scrollTo(0, 0)
      this.$router.push({ query: { page } })
    },
    next () {
      if (this.$store.state.pagination.next_page == null) { return; }
      let page = this.$store.state.pagination.current_page
      page = page + 1
      window.scrollTo(0, 0)
      this.$router.push({ query: { page } })
    }
  }
}
</script>

<style>
  .sort-by-dates-container {
    background-color: #f5f6fa;
    padding: 10px;
    margin-bottom: 1em;
  }
</style>
