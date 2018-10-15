<template lang="pug">
  #erd
    table-menu
    canvas-menu
    canvas-main
    canvas-svg
</template>

<script>
  import '@/css/erd.css'
  import '@/js/ERD'
  import TableMenu from './TableMenu'
  import CanvasMenu from './CanvasMenu'
  import CanvasMain from './CanvasMain'
  import CanvasSvg from './CanvasSvg'

  export default {
    name: 'ERD',
    components: {
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

  #erd {
    display: flex;
    flex-direction: column;
    width: 5000px;
    height: 5000px;
    z-index: 2;
    background-color: #282828;
  }
</style>
