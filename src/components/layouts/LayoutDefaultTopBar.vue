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
            @click="perPage = pp"
          ) {{pp}}
</template>

<script>
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
    this.$router.onReady(() => { this.searchValue = this.$route.query.t || '' })
  },
  beforeDestroy() {
    this.clearTimer()
  },
  watch: {
    perPage() {
      this.clearTimer()
      this.toRoute()
    },
  },

  methods: {
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
    toRoute() {
      let routeName = ''
      let query = {}
      if (!this.searchValue) {
        routeName = 'home'
      } else {
        routeName = 'search-results'
        query = {
          t: this.searchValue,
          p: 1,
          pp: this.perPage,
        }
      }
      this.$router.push({ name: routeName, query }).catch(() => {})
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
