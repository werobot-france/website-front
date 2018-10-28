<template>
  <div class="photos-list mt-6">
    <transition-group name="main-transition">
      <div
        v-if="isLoading === true"
        :key="1"
        class="loading-container">
        <div class="loading-content">
          <i class="fa fas fa-sync-alt fa-spin"></i>
          {{ $t('loading') }}
        </div>
      </div>
      <div
        v-if="isLoading === false"
        :key="2">
        <div
          v-if="photos.length === 0"
          class="section-error-container">
          <div class="section-error-content">
            <i class="fa fas fa-times-circle"></i>
            {{ $t('photos.empty') }}
          </div>
        </div>
        <div
          v-if="photos.length > 0"
          class="photos-list-photos">
          <div
            v-for="(photo, i) in photos"
            :key="photo.id"
            :title="photo.description"
            :style="'background-image: url(' + photo.url + ');'"
            class="photos-list-item"
            @click="index = i"
          >
          </div>
        </div>
      </div>
    </transition-group>
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
      isLoading: false,
      index: null
    }
  },
  mounted () {
    this.isLoading = true;
    let limit = `?limit=${this.limit}`;
    if (this.limit == null){
      limit = ''
    }
    this.$axios.get(`/photos${limit}`).then((res) => {
      this.photos = res.data.data.photos;
      this.photosSlideShow = this.photos.map((photo) => {
        return photo.url
      });
      this.isLoading = false;
    })
  }
}
</script>
