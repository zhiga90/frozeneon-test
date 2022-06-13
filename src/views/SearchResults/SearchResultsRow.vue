<template lang="pug">
  b-card.mb-2
    template(#header)
      b-row
        b-col
          h4.mb-0.srr-title {{name}}
        b-col(v-if="publisher.username" md="auto" sm="24").mt-md-0.mt-sm-2.mt-xs-2 {{publisher.username}}

    .srr-description(v-if="description" ) {{description}}
    b-button.mt-2(variant="primary" size="sm") more

</template>

<script>
export default {
  name: 'SearchResultsRow',

  props: {
    name: { type: String, required: true },
    description: { type: String },
    publisher: { type: Object, default: () => {} },
  },
}
</script>

<style scoped>

</style>
