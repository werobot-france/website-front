import Vue from 'vue'

Vue.prototype.$env = {
  apiEndpoint: process.env.apiEndpoint,
  socials: {
    facebook: process.env.facebook,
    instagram: process.env.instagram,
    //youtube: process.env.youtube,
    twitter: process.env.twitter,
    github: process.env.github
  },
  donate: process.env.donate,
  reCaptchaKey: process.env.reCaptchaKey
};
