<template lang="pug">
  svg#svg_canvas
    g(v-for="data in toLines" :key="data.id")
      // start draw
      line(:x1="data.path.line.start.x1" :y1="data.path.line.start.y1" :x2="data.path.line.start.x2" :y2="data.path.line.start.y2" :stroke="data.isIdentification ? '#60b9c4' : '#dda8b1'" stroke-width="3")
      path(:d="data.path.path" :stroke="data.isIdentification ? '#60b9c4' : '#dda8b1'" :stroke-dasharray="data.isIdentification ? 0 : 10" stroke-width="3" fill="transparent")
      line(:x1="data.line.start.x1" :y1="data.line.start.y1" :x2="data.line.start.x2" :y2="data.line.start.y2" :stroke="data.isIdentification ? '#60b9c4' : '#dda8b1'" stroke-width="3")
      // end draw
      line(v-if="data.isDraw" :x1="data.path.line.end.x1" :y1="data.path.line.end.y1" :x2="data.path.line.end.x2" :y2="data.path.line.end.y2" :stroke="data.isIdentification ? '#60b9c4' : '#dda8b1'" stroke-width="3")
      circle(v-if="data.isDraw" :cx="data.circle.cx" :cy="data.circle.cy" r="10" :stroke="data.isIdentification ? '#60b9c4' : '#dda8b1'" fill-opacity="0.0" stroke-width="3")
      line(v-if="data.isDraw" :x1="data.line.end.base.x1" :y1="data.line.end.base.y1" :x2="data.line.end.base.x2" :y2="data.line.end.base.y2" :stroke="data.isIdentification ? '#60b9c4' : '#dda8b1'" stroke-width="3")
      line(v-if="data.isDraw && data.type === 'erd-0-1-N'" :x1="data.line.end.left.x1" :y1="data.line.end.left.y1" :x2="data.line.end.left.x2" :y2="data.line.end.left.y2" :stroke="data.isIdentification ? '#60b9c4' : '#dda8b1'" stroke-width="3")
      line(v-if="data.isDraw" :x1="data.line.end.center.x1" :y1="data.line.end.center.y1" :x2="data.line.end.center.x2" :y2="data.line.end.center.y2" :stroke="data.isIdentification ? '#60b9c4' : '#dda8b1'" stroke-width="3")
      line(v-if="data.isDraw && data.type === 'erd-0-1-N'" :x1="data.line.end.right.x1" :y1="data.line.end.right.y1" :x2="data.line.end.right.x2" :y2="data.line.end.right.y2" :stroke="data.isIdentification ? '#60b9c4' : '#dda8b1'" stroke-width="3")
</template>

<script>
  import storeERD from '@/store/editor/erd'
  import {convertLine} from '@/js/editor/common'

  export default {
    name: "CanvasSvg",
    data() {
      return {
        lines: storeERD.state.lines
      }
    },
    computed: {
      toLines() {
        const data = []
        this.lines.forEach(v => {
          data.push(convertLine(v))
        })
        return data
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
