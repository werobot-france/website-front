<template>
  <div
    id="footer"
    class="footer">
    <div class="footer-cover-back"></div>
    <div class="footer-cover"></div>
    <div class="footer-border">
      <span class="footer-border-item"></span>
      <span class="footer-border-item"></span>
      <span class="footer-border-item"></span>
    </div>
    <div class="footer-container container mx-auto">
      <div>
        <div class="flex flex-wrap">
          <div class="w-full md:w-1/2">
            <div class="footer-title-container">
              <nuxt-link
                class="link footer-logo"
                to="/"
              >
                <img src="~/assets/img/logo.jpg">
              </nuxt-link>
              <div>
                <div class="footer-title">
                  {{ $t('title') }}
                </div>

                <div class="footer-description">
                  {{ $t('description') }}
                </div>
              </div>
            </div>
          </div>
          <div class="w-full md:w-1/4">
            <div class="footer-links">
              <nuxt-link
                class="link"
                to="/">{{ $t('home') }}</nuxt-link>
              <nuxt-link
                class="link"
                to="blog">{{ $t('blog.title') }}</nuxt-link>
              <nuxt-link
                class="link"
                to="photos">{{ $t('photos.title') }}</nuxt-link>
              <a
                :href="$env.donate"
                class="link">{{ $t('donate') }}</a>
            </div>
          </div>
          <div class="w-full md:w-1/4">
            <div class="footer-links">
              <nuxt-link
                class="link"
                to="about">{{ $t('about') }}</nuxt-link>
              <nuxt-link
                class="link"
                to="contact-us">{{ $t('contact-us.title') }}</nuxt-link>
              <nuxt-link
                class="link"
                to="legals">{{ $t('legals') }}</nuxt-link>
            </div>
          </div>
        </div>

        <div class="flex justify-between footer-footer">
          <div class="footer-socials">
            <div class="footer-socials-item">
              <a
                :href="$env.socials.facebook"
                class="link">
                <img src="~/assets/img/facebook.svg">
              </a>
            </div>
            <div class="footer-socials-item">
              <a
                :href="$env.socials.instagram"
                class="link">
                <img src="~/assets/img/instagram.svg">
              </a>
            </div>
            <div class="footer-socials-item">
              <a
                :href="$env.socials.twitter"
                class="link">
                <img src="~/assets/img/twitter.svg">
              </a>
            </div>
            <div class="footer-socials-item">
              <a
                :href="$env.socials.youtube"
                class="link">
                <img src="~/assets/img/youtube.svg">
              </a>
            </div>
          </div>
          <div
            id="h"
            class="footer-locale">
            <a
              class="button button-primary"
              @click="swap">
              <div class="button-icon">
                <i class="fa fas fa-flag"></i>
              </div>
              <div
                class="link button-text">
                <span v-if="$i18n.locale === 'fr'">
                  English
                </span>
                <span v-else>
                  Français
                </span>
              </div>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'FooterContainer',
  methods: {
    swap: function () {
      this.$store.commit('HIDE_BODY');
      let locale = this.$cookie.get('locale');
      if (locale === undefined) {
        this.$cookie.set('locale', 'en')
      }
      let locales = ['en', 'fr'];
      locale = locales.filter((l) => l !== locale)[0];
      this.$i18n.locale = locale;
      this.$cookie.set('locale', locale);
      window.location.reload(false);
    }
  }
}
</script>
