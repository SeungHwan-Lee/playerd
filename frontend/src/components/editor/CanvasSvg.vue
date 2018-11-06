<template lang="pug">
  svg#svg_canvas
    path.test(v-for="line in toLines" :d="line.points" stroke-dasharray="10,10" stroke-width="3" stroke="#dda8b1" fill="transparent")
</template>

<script>
  import storeERD from '@/store/erd'

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
          const points = []
          points.push(`M${v.points[0].x} ${v.points[0].y}`)
          points.push(`Q ${(v.points[0].x + v.points[1].x) / 2} ${v.points[0].y}`)
          points.push(`${v.points[1].x} ${v.points[1].y}`)
          lines.push({
            id: v.id,
            points: points.join(' ')
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
