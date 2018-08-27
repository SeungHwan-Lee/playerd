<template>
  <div>
    <div class="table" v-for="table in tables" :key="table.id" v-drag>
      <div class="tableHeader">
        <b-container>
          <b-row>
            <b-col sm="11">
              <input type="text" v-model="table.name"/>
            </b-col>
            <b-col sm="1">
              <b-button @click="addColumn(table.id)">
                <font-awesome-icon icon="plus" />
              </b-button>
            </b-col>
          </b-row>
        </b-container>
      </div>
      <div v-for="column in table.columns" :key="column.id">
        <b-container>
          <b-row>
            <b-col sm="3">
              <input type="text" placeholder="column" v-model="column.name"/>
            </b-col>
            <b-col sm="3">
              <input type="text" placeholder="dataType" v-model="column.dataType"/>
            </b-col>
            <b-col sm="3">
              <input type="text" readonly value="NULL" @click="changeNull(table.id, column.id)" v-if="column.isNull"/>
              <input type="text" readonly value="N-N" @click="changeNull(table.id, column.id)" v-else/>
            </b-col>
            <b-col sm="3">
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

  export default {
    name: 'MainCanvas',
    directives: {
      drag
    },
    computed: {
      tables () {
        return storeERD.state.tables
      }
    },
    methods: {
      // 컬럼 추가
      addColumn (id) {
        JSLog('MainCanvas', 'addColumn', id);
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
    }
  }

</script>

<style lang="scss" scoped>
  .table {
    position: absolute;
    box-sizing: border-box;
    background-color: #00B7FF;
    width: 600px;
  }
  .tableHeader {
    box-sizing: border-box;
    background-color: #42b983;
    width: 635px;
    input {
      width: 100%;
      height: 100%;
    }
  }
</style>
