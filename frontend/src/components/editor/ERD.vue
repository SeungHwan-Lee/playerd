<template>
  <div>
    <top-menu />
    <main-canvas />
  </div>
</template>

<script>
  import TopMenu from './TopMenu'
  import MainCanvas from './MainCanvas'

  export default {
    name: 'ERD',
    components: {
      MainCanvas,
      TopMenu
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  body {
    background-color: #F1F3F5;
    font-family: 'Noto Sans', sans-serif;
    line-height: 1;

    font-size: 12px;
  }
</style>
