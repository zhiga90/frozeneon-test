<template lang="pug">
  b-navbar(type="dark" variant="info")
    b-container
      b-navbar-nav.w-100.justify-content-center
        b-nav-form(@submit.prevent="toRoute")
          b-input-group
            b-form-input.search-input(
              v-model="searchValue"
              @input="searchInputed"
              size="sm"
              placeholder="Enter packet name"
              clearable
            )
            b-input-group-append.search-buttons
              b-button.search-clear(size="sm" variant="outline" @click="clear") X
              b-button(type="submit" size="sm" variant="primary") Search

        b-nav-item-dropdown.ml-3(right)
          template(#button-content)
            span Results on page:
            span.per-page-label {{ perPage }}
          b-dropdown-item(
            v-for="(pp, index) in perPageEnum"
            :key="'pp' + index"
            @click="perPageClicked(pp)"
          ) {{pp}}
</template>

<script>
import { mapActions } from 'vuex'

export default {
  name: 'LayoutDefaultTopBar',

  data() {
    return {
      searchValue: '',
      timer: null,
      searchDelay: 300,
      perPage: 10,
      perPageEnum: [10, 25, 50, 100],
    }
  },

  mounted() {
    this.$router.onReady(() => {
      this.searchValue = this.$route.query.t || ''
      this.perPage = this.$route.query.pp || 10
    })
  },
  beforeDestroy() {
    this.clearTimer()
  },

  methods: {
    ...mapActions('search', ['toSearchResults']),
    clear() {
      if (this.searchValue) {
        this.searchValue = ''
        this.toRoute()
      }
    },
    clearTimer() {
      clearTimeout(this.timer)
    },
    searchInputed() {
      if (this.timer) this.clearTimer()
      this.timer = setTimeout(this.toRoute, this.searchDelay)
    },
    perPageClicked(perPage) {
      if (perPage !== this.perPage) {
        this.perPage = perPage
        this.clearTimer()
        this.toRoute()
      }
    },
    toRoute() {
      this.toSearchResults({ text: this.searchValue, page: 1, perPage: this.perPage })
    },
  },
}
</script>

<style scoped lang="sass">
@import '~bootstrap/scss/functions'
@import '~bootstrap/scss/variables'

.per-page-label
  display: inline-block
  width: 40px
  text-align: center
.search
  &-input
    padding-right: 33px
  &-buttons
    margin-left: -25px
  &-clear
    z-index: 4 !important
    color: $gray-600
</style>
