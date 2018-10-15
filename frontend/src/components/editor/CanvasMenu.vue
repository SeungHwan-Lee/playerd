<template lang="pug">
  div.menuCanvas
    canvas#menu_canvas(@click="menu")
    select.dbType(@change="selectDB")
      option(v-for="DBType in DBTypes" :value="DBType") {{ DBType }}
    b-button.addTable(@click="addTable")
      font-awesome-icon(icon="table")
</template>

<script>
  import storeERD from '@/store/erd'
  import menu from '@/js/THREE_menu'

  export default {
    name: 'CanvasMenu',
    data() {
      return {
        DBTypes: ['MySQL', 'Oracle'],
        menuCheck: false
      }
    },
    methods: {
      // 테이블 추가
      addTable() {
        JSLog('CanvasMenu', 'addTable')
        storeERD.commit({type: 'addTable'})
      },
      // DB 선택
      selectDB(e) {
        JSLog('CanvasMenu', 'selectDB')
        storeERD.commit({
          type: 'changeDB',
          DBType: e.target.value
        })
      },
      menu() {
        if(this.menuCheck) {
          $('.menuCanvas').children().eq(1).hide()
            .end().eq(2).hide()
        }else {
          $('.menuCanvas').children().eq(1).show()
            .end().eq(2).show()
        }
        this.menuCheck = !this.menuCheck
      }
    },
    mounted() {
      menu()
    }
  }
</script>

<style lang="scss" scoped>
  .menuCanvas {
    padding: 10px;

    #menu_canvas {
      width: 100px;
      height: 100px;
      position: fixed;
      z-index: 2147483647;
      border-radius: 50px;
      cursor: pointer;
    }
    .dbType {
      position: fixed;
      z-index: 2147483647;
      left: 110px;
      display: none;
    }
    .addTable {
      position: fixed;
      z-index: 2147483647;
      top: 40px;
      left: 110px;
      display: none;
    }
  }
</style>
