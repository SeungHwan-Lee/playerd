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
            <div class="erd_column" v-for="column in table.columns" :key="column.id">
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
        tables: storeERD.state.tables
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
  /* rainbow color */
  $ts-red: #660000;
  $ts-orange: #664200;
  $ts-yellow: #666600;
  $ts-greenyellow: #3d6600;
  $ts-green: #006600;
  $ts-dodgerblue: #003366;
  $ts-blue: #000066;
  $ts-purple: #660066;

  .erd_table {
    width: 672px;
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
        color: $key-fk;
      }
      .fk {
        color: $key-fk;
      }
      .pfk {
        color: $key-pfk;
      }
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

  /* rainbow animation */
  @mixin rainbow() {
    //background: repeating-linear-gradient(-45deg,#330000 0%, #333300 7.14%, #003300 14.28%, #003333 21.42%, #003333 28.56%, #000033 35.7%, #330033 42.84%, #330000 50%);
    //background: repeating-linear-gradient(-45deg,#1a0000 0%, #1a1a00 7.14%, #001a00 14.28%, #001a1a 21.42%, #001a1a 28.56%, #00001a 35.7%, #1a001a 42.84%, #1a0000 50%);
    //background-size:600vw 600vw;
    animation: slide 10s infinite linear forwards;
  }

  @keyframes slide {
    0% {
      //background-position-x: 0;
      border: solid $ts-red 1px;
      box-shadow: 0 1px 6px $ts-red;
    }
    12.5% {
      border: solid $ts-orange 1px;
      box-shadow: 0 1px 6px $ts-orange;
    }
    25% {
      border: solid $ts-yellow 1px;
      box-shadow: 0 1px 6px $ts-yellow;
    }
    37.5% {
      border: solid $ts-greenyellow 1px;
      box-shadow: 0 1px 6px $ts-greenyellow;
    }
    50% {
      border: solid $ts-green 1px;
      box-shadow: 0 1px 6px $ts-green;
    }
    62.5% {
      border: solid $ts-dodgerblue 1px;
      box-shadow: 0 1px 6px $ts-dodgerblue;
    }
    75% {
      border: solid $ts-blue 1px;
      box-shadow: 0 1px 6px $ts-blue;
    }
    87.5% {
      border: solid $ts-purple 1px;
      box-shadow: 0 1px 6px $ts-purple;
    }
    100% {
      //background-position-x: 600vw;
      border: solid $ts-red 1px;
      box-shadow: 0 1px 6px $ts-red;
    }
  }

  /* 테이블 선택시 */
  .erd_table.selected {
    border: solid $ts 1px;
    box-shadow: 0 1px 6px $ts;
    //@include rainbow;
  }

</style>
