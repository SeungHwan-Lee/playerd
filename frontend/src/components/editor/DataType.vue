<template lang="pug">
  .dataType
    input(type="text" placeholder="dataType" v-model="dataType"
    @keydown="dataTypeHintVisible(true)")

    ul.dataTypeList(v-if="isDataTypeHint")
      li(v-for="type in dataTypes") {{ type.name }}
</template>

<script>
  import storeERD from '@/store/erd'
  import ERD from '@/js/ERD'
  import {getDataTypeOptions, getOptionSearch, getData} from '@/js/common'

  export default {
    name: "DataType",
    props: ['tableId', 'columnId'],
    data() {
      return {
        dataType: '',
        dataTypes: storeERD.state.DBTypes,
        isDataTypeHint: false
      }
    },
    methods: {
      // 데이터 타입 힌트 show/hide
      dataTypeHintVisible(check) {
        this.isDataTypeHint = check
      }
    },
    watch: {
      // 데이터 변경
      dataType(val) {
        storeERD.commit({
          type: 'changeDataType',
          tableId: this.tableId,
          columnId: this.columnId,
          dataType: val
        })
      }
    },
    created() {
      JSLog(this.tableId)
      // 무빙시 데이터 바인딩
      const table = getData(storeERD.state.tables, this.tableId)
      const column = getData(table.columns, this.columnId)
      if (column.dataType) {
        this.dataType = column.dataType
      }

      // 데이터타입 힌트 이벤트 추가
      ERD.core.event.addDataTypeHintVisible(function(isDataTypeHint){
        this.isDataTypeHint = isDataTypeHint
      }.bind(this), this.columnId)
      // 데이터 타입 이벤트 추가
      ERD.core.event.addDataTypes(function(dataTypes){
        this.dataTypes = dataTypes
      }.bind(this), this.columnId)
    }
  }
</script>

<style lang="scss" scoped>
  .dataTypeList {
    width: 168px;
    position: absolute;
    color: #a2a2a2;
    background-color: #191919;
    opacity: 0.9;

    li {
      cursor: pointer;

      &:hover {
      color: white;
      background-color: #383d41;
    }
    }
  }
</style>
