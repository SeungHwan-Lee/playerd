<template>
  <div>
    <transition-group name="slide-fade" tag="div">
      <div class="erd_table"
           :class="{ selected: table.ui.selected}"
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
          <transition-group name="slide-fade" tag="div">
            <div class="erd_column"
                 v-for="column in table.columns" :key="column.id"
                 :class="{ selected: column.ui.selected}"
                 @mousedown="columnSelected(table.id, column.id)">
              <div>

                <div class="erd_column_key"
                     :class="{ pk: column.ui.key.pk, fk: column.ui.key.fk, pfk: column.ui.key.pfk }">
                  <font-awesome-icon icon="key"/>
                </div>
                <input type="text" placeholder="column" v-model="column.name"/>
                <data-type :tableId="table.id" :columnId="column.id"></data-type>
                <input class="erd_column_not_null" type="text" readonly value="NULL"
                       @click="changeNull(table.id, column.id)" v-if="column.isNull"/>
                <input class="erd_column_not_null" type="text" readonly value="N-N"
                       @click="changeNull(table.id, column.id)" v-else/>
                <input type="text" placeholder="comment" v-model="column.comment"/>
                <b-button variant="outline-danger" @click="deleteColumn(table.id, column.id)">
                  <font-awesome-icon icon="times"/>
                </b-button>

              </div>
            </div>
          </transition-group>
        </draggable>

      </div>
    </transition-group>
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
        onlyTableSelected: true
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
          id: id,
          onlyTableSelected: this.onlyTableSelected
        })
        this.onlyTableSelected = true
      },
      // 컬럼 선택
      columnSelected(tableId, columnId) {
        JSLog('MainCanvas', 'columnSelected', tableId, columnId)
        storeERD.commit({
          type: 'columnSelected',
          tableId: tableId,
          columnId: columnId
        })
        this.onlyTableSelected = false
      }
    },
    updated() {
      $('.erd_table').draggable()
    }
  }

</script>

<style lang="scss" scoped>
  $tbg: #191919;
  $ts: #14496d;
  /* column key color */
  $key-pk: #666600;
  $key-fk: #ff6680;
  $key-pfk: #003366;

  .erd_table {
    width: 674px;
    position: absolute;
    box-sizing: border-box;
    background-color: $tbg;
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

      /* column key */
      .erd_column_key {
        width: 16px;
        color: $tbg;
      }
      .pk {
        color: $key-pk;
      }
      .fk {
        color: $key-fk;
      }
      .pfk {
        color: $key-pfk;
      }

      /* 컬럼 선택시 */
      &.selected {
        border: solid #383d41 1px;
      }
    }

    /* 테이블 선택시 */
    &.selected {
      border: solid $ts 1px;
      box-shadow: 0 1px 6px $ts;
    }
  }

  /* table,column 추가,삭제 animation */
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .4s ease-out;
  }
  .slide-fade-enter, .slide-fade-leave-to {
    transform: translateX(10px);
    opacity: 0;
  }
</style>
