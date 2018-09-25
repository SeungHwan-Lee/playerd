<template>
  <div>
    <div class="erd_table" :class="{ selected: table.option.selected}"
         v-for="table in tables"
         :key="table.id"
         @mousedown="tableSelected(table.id)">
      <div class="erd_table_top"></div>
      <div class="erd_table_header">
        <input type="text" placeholder="table" v-model="table.name"/>
        <b-button variant="outline-primary" @click="addColumn(table.id)">
          <font-awesome-icon icon="plus"/>
        </b-button>
        <b-button variant="outline-danger" @click="deleteTable(table.id)">
          <font-awesome-icon icon="times"/>
        </b-button>
      </div>
      <draggable v-model="table.columns" :options="{group:'table'}">
        <div class="erd_column" v-for="column in table.columns" :key="column.id">
          <div>
            <div class="erd_column_key"><font-awesome-icon icon="key"/></div>
            <input type="text" placeholder="column" v-model="column.name"/>
            <data-type :tableId="table.id" :columnId="column.id"></data-type>
            <input class="erd_column_not_null" type="text" readonly value="NULL" @click="changeNull(table.id, column.id)" v-if="column.isNull"/>
            <input class="erd_column_not_null" type="text" readonly value="N-N" @click="changeNull(table.id, column.id)" v-else/>
            <input type="text" placeholder="comment" v-model="column.comment"/>
            <b-button variant="outline-danger" @click="deleteColumn(table.id, column.id)">
              <font-awesome-icon icon="times"/>
            </b-button>
          </div>
        </div>
      </draggable>
    </div>
  </div>
</template>

<script>
  import storeERD from '@/store/erd'
  import DataType from './DataType'
  import draggable from 'vuedraggable'

  export default {
    name: 'MainCanvas',
    components: {
      DataType,
      draggable
    },
    data() {
      return {
        tables: storeERD.state.tables,
        tableCheck: false
      }
    },
    methods: {
      // 컬럼 추가
      addColumn(id) {
        JSLog('MainCanvas', 'addColumn', id)
        storeERD.commit({
          type: 'addColumn',
          id: id
        })
      },
      // 컬럼 삭제
      deleteColumn(tableId, columnId) {
        JSLog('MainCanvas', 'deleteColumn', tableId, columnId)
        storeERD.commit({
          type: 'deleteColumn',
          tableId: tableId,
          columnId: columnId
        })
      },
      // NULL 조건 변경
      changeNull(tableId, columnId) {
        storeERD.commit({
          type: 'changeNull',
          tableId: tableId,
          columnId: columnId
        })
      },
      // 테이블 삭제
      deleteTable(id) {
        JSLog('MainCanvas', 'deleteTable', id)
        storeERD.commit({
          type: 'deleteTable',
          id: id
        })
      },
      // 테이블 선택
      tableSelected(id) {
        JSLog('MainCanvas', 'tableSelected', id)
        storeERD.commit({
          type: 'tableSelected',
          ids: [id]
        })
      }
    },
    watch: {
      tables() {
        this.tableCheck = true
      }
    },
    updated() {
      if (this.tableCheck) {
        $('.erd_table').draggable()
        this.tableCheck = false
      }
    }
  }

</script>

<style lang="scss" scoped>
  .erd_table {
    width: 672px;
    position: absolute;
    box-sizing: border-box;
    background-color: #191919;
    opacity: 0.9;
    cursor: move;
    padding: 10px;

    .erd_table_top {
      height: 15px;
    }

    .erd_table_header {
      box-sizing: border-box;
      margin-bottom: 15px;

      button, input {
        margin-right: 5px;
      }
      input {
        width: 83%;
        height: 100%;
        font-size: 20px;
      }
    }

    .erd_column {
      overflow: hidden;

      input, div {
        float: left;
        margin-right: 10px;
        margin-bottom: 2px;
      }
      .erd_column_not_null {
        width: 45px;
        cursor: pointer;
      }
      button {
        padding: 0;
        width: 25px;
        height: 25px;
      }
      .erd_column_key {
        width: 16px;
      }
    }

  }
  .erd_table.selected {
    border: solid #14496d 1px;
    box-shadow: 0 1px 6px #14496d;
  }
</style>
