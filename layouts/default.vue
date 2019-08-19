<template>
  <div>
    <transition name="main-transition">
      <div
        v-show="$store.state.showBody"
        id="app">
        <no-ssr>
          <drawer/>
        </no-ssr>
        <main
          id="main-page-wrap"
          :class="{'disabled': $store.state.drawerEnabled}"
          class="main-page-wrap">
          <header-container ref="header" />
          <div
            class="header-locale-container container mx-auto "
            style="height:0;">
            <div
              id="h"
              class="footer-locale ">
              <a
                class="button button-primary"
                @click="$refs.footerContainer.swap()">
                <div class="button-icon">
                  <i class="fa fas fa-flag"></i>
                </div>
                <div
                  class="link button-text">
                  <span v-if="$i18n.locale === 'fr'">
                    English
                  </span>
                  <span v-else>
                    Français
                  </span>
                </div>
              </a>
            </div>
          </div>
          <nuxt
            :class="{'not-complete' : $store.state.headerComplete === false}"
            class="content-container" />
          <footer-container ref="footerContainer" />
        </main>
      </div>
    </transition>
  </div>
</template>

<script>
import HeaderContainer from '~/components/HeaderContainer.vue'
import FooterContainer from '~/components/FooterContainer.vue'
import Drawer from '~/components/Drawer.vue'

export default {
  components: {
    'header-container': HeaderContainer,
    'footer-container': FooterContainer,
    'drawer': Drawer
  },
  head () {
    return {
      titleTemplate: '%s - We Robot',
      meta: [
        {name: 'description', content: this.$t('description')},
        {name: 'keywords', content: this.$t('keywords').join(',')},
        {property: 'og:title', content: this.$t('title')},
        {property: 'og:description', content: this.$t('description')},
        {property: 'og:locale', content: this.$i18n.locale},
        {property: 'og:image', content: '/logo.png'},
        {property: 'og:locale:alternate', content: 'fr'},
        {property: 'og:locale:alternate', content: 'en'}
      ],
      htmlAttrs: {
        lang: this.$i18n.locale
      }
    }
  },
  mounted() {
    let locale = navigator.language.substring(0, 2);
    if (this.$cookie.get('locale') === undefined || this.$cookie.get('locale') === null) {
      this.$cookie.set('locale', locale);
      this.$i18n.locale = locale
    } else {
      this.$i18n.locale = this.$cookie.get('locale')
    }
    this.$moment.locale(this.$i18n.locale);

    setTimeout(() => {
      this.$store.commit('SHOW_BODY')
    }, 300)
  }
}
</script>
