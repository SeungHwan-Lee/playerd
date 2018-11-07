<template lang="pug">
  svg#svg_canvas
    path.test(v-for="line in toLines" :d="line.points" stroke-dasharray="10,10" stroke-width="3" stroke="#dda8b1" fill="transparent")
</template>

<script>
  import storeERD from '@/store/erd'
  import {getLineXY} from '@/js/common'

  export default {
    name: "CanvasSvg",
    data() {
      return {
        lines: storeERD.state.lines
      }
    },
    computed: {
      toLines() {
        const lines = []
        this.lines.forEach(v => {
          lines.push({
            id: v.id,
            points: getLineXY(v)
          })
        })
        return lines
      }
    }
  }
</script>

<style lang="scss" scoped>
  #svg_canvas {
    width: 5000px;
    height: 5000px;
    position: absolute;
  }
</style>
