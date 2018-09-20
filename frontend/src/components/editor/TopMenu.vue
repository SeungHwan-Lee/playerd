<template>
  <div class="menuBar">
    <b-button @click="addTable">
      <font-awesome-icon icon="table"/>
    </b-button>
    <basic-select :options="options"
                  :selected-option="item"
                  placeholder="DB type"
                  @select="onSelect">
    </basic-select>
  </div>
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
        storeERD.commit({type: 'addTable'})
      },
      onSelect(item) {
        this.item = item
      }
    },
    watch: {
      item(val, oldVal) {
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
    justify-content: space-between;
    max-width: 800px;
    min-width: 800px;
    /*padding: 5px 10px;*/
    background-color: #434343;
    clear: both;
    box-sizing: border-box;
    /*height: 42px;*/
    margin: 0 auto;
    /*box-shadow: 0px 1px 6px #bcbcbc;*/
    z-index: 100;
    opacity: 0.9;
  }

  .ui.fluid.dropdown {
    width: 20%;
  }
</style>
