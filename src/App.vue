<template lang="pug">
  component.layout(:is="`layout-${layout}`")
    router-view.route-view
</template>

<script>
import { mapGetters } from 'vuex'
import LayoutDefault from '@/components/layouts/LayoutDefault'

export default {
  name: 'App',
  components: {
    LayoutDefault,
  },

  computed: {
    ...mapGetters('ui', ['layout']),
  },
}
</script>

<style lang="sass">
</style>
