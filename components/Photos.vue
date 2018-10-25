<template>
  <div class="photos-list mt-6">
    <transition-group name="main-transition">
      <div
        v-if="isLoading === true"
        key="1"
        class="loading-container">
        <div class="loading-content">
          <i class="fa fas fa-sync-alt fa-spin"></i>
          {{ $t('loading') }}
        </div>
      </div>
      <div
        v-if="isLoading === false"
        key="2">
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
            v-for="photo in photos"
            :key="photo.id"
            :title="photo.description"
            :style="'background-image: url(' + photo.url + ');'"
            class="photos-list-item"
          >
          </div>
        </div>
      </div>
    </transition-group>
  </div>
</template>
<script>
export default {
  name: 'Photos',
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
      isLoading: false
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
      this.isLoading = false;
    })
  }
}
</script>
