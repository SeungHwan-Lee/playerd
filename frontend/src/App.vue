<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import '@/js/JSLog'

  export default {
    name: 'App'
  }
</script>

<style lang="scss">
  * {
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Noto Sans', sans-serif;
    line-height: 1;
  }

  h1, h2, h3, h4, h5, h6 {
    font-size: 100%;
  }

  ol, ul, li {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  img {
    border: none;
  }
</style>
