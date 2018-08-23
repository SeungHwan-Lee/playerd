<template>
  <div>
    <div v-for="table in tables" :key="table.id">
      <div>
        <input type="text" v-model="table.name"/>
        <button class="menuBar_btn" @click="addColumn(table.id)">
          <i class="fas fa-plus"></i>
        </button>
      </div>
      <div v-for="column in table.columns" :key="column.id">
        <input type="text" placeholder="column" v-model="column.name"/>
        <input type="text" placeholder="dataType" v-model="column.dataType"/>
        <input type="text" readonly value="N-N" @click="changeNull(table.id, column.id)" v-if="column.notNull"/>
        <input type="text" readonly value="NULL" @click="changeNull(table.id, column.id)" v-else/>
        <input type="text" placeholder="comment" v-model="column.comment"/>
      </div>
    </div>
  </div>
</template>

<script>
  import storeERD from '../../store/erd'

  export default {
    name: 'MainCanvas',
    computed: {
      tables () {
        return storeERD.state.tables
      }
    },
    methods: {
      // 컬럼 추가
      addColumn: function(id) {
        JSLog('MainCanvas', 'addColumn', id);
        storeERD.commit({
          type: 'addColumn',
          id: id
        })
      },
      // NULL 조건 변경
      changeNull: function(tableId, columnId) {
        let table = this.getTable(tableId)
        let column = this.getColumn(table, columnId)
        column.notNull = !column.notNull
      },
      // id -> table 반환
      getTable: function(id) {
        let len = this.tables.length
        for(let i=0; i<len; i++) {
          if(id === this.tables[i].id) {
            return this.tables[i]
          }
        }
      },
      // id -> column 반환
      getColumn: function(table, id) {
        let len = table.columns.length
        for(let i=0; i<len; i++) {
          if(id === table.columns[i].id) {
            return table.columns[i]
          }
        }
      }
    }
  }

</script>

<style scoped>
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
