<template>
  <div class="drawer">
    <PushMenu
      :isOpen="$store.state.drawerEnabled"
      :burgerIcon="false"
      noOverlay
      right
      @closeMenu="handleCloseMenu()">
      <nuxt-link
        class="drawer-link"
        to="/">
        {{ $t('home') }}
      </nuxt-link>
      <nuxt-link
        class="drawer-link"
        to="/blog">
        {{ $t('blog.title') }}
      </nuxt-link>
      <nuxt-link
        class="drawer-link"
        to="/about">
        {{ $t('about') }}
      </nuxt-link>
      <nuxt-link
        class="drawer-link"
        to="/contact-us">
        {{ $t('contact-us.title') }}
      </nuxt-link>
      <a
        :href="$env.donate"
        class="drawer-link">
        {{ $t('donate') }}
      </a>
    </PushMenu>
  </div>
</template>
<script>
export default {
  name: 'Drawer',
  methods: {
    handleCloseMenu: function () {
      this.$store.commit('TOGGLE_DRAWER', false)
    }
  }
}
</script>