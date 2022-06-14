<template lang="pug">
  .home-view
    b-jumbotron.jumbo(fluid header="Frozeneon test assignments" lead="Please enter text in input to search npm packages")
      p For more information please hire me
      b-button.mr-2(variant="primary" href="https://github.com/zhiga90/frozeneon-test") Repository
      b-button(variant="info" href="https://docs.google.com/document/d/1DxR5ZAflS9k5mCEGrQwynPT78TW2OSZTHcARBVTxRAQ/edit") Docs
</template>

<script>
export default {
  name: 'HomeView',
}
</script>

<style scoped lang="sass">
.jumbo
  h1
    font-size: 3.5rem
</style>
