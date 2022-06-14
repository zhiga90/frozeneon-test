<template lang="pug">
  .footer-block
    b-container
      .py-2
        | I'm
        a.ml-1(href="https://github.com/zhiga90/frozeneon-test" target="_blank") here
        | . Telegram: @zhiga90
</template>

<script>
export default {
  name: 'LayoutDefaultFooter',
}
</script>

<style scoped lang="sass">
.footer-block
  background: #ddd
  border-top: solid 1px #ccc
</style>
