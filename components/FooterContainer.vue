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
                <img
                  src="~/assets/img/logo.png"
                  class="logo">
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
                to="/blog">{{ $t('blog.title') }}</nuxt-link>
              <nuxt-link
                class="link"
                to="/photos">{{ $t('photos.title') }}</nuxt-link>
              <a
                :href="$env.donate"
                class="link">{{ $t('donate') }}</a>
            </div>
          </div>
          <div class="w-full md:w-1/4">
            <div class="footer-links">
              <nuxt-link
                class="link"
                to="/about">{{ $t('about') }}</nuxt-link>
              <nuxt-link
                class="link"
                to="/about#place">{{ $t('place') }}</nuxt-link>
              <nuxt-link
                class="link"
                to="/contact-us">{{ $t('contact-us.title') }}</nuxt-link>
              <nuxt-link
                class="link"
                to="/legals">{{ $t('legals.title') }}</nuxt-link>
            </div>
          </div>
        </div>

        <div class="flex justify-between footer-footer">
          <div class="footer-socials">
            <a
              :href="$env.socials.facebook"
              class="footer-socials-item link">
              <img src="~/assets/img/facebook.svg">
            </a>
            <a
              :href="$env.socials.instagram"
              class="footer-socials-item link">
              <img src="~/assets/img/instagram.svg">
            </a>
            <a
              :href="$env.socials.twitter"
              class="footer-socials-item link">
              <img src="~/assets/img/twitter.svg">
            </a>
            <!--
            <a
              :href="$env.socials.youtube"
              class="footer-socials-item link">
              <img src="~/assets/img/youtube.svg">
            </a> -->
            <a
              :href="$env.socials.github"
              class="footer-socials-item link">
              <img src="~/assets/img/github.svg">
            </a>
          </div>
          <div
            id="h"
            class="footer-locale">
            <a
              class="button button-primary"
              @click="onSwapLocale">
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
  props: {
    onSwapLocale: {
      type: Function,
      required: true
    }
  }
}
</script>
