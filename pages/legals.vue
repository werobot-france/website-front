<template>
  <div>
    <div class="cover-back">&nbsp;</div>
    <div class="cover">
      <div class="cover-container container mx-auto">
        <div class="cover-title">
          <h1>{{ $t('legals') }}</h1>
        </div>
      </div>
    </div>
    <div class="container mx-auto content text negative-top-margin">
      <div>
        <div
          v-show="$i18n.locale === 'en'"
          class="bg-red-lightest border-t-4 border-red rounded-b text-red-darkest px-4 py-3 shadow-md mb-5"
          role="alert"
        >
          <div class="flex justify-between">
            <div class="flex">
              <div class="px-5">
                <i class="fa fas fa-times-circle"></i>
              </div>
              <div>
                <p class="font-bold">
                  {{ $t('page-not-supported') }}
                </p>
              </div>
            </div>
          </div>
        </div>
        <div v-html="content"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Legals',
  head() {
    return {
      title: this.$t('legals')
    }
  },
  data() {
    return {
      content: require('../assets/content/fr/legals.md')
    }
  }
}
</script>
