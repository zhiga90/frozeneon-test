<template lang="pug">
  .layout-default.flex-column
    .main-navbar.flex-thin(v-if="isTopBar")
      LayoutDefaultTopBar
    .main-wrap.flex-stretch
      b-container(:fluid="!isLayoutContainer")
        slot
    .main-footer.flex-thin(v-if="isFooter")
      LayoutDefaultFooter
</template>

<script>
import { mapGetters } from 'vuex'
import LayoutDefaultTopBar from '@/components/layouts/LayoutDefaultTopBar'
import LayoutDefaultFooter from '@/components/layouts/LayoutDefaultFooter'

export default {
  name: 'LayoutDefault',
  components: {
    LayoutDefaultTopBar, LayoutDefaultFooter,
  },

  computed: {
    ...mapGetters('ui', ['isTopBar', 'isFooter', 'isLayoutContainer']),
  },
}
</script>

<style scoped lang="sass">

</style>
