<template>
  <div>
    <div class="cover">
      <div class="cover-back"></div>
      <div class="cover-container">
        <div class="container mx-auto">
          <div class="cover-title">
            <h1>{{ $t('photos.title') }}</h1>
          </div>
        </div>
      </div>
    </div>
    <div
      class="container mx-auto content">
      <div>
        <h2 class="index-icon-title py-2">
          <i class="fa fas fa-newspaper"></i>
          {{ $t('photos.all') }}
        </h2>
        <div class="mt-4">
          <photos :limit="null" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Photos from '../components/Photos.vue'
export default {
  components: {
    'photos': Photos
  },
  head () {
    return {
      title: this.$t('photos.title'),
      meta: [
        {name: 'description', content: this.$t('photos.description')},
        {property: 'og:title', content: this.$t('photos.title')},
        {property: 'og:description', content: this.$t('photos.description')},
        {property: 'og:image', content: 'https://s.werobot.fr/logo.png'},
      ]
    }
  }
}
</script>