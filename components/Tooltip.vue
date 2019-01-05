<template>
  <div>
    <div v-if="$isServer === true">
      <slot/>
    </div>
    <div
      v-tooltip.top="value"
      v-else
      @click="$router.push(to)">
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tooltip',
  props: {
    value: {
      type: String,
      default: ''
    },
    to: {
      type: String,
      default: ''
    }
  }
}
</script>
