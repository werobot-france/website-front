<template>
  <div>{{ result }}</div>
</template>
<script>
import Moment from "moment";

export default {
  name: 'FromNow',
  props: {
    value: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      result: ''
    }
  },
  mounted () {
    Moment.locale(this.$cookie.get('locale'));
    this.result = Moment(this.value).fromNow()
  }
}
</script>