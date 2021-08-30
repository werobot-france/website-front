<template>
  <div class="contact-card">
    <div
      :style="'background-image: url(\'' + avatarUrl + '\')'"
      class="contact-card-left"
    >
    </div>
    <div class="contact-card-right">
      <div class="contact-card-title">{{ name }}</div>
      <ul class="contact-methods">
        <li class="contact-method">
          <div class="contact-method-icon">
            <i class="fa fas fa-phone"></i>
          </div>
          <no-ssr>
            <div class="contact-method-description">
              <a :href="'telto:' + getPhone()">
                {{ getPhone(true) }}
              </a>
            </div>
          </no-ssr>
        </li>
        <li class="contact-method">
          <div class="contact-method-icon">
            <i class="fa fas fa-at"></i>
          </div>
          <div class="contact-method-description">
            <a :href="'mailto:' + email">
              {{ email }}
            </a>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactCard',
  props: {
    avatarUrl: { type: String, default: '' },
    name: { type: String, default: '' },
    phone: { type: Array, default: () => { return [] } },
    email: { type: String, default: '' }
  },
  methods: {
    getPhone (formatted = false) {
      let phone = Buffer.from(this.phone.join(''), 'base64').toString('utf-8')
      if (formatted) {
        // TODO: handle non french formats
        let out = ''
        let tmp = phone.replace('+33', '')
        for (let i = 0; i < tmp.length; i++) {
          out += tmp[i]
          if (i%2 == 0) {
            out += ' '
          }
        }
        return '0' + out
      }
      return phone
    }
  }
}
</script>