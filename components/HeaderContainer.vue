<template>
  <transition name="main-transition">
    <div
      id="header"
      :class="{'not-complete' : $store.state.headerComplete === false}"
      class="header"
    >
      <div class="header-container container mx-auto">
        <nuxt-link
          to="/"
          class="link">
          <div class="header-title-container">
            <div class="header-logo">
              <img
                src="~/assets/img/logo.png"
                class="logo">
            </div>
            <div class="header-title">
              <div class="header-title-title">{{ $t('title') }}</div>
              <div class="header-sub-title">
                {{ $t('slogan') }}
              </div>
            </div>
          </div>
        </nuxt-link>
        <div class="header-nav-responsive-button-container">
          <div
            class="header-nav-responsive-button"
            @click="$store.commit('TOGGLE_DRAWER')">
            <i class="fa fas fa-bars"></i>
          </div>
        </div>
        <div class="header-nav">
          <div class="header-nav-item">
            <nuxt-link
              :class="{'active': $route.name === 'index'}"
              to="/"
              class="link">{{ $t('home') }}</nuxt-link>
          </div>
          <div class="header-nav-item">
            <nuxt-link
              :class="{'active': $route.name === 'blog'}"
              to="/blog"
              class="link">{{ $t('blog.title') }}</nuxt-link>
          </div>
          <div class="header-nav-item">
            <nuxt-link
              :class="{'active': $route.name === 'about'}"
              to="/about"
              class="link">{{ $t('about') }}</nuxt-link>
          </div>
          <div class="header-nav-item">
            <nuxt-link
              :class="{'active': $route.name === 'contact-us'}"
              to="/contact-us"
              class="link">{{ $t('contact-us.title') }}</nuxt-link>
          </div>
          <div class="header-nav-item">
            <a
              :href="$env.donate"
              class="link link-primary">{{ $t('donate') }}</a>
          </div>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'HeaderContainer',
  mounted () {
    if (!process.server) {
      window.addEventListener('scroll', (scrollObject) => {
        this.$store.commit('SET_HEADER_COMPLETE', scrollObject.pageY < 71)
      })
    }
  }
}
</script>
