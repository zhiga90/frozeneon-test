<template lang="pug">
  .search-results-view.py-3.position-relative
    .is-loading(v-if="isLoading").py-3
      b-spinner(variant="primary")
    .error.text-danger.text-center(v-if="error") {{ typeof error === 'string' ? error : 'Something went wrong' }}
    .items(v-else)
      .no-items(v-if="!items.length")
      .items-list(v-else)
        .item(
          v-for="(item, index) in items"
          :key="'item' + index"
        )
          search-results-row(v-if="item.package" v-bind="item.package")
</template>

<script>
import SearchResultsRow from './SearchResultsRow'

export default {
  name: 'SearchResultsView',
  components: { SearchResultsRow },

  data() {
    return {
      isLoading: true,
      routerIsReady: true,
      error: false,
      items: [],
    }
  },

  mounted() {
    this.$router.onReady(() => {
      this.routerIsReady = true
      this.search()
    })
  },

  watch: {
    $route() {
      if (this.routerIsReady) this.search()
    },
  },

  methods: {
    async search() {
      const query = this.$route.query
      if (query.t && query.t.length === 1) {
        this.error = 'More than 1 symbol is needed for search.'
        this.isLoading = false
      } else {
        this.error = false
        this.isLoading = true
      }
      try {
        const result = await this.$npmSearchAPI.search(query.t, query.p, query.pp)
        this.items = result.data.objects
      } catch (e) {
        this.error = true
      } finally { this.isLoading = false }
    },
  },
}
</script>

<style scoped lang="sass">
.is-loading
  position: absolute
  top: 0
  left: 0
  right: 0
  bottom: 0
  display: flex
  justify-content: center
  background: rgba(white, 0.7)
</style>
