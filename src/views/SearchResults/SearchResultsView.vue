<template lang="pug">
  .search-results-view.py-3.position-relative
    .is-loading(v-if="isLoading").py-3
      b-spinner(variant="primary")
    .error.text-danger.text-center(v-if="error") {{ typeof error === 'string' ? error : 'Something went wrong' }}
    .items(v-else)
      .no-items(v-if="!items.length")
        .text-center.search-string For search string "{{$route.query.t}}"
        .text-center.pt-2 No items found
      .items-list(v-else)
        .item(
          v-for="(item, index) in items"
          :key="'item' + index"
        )
          search-results-row(v-if="item.package" v-bind="item.package")

        b-pagination(
          v-model="page"
          :total-rows="total"
          :per-page="perPage"
          align="center"
          @change="toPage"
        )
</template>

<script>
import SearchResultsRow from './SearchResultsRow'
import { mapActions } from 'vuex'

export default {
  name: 'SearchResultsView',
  components: { SearchResultsRow },

  data() {
    return {
      isLoading: true,
      routerIsReady: true,
      error: false,
      items: [],
      page: 1,
      total: 0,
      perPage: 0,
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
    ...mapActions('search', ['toSearchResults']),
    toPage(page) {
      const { query } = this.$route
      const searchParams = {
        text: query.t,
        page,
        perPage: query.pp,
      }
      this.toSearchResults(searchParams)
    },
    async search() {
      const query = this.$route.query
      if (query.t && query.t.length === 1) {
        this.error = 'More than 1 symbol is needed for search.'
        this.isLoading = false
      } else {
        this.error = false
        this.isLoading = true
      }
      console.log(this.isLoading)
      try {
        const result = await this.$npmSearchAPI.search(query.t, query.p, query.pp)
        this.items = result.data.objects
        this.total = result.data.total
        this.p = query.p
        this.perPage = query.pp
      } catch (e) {
        this.error = true
      } finally { this.isLoading = false }
    },
  },
}
</script>

<style scoped lang="sass">
@import '~bootstrap/scss/functions'
@import '~bootstrap/scss/variables'

.is-loading
  position: absolute
  top: 0
  left: 0
  right: 0
  bottom: 0
  display: flex
  justify-content: center
  background: rgba(white, 0.7)
.no-items
  .search-string
    color: $gray-500
</style>
