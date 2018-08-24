<template>
    <div class="menuBar">
      <b-button @click="addTable">
        <font-awesome-icon icon="table" />
      </b-button>
    </div>
</template>

<script>
  import storeERD from '../../store/erd'

  export default {
      name: 'TopMenu',
      methods: {
        // 테이블 추가
        addTable: function() {
          storeERD.commit({type: 'addTable'})
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
    background-color: #fff;
    clear: both;
    box-sizing: border-box;
    /*height: 42px;*/
    margin: 0 auto;
    box-shadow: 0px 1px 6px #bcbcbc;
    z-index: 100;
  }
</style>
