<template>
  <div>
    <div class="cover">
      <div class="cover-back"></div>
      <div class="cover-container">
        <div class="container mx-auto">
          <div class="cover-title">
            <h1>{{ $t('contact-us.title') }}</h1>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="container mx-auto">
        <p class="pt-3 mb-3">{{ $t('contact-us.body') }}</p>
        <transition name="main-transition">
          <div v-if="success">
            <div
              role="alert"
              class="w-100 bg-teal-lightest border-t-4 border-teal rounded-b text-teal-darkest px-4 py-3 shadow-md mb-4">
              <div class="flex justify-between">
                <div class="flex">
                  <div class="px-5">
                    <i class="fa fas fa-check-circle"></i>
                  </div>
                  <div>
                    <p class="font-bold">
                      {{ $t('contact-us.form.success') }}
                    </p>
                  </div>
                </div>
                <div
                  style="cursor:pointer"
                  @click="success=false">
                  <i class="fa fas fa-times-circle"></i>
                </div>
              </div>
            </div>
          </div>
        </transition>
        <form
          class="w-full">
          <div class="flex flex-wrap -mx-3">
            <div class="w-full md:w-1/2 px-3">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-1"
                for="name">
                {{ $t('contact-us.form.name') }}
              </label>
              <input
                id="name"
                v-model="name"
                :placeholder="$t('contact-us.form.name_placeholder')"
                :class="{ 'border-red' : errors.name !== undefined }"
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                type="text">
              <p
                v-if="errors.name !== undefined"
                class="text-red text-xs italic -mt-2">{{ errors.name }}</p>
            </div>
            <div class="w-full md:w-1/2 px-3">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-1"
                for="email">
                {{ $t('contact-us.form.email') }}
              </label>
              <input
                id="email"
                v-model="email"
                :placeholder="$t('contact-us.form.email_placeholder')"
                :class="{ 'border-red' : errors.email !== undefined }"
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-grey"
                type="text">
              <p
                v-if="errors.email !== undefined"
                class="text-red text-xs italic -mt-2">{{ errors.email }}</p>
            </div>
          </div>
          <div class="flex flex-wrap -mx-3">
            <div class="w-full px-3">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-1"
                for="subject">
                {{ $t('contact-us.form.subject') }}
              </label>
              <input
                id="subject"
                v-model="subject"
                :placeholder="$t('contact-us.form.subject_placeholder')"
                :class="{ 'border-red' : errors.subject !== undefined }"
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-grey"
                type="text">
              <p
                v-if="errors.subject !== undefined"
                class="text-red text-xs italic -mt-2">{{ errors.subject }}</p>
            </div>
          </div>
          <div class="flex flex-wrap -mx-3 mb-4">
            <div class="w-full px-3">
              <label
                class="block uppercase tracking-wide text-grey-darker text-xs font-bold mb-1"
                for="content">
                {{ $t('contact-us.form.content') }}
              </label>
              <textarea
                id="content"
                v-model="content"
                :placeholder="$t('contact-us.form.content_placeholder')"
                :class="{ 'border-red' : errors.content !== undefined }"
                class="appearance-none block w-full bg-grey-lighter text-grey-darker border rounded py-3 px-4 mb-2 leading-tight focus:outline-none focus:bg-white focus:border-grey"
                style="height: 12em">
              </textarea>
              <p
                v-if="errors.content !== undefined"
                class="text-red text-xs italic -mt-2">{{ errors.content }}</p>
            </div>
          </div>
          <!-- <div class="flex flex-wrap -mx-3 mb-6">
            <div class="px-3">
              <no-ssr>
                <vue-recaptcha
                  ref="reCaptcha"
                  :sitekey="$env.reCaptchaKey"
                  @verify="reCaptchaVerify"
                ></vue-recaptcha>
                <script
                  src="https://www.google.com/recaptcha/api.js?onload=vueRecaptchaApiLoaded&render=explicit"
                  async
                  defer>
                </script>
              </no-ssr>
              <p
                v-if="errors.reCaptcha !== undefined"
                class="text-red text-xs italic mt-0">{{ errors.reCaptcha }}</p>
            </div>
          </div> -->
          <div class="flex flex-wrap justify-end">
            <div class="button button-primary">
              <div class="button-icon">
                <i
                  v-if="loading"
                  class="fa fas fa-sync fa-spin"></i>
                <i
                  v-else
                  class="fa fas fa-check-circle"></i>
              </div>
              <div
                class="button-text"
                @click="submit">
                {{ $t('contact-us.form.submit') }}
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
//import VueRecaptcha from 'vue-recaptcha';
export default {
  head () {
    return {
      title: this.$t('contact-us.title'),
      meta: [
        {name: 'description', content: this.$t('contact-us.description')},
        {property: 'og:title', content: this.$t('contact-us.title')},
        {property: 'og:description', content: this.$t('contact-us.description')},
        {property: 'og:image', content: 'https://s.werobot.fr/logo.png'},
      ]
    }
  },
  //components: { VueRecaptcha },
  data () {
    return {
      errors: {},
      name: '',
      email: '',
      subject: '',
      content: '',
      reCaptchaCode: '',
      loading: false,
      success: false
    }
  },
  methods: {
    submit: function () {
      this.success = false;
      this.errors = {};
      if (this.name.length < 4) {
        this.errors.name = this.$t('contact-us.form.not-enough-length')
      }
      if (this.subject.length < 4) {
        this.errors.subject = this.$t('contact-us.form.not-enough-length')
      }
      if (this.content.length < 8) {
        this.errors.content = this.$t('contact-us.form.not-enough-length')
      }
      if (this.name === '') {
        this.errors.name = this.$t('contact-us.form.field_required')
      }
      if (this.email === '') {
        this.errors.email = this.$t('contact-us.form.field_required')
      }
      if (this.subject === '') {
        this.errors.subject = this.$t('contact-us.form.field_required')
      }
      if (this.content === '') {
        this.errors.content = this.$t('contact-us.form.field_required')
      }
      // if (this.reCaptchaCode === '') {
      //   this.errors.reCaptcha = this.$t('contact-us.form.recaptcha_required')
      // }
      let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      if (this.email !== '' && !re.test(this.email.toLowerCase())){
        this.errors.email = this.$t('contact-us.form.invalid_email')
      }
      if (Object.keys(this.errors).length === 0) {
        this.loading = true;
        //location.hash = "#ls";
        this.$axios.post('https://contact-form.werobot.fr/werobot', {
          name: this.name,
          email: this.email,
          subject: this.subject,
          message: this.content
        }).then(() => {
          this.loading = false;
          this.name = "";
          this.email = "";
          this.subject = "";
          this.content = "";
          // this.reCaptchaCode = "";
          // this.$refs.reCaptcha.reset();
          this.success = true
        }).catch((err) => {
          this.loading = false;
          console.log(err)
        })
      }
    },
    // reCaptchaVerify: function (code) {
    //   this.reCaptchaCode = code
    // }
  }
}
</script>
