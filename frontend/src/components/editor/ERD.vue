<template lang="pug">
  .erd
    top-menu
    table-menu
    canvas-menu
    canvas-main
    canvas-svg
</template>

<script>
  import '@/css/erd.css'
  import '@/js/ERD'
  import TopMenu from './TopMenu'
  import TableMenu from './TableMenu'
  import CanvasMenu from './CanvasMenu'
  import CanvasMain from './CanvasMain'
  import CanvasSvg from './CanvasSvg'

  export default {
    name: 'ERD',
    components: {
      TopMenu,
      TableMenu,
      CanvasMenu,
      CanvasMain,
      CanvasSvg
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
