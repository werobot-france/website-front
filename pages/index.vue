<template>
  <div>
    <div class="cover-back">&nbsp;</div>
    <div class="cover">
      <div class="cover-container container mx-auto">
        <div class="cover-title">
          <h1>{{ $t('landing.title') }}</h1>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="container mx-auto">
        <div class="flex flex-wrap justify-between">
          <div class="w-full">
            <div class="card no-actions card-blue mx-2">
              <div class="card-title">
                <i class="fa fas fa-arrow-circle-right"></i> {{ $t('landing.edito.title') }}
              </div>
              <div
                class="card-text"
                v-html="$t('landing.edito.content')">
              </div>
            </div>
          </div>
          <div class="w-full md:w-1/2 ">
            <div class="card card-purple mx-2">
              <div class="card-title">
                <i class="fa fas fa-arrow-circle-right"></i> {{ $t('landing.mission.title') }}
              </div>
              <div
                class="card-text"
                v-html="$t('landing.mission.content')">
              </div>
              <div class="card-actions">
                <nuxt-link
                  to="/about"
                  class="card-action">
                  {{ $t('landing.mission.action') }}
                </nuxt-link>
              </div>
            </div>
          </div>
          <div class="w-full md:w-1/2">
            <div class="card card-green mx-2">
              <div class="card-title">
                <i class="fa fas fa-arrow-circle-right"></i> {{ $t('landing.support.title') }}
              </div>
              <div
                class="card-text"
                v-html="$t('landing.support.content')">
              </div>
              <div class="card-actions">
                <a
                  :href="$env.donate"
                  class="card-action">
                  {{ $t('landing.support.action') }}
                </a>
              </div>
            </div>
          </div>
        </div>
        <div class="divider my-5"></div>
        <h2 class="index-icon-title pt-2">
          <i class="fa fas fa-newspaper"></i>
          {{ $t('articles.last') }}
        </h2>
        <articles :locale="$store.state.locale" />
        <div class="index-more-section">
          <nuxt-link
            to="/blog"
            class="link button button-primary">
            <div class="button-icon">
              <i class="fa fas fa-plus-square"></i>
            </div>
            <div class="button-text">{{ $t('more') }}</div>
          </nuxt-link>
        </div>
        <div class="clear-fix"></div>
        <div class="divider mt-4 mb-5"></div>
        <h2 class="index-icon-title py-2 mb-2">
          <i class="fa fas fa-newspaper"></i>
          {{ $t('photos.last') }}
        </h2>
        <photos limit="4" />
        <div class="index-more-section">
          <nuxt-link
            to="/photos"
            class="link button button-primary">
            <div class="button-icon">
              <i class="fa fas fa-plus-square"></i>
            </div>
            <div class="button-text">{{ $t('more') }}</div>
          </nuxt-link>
        </div>
        <div class="clear-fix"></div>
        <div class="divider my-5"></div>
        <div class="partners-quick flex flex-wrap">
          <div class="partner-item w-full">
            <h3 class="partner-quick-title py-2 mb-2">
              {{ $t('partners.support-us') }}
            </h3>
          </div>
          <div
            class="partner-item link md:w-1/3"
            @click="$router.push({ path: '/about#partners' })">
            <img src="https://s.werobot.fr/logoGIGAreduit.png" />
          </div>
          <div
            class="partner-item link w-full md:w-1/3"
            @click="$router.push({ path: '/about#partners' })">
            <img src="https://s.werobot.fr/blog/bob-ross/5c1276a18d8e1.jpg" />
          </div>
          <div
            class="partner-item link w-1/3"
            @click="$router.push({ path: '/about#partners' })">
            <img src="https://s.werobot.fr/logoVilleGaillon.jpg" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Photos from '~/components/Photos.vue'
import Articles from '~/components/Articles.vue'
export default {
  head () {
    return {
      title: this.$t('home')
    }
  },
  components: {
    'photos': Photos,
    'articles': Articles
  },
  async fetch ({ isServer, store, app }) {
    if (process.server) {
      await store.dispatch('fetchArticles', {app: app, limit: 3})
    } else {
      store.dispatch('fetchArticles', {app: app, limit: 3})
    }
  }
}
</script>
