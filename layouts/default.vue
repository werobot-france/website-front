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
          <header-container />
          <nuxt
            :class="{'not-complete' : $store.state.headerComplete === false}"
            class="content-container" />
          <footer-container />
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
        {property: 'og:locale', content: this.$i18n.locale},
        {property: 'og:locale:alternate', content: 'fr'},
        {property: 'og:locale:alternate', content: 'en'}
      ],
      htmlAttrs: {
        lang: this.$i18n.locale
      }
    }
  },
  created () {
    this.$store.commit('SET_SWAP_LOCALE', this.swapLocale)
  },
  mounted () {
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
  },
  methods: {
    swapLocale: async function () {
      this.$store.commit('HIDE_BODY');
      setTimeout(() => {
        let locale = this.$cookie.get('locale');
        if (locale === undefined) {
          this.$cookie.set('locale', 'en')
        }
        let locales = ['en', 'fr'];
        locale = locales.filter((l) => l !== locale)[0];
        this.$i18n.locale = locale;
        this.$cookie.set('locale', locale);
        if (typeof this.$store.state.onSwappedLocale === 'function') {
          let swappedLocaleResponse = this.$store.state.onSwappedLocale(locale)
          this.$store.commit('SET_ON_SWAPPED_LOCALE', null)
          if (typeof swappedLocaleResponse.then !== 'function' && (swappedLocaleResponse === null || swappedLocaleResponse === window.location)) {
            window.location.reload(false);
          } else {
            swappedLocaleResponse.then(url => {
              if (url === null || url === window.location) {
                window.location.reload(false);
              } else {
                window.location = url
              }
            })
          }
        } else {
          window.location.reload(false);
        }
      }, 500)
    }
  }
}
</script>
