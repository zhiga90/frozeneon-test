<template lang="pug">
  b-modal(
    :title="name"
    scrollable
    ok-only
    ok-title="Close"
    visible
    @hidden="$emit('close')"
  )
</template>

<script>
export default {
  name: 'SearchResultsMore',

  data() {
    return {
      name: '',
    }
  },

  mounted() {
    this.$router.onReady(() => {
      this.name = this.$route.query.n
    })
  },
}
</script>

<style scoped lang="sass">

</style>
