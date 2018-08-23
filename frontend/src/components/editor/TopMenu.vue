<template>
    <div class="menuBar">
      <button class="menuBar_btn" @click="addTable">
        <i class="fas fa-table"></i>
      </button>
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

<style scoped>
  .menuBar {
    display: flex;
    justify-content: space-between;
    max-width: 800px;
    min-width: 800px;
    padding: 5px 10px;
    background-color: #fff;
    clear: both;
    box-sizing: border-box;
    height: 42px;
    margin: 0 auto;
    box-shadow: 0px 1px 6px #bcbcbc;
    z-index: 100;
  }
  .menuBar_btn{
    height: 100%;
    width: 32px;
    border: 1px solid #ddd;
    border-radius: 3px;
    background-color: #f6f6f6;
    cursor: pointer;
    box-sizing: border-box;
    color: #000;
    cursor:pointer;
  }
</style>
