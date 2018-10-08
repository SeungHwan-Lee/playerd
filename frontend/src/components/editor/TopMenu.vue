<template lang="pug">
  .menuBar
    b-button(@click="addTable")
      font-awesome-icon(icon="table")
    .dbType
      basic-select(placeholder="DB type" :options="options" :selected-option="item" @select="selectDB")
</template>

<script>
  import storeERD from '../../store/erd'
  import {BasicSelect} from 'vue-search-select'

  export default {
    name: 'TopMenu',
    components: {
      BasicSelect
    },
    data() {
      return {
        item: {
          value: 'mysql5.7',
          text: 'MySQL 5.7'
        }
      }
    },
    computed: {
      options() {
        return storeERD.state.DBTypes
      }
    },
    methods: {
      // 테이블 추가
      addTable: function () {
        JSLog('TopMenu', 'addTable')
        storeERD.commit({type: 'addTable'})
      },
      // DB 선택
      selectDB(item) {
        JSLog('TopMenu', 'selectDB')
        JSLog('to', item)
        this.item = item
      }
    },
    watch: {
      item(val) {
        storeERD.commit({
          type: 'changeDB',
          DBType: val.value
        })
      }
    }
  }
</script>

<style lang="scss" scoped>
  .menuBar {
    display: flex;
    position: fixed;
    justify-content: space-between;

    left: 50%;
    margin-left: -400px;
    min-width: 800px;
    background-color: #434343;
    box-sizing: border-box;
    z-index: 100;
    opacity: 0.9;

    .dbType {
      width: 20%;
    }
  }
</style>
