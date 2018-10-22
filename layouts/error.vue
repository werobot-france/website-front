<template>
  <div class="header-border">
    <div class="container mx-auto error-container">
      <div class="error">
        <div class="error-icon">
          <i class="fa fas fa-exclamation-circle"></i>
        </div>
        <div class="error-content">
          <div v-if="error.statusCode === 404">
            <h2 class="error-title">
              {{ $t('error.not-found.title') }}
            </h2>
            <p class="error-description">
              {{ $t('error.not-found.description') }}
            </p>
          </div>
          <div v-else>
            <h2 class="error-title">
              {{ $t('error.unknown.title') }}
            </h2>
            <p class="error-description">
              {{ $t('error.unknown.description') }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'default',
  props: {
    error: {
      required: true,
      type: Object | Array
    }
  }
}
</script>