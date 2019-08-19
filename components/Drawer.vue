<template>
  <div
    :class="{ 'drawer-enabled': isOpen }"
    class="drawer">
    <div class="drawer-content">
      <div class="drawer-close-container">
        <div 
          class="drawer-close-button" 
          @click="nav()">
          <i class="fa fas fa-times-circle"></i>
        </div>
      </div>
      <div class="drawer-links">
        <div
          class="drawer-link"
          @click="nav('/')">
          {{ $t('home') }}
        </div>
        <div
          class="drawer-link"
          @click="nav('/blog')">
          {{ $t('blog.title') }}
        </div>
        <div
          class="drawer-link"
          @click="nav('/about')">
          {{ $t('about') }}
        </div>
        <div
          class="drawer-link"
          @click="nav('/contact-us')">
          {{ $t('contact-us.title') }}
        </div>
        <a
          :href="$env.donate"
          class="drawer-link">
          {{ $t('donate') }}
        </a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Drawer',
  data: () => ({
    isOpen: false
  }),
  watch: {
    '$store.state.drawerEnabled': function () {
      if (this.$store.state.drawerEnabled) {
        this.open()
      } else {
        this.close()
      }
    }
  },
  methods: {
    open: function () {
      document.body.classList.add('drawer-body-scrolling-disabled');
      this.isOpen = true
    },
    close: function() {
      document.body.classList.remove('drawer-body-scrolling-disabled');
      this.isOpen = false
    },
    nav: function (to = null) {
      if (to !== null) {
        this.$router.push(to)
      }
      this.$store.commit('TOGGLE_DRAWER', false)
      this.close()
    }
  }
}
</script>