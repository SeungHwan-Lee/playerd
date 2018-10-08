<template lang="pug">
  .erd
    TopMenu
    TableMenu
    MainCanvas
    SVGCanvas
</template>

<script>
  import '@/css/erd.css'
  import '@/js/ERD'
  import TopMenu from './TopMenu'
  import TableMenu from './TableMenu'
  import MainCanvas from './MainCanvas'
  import SVGCanvas from './SVGCanvas'

  export default {
    name: 'ERD',
    components: {
      TopMenu,
      TableMenu,
      MainCanvas,
      SVGCanvas
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  body {
    font-family: 'Noto Sans', sans-serif;
    line-height: 1;

    font-size: 12px;
  }

  .erd {
    display: flex;
    flex-direction: column;
    width: 5000px;
    height: 100%;
    z-index: 2;
    background-color: #282828;
  }
</style>
