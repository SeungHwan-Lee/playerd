<template>
  <div>
    <div class="erd_table" v-for="table in tables" :key="table.id">
      <div class="erd_table_top"></div>
      <div class="erd_table_header">
        <b-container>
          <b-row>
            <b-col cols="10">
              <input type="text" placeholder="table" v-model="table.name"/>
            </b-col>
            <b-col cols="1">
              <b-button @click.prevent="addColumn(table.id)">
                <font-awesome-icon icon="plus" />
              </b-button>
            </b-col>
            <b-col cols="1">
              <b-button>
                <font-awesome-icon icon="times" />
              </b-button>
            </b-col>
          </b-row>
        </b-container>
      </div>
      <div v-for="column in table.columns" :key="column.id">
        <b-container>
          <b-row>
            <b-col cols="3">
              <input type="text" placeholder="column" v-model="column.name"/>
            </b-col>
            <b-col cols="3">
              <data-type :tableId="table.id" :columnId="column.id"></data-type>
            </b-col>
            <b-col cols="3">
              <input type="text" readonly value="NULL" @click="changeNull(table.id, column.id)" v-if="column.isNull"/>
              <input type="text" readonly value="N-N" @click="changeNull(table.id, column.id)" v-else/>
            </b-col>
            <b-col cols="3">
              <input type="text" placeholder="comment" v-model="column.comment"/>
            </b-col>
          </b-row>
        </b-container>
      </div>
    </div>
  </div>
</template>

<script>
  import storeERD from '../../store/erd'
  import drag from '../../utils/drag'
  import DataType from './DataType'

  export default {
    name: 'MainCanvas',
    components: {
      DataType
    },
    directives: {
      drag
    },
    data() {
      return {
        tables: storeERD.state.tables,
        tableCheck: false
      }
    },
    methods: {
      // 컬럼 추가
      addColumn (id) {
        JSLog('MainCanvas', 'addColumn', id)
        storeERD.commit({
          type: 'addColumn',
          id: id
        })
      },
      // NULL 조건 변경
      changeNull (tableId, columnId) {
        storeERD.commit({
          type: 'changeNull',
          tableId: tableId,
          columnId: columnId
        })
      }
    },
    watch: {
      tables () {
        this.tableCheck = true
      }
    },
    updated () {
      if(this.tableCheck) {
        $('.erd_table').draggable()
        this.tableCheck = false
      }
    }
  }

</script>

<style lang="scss" scoped>
  .erd_table {
    width: 808px;
    position: absolute;
    box-sizing: border-box;
    background-color: #191919;
    opacity: 0.9;
    cursor: move;
    padding-bottom: 10px;

    .erd_table_top {
      height: 25px;
    }

    .erd_table_header {
      margin-bottom: 10px;
      box-sizing: border-box;

      input {
        width: 100%;
        height: 100%;
        font-size: 20px;
      }
    }

  }
</style>
