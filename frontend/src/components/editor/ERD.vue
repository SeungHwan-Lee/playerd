<template lang="pug">
  .erd
    top-menu
    main-canvas
    table-menu
</template>

<script>
  import '@/css/erd.css'
  import '@/js/ERD'
  import TopMenu from './TopMenu'
  import TableMenu from './TableMenu'
  import MainCanvas from './MainCanvas'

  export default {
    name: 'ERD',
    components: {
      TopMenu,
      TableMenu,
      MainCanvas
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
    position: fixed;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    z-index: 2;
    background-color: #282828;
  }
</style>
