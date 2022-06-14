<template lang="pug">
  b-modal(
    :title="name"
    scrollable
    hide-footer
    visible
    @hidden="$emit('close')"
  )
    .py-3.w-100.text-center(v-if="isLoading")
      b-spinner(variant="primary")
    .error.text-danger.text-center(v-else-if="error") {{ typeof error === 'string' ? error : 'Something went wrong' }}
    .npm-package(v-else)
      b-card.npm-package-card.mb-2(
        v-for="(version, versionIndex) in versions"
        :key="'version' + versionIndex"
        border-variant="dark"
      )
        template(#header)
          .npm-package-header(
            @click="toggleVersion(version)"
            :class="{ active: version.isVisible }"
          ) {{version.num}}
        b-collapse(
          :id="'version' + versionIndex"
          v-model="version.isVisible"
        )
          .p-2
            .w-100.text-center(v-if="version.isLoading")
              b-spinner(variant="dark")
            pre(v-else) {{version.data}}

</template>

<script>
export default {
  name: 'SearchResultsMore',

  data() {
    return {
      isLoading: true,
      isLoadingVersion: true,
      routerIsReady: true,
      error: false,
      errorVersion: false,
      name: '',
      versions: [],
    }
  },

  mounted() {
    this.$router.onReady(() => {
      this.name = this.$route.query.n
      this.getData()
    })
  },

  methods: {
    async getData() {
      this.error = false
      this.isLoading = true
      try {
        const result = await this.$jsDelivrAPI.getNPMPack(this.name)
        this.versions = result.data.versions.map(item => ({
          num: item,
          isVisible: false,
          isLoading: false,
          versionData: {},
        }))
      } catch (e) {
        this.error = true
      } finally { this.isLoading = false }
    },
    async toggleVersion(version) {
      version.isVisible = !version.isVisible
      if (version.isVisible) {
        version.isLoading = true
        try {
          const result = await this.$jsDelivrAPI.getNPMPack(this.name + '@' + version.num)
          version.data = result.data
        } finally {
          version.isLoading = false
        }
      } else {
        version.isLoading = false
      }
    },
  },
}
</script>

<style scoped lang="sass">
@import '~bootstrap/scss/functions'
@import '~bootstrap/scss/variables'

.npm-package
  &-card
    .card-header
      padding: 0
    .card-body
      padding: 0
  &-header
    padding: 8px 16px
    cursor: pointer
    text-align: center
    &:hover
      background: $gray-200
    &.active
      background: $gray-800
      color: white
    &.active:hover
      background: $gray-600
</style>
