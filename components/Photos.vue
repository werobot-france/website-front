<template>
  <div class="transition-parent photos-list">
    <transition name="main-transition">
      <div
        v-if="isLoading === true"
        class="transition-child loading-container"
        style="height: 100%;">
        <div class="loading-content">
          <i class="fa fas fa-sync-alt fa-spin"></i>
          {{ $t('loading') }}
        </div>
      </div>
    </transition>
    <transition name="main-transition">
      <div
        v-if="isLoading === false && photos.length === 0"
        class="transition-child section-error-container"
        style="height: 100%;">
        <div class="section-error-content">
          <i class="fa fas fa-times-circle"></i>
          {{ $t('photos.empty') }}
        </div>
      </div>
    </transition>
    <transition name="main-transition">
      <div
        v-if="photos.length > 0"
        class="photos-list-photos">
        <div
          v-lazy:background-image="photo.thumbnail"
          v-for="(photo, i) in photos"
          :key="photo.id"
          :title="photo.caption"
          class="photos-list-item"
          @click="index = i"
        >
        </div>
      </div>
    </transition>
    <no-ssr>
      <vue-gallery-slideshow
        :images="photosSlideShow"
        :index="index"
        @close="index = null"
      ></vue-gallery-slideshow>
    </no-ssr>
  </div>
</template>
<script>
import VueGallerySlideshow from 'vue-gallery-slideshow'
export default {
  name: 'Photos',
  components: {
    VueGallerySlideshow
  },
  props: {
    limit: {
      type: String,
      default: null
    }
  },
  data () {
    return {
      viewEnabled: false,
      photos: [],
      photosSlideShow: [],
      isLoading: true,
      index: null
    }
  },
  mounted () {
    let limit = `?limit=${this.limit}`;
    if (this.limit == null){
      limit = ''
    }
    this.$axios.get(`/photos${limit}`).then((res) => {
      this.photos = res.data.data.photos.map((photo) => {
        photo.original = this.$env.apiEndpoint + '/proxy-picture?url=' + btoa(photo.original)
        photo.thumbnail = this.$env.apiEndpoint + '/proxy-picture?url=' + btoa(photo.thumbnail)
        return photo
      });
      this.photosSlideShow = this.photos.map((photo) => photo.original);
      this.isLoading = false;
    })
  }
}
</script>
