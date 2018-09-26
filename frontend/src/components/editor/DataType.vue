<template>
  <div class="dataType">
    <input type="text" placeholder="dataType" v-model="dataType"
           @click="dataTypeHintVisible('show')"
           @keydown="dataTypeHintVisible('show')"
           @keyup="selectFocus"
           @mouseout="dataTypeHintHide"
           @blur="dataTypeHintHide"/>
    <b-form-select ref="box" v-model="selected" :options="options" class="mb-4" :select-size="20"></b-form-select>
  </div>
</template>

<script>
  import storeERD from '@/store/erd'
  import {getDataTypeOptions, getOptionSearch, getData} from '@/js/common'

  export default {
    name: "DataType",
    props: ['tableId', 'columnId'],
    data() {
      return {
        dataType: '',
        selected: '',
        options: [],
        hintCheck: true,
        searchCheck: true
      }
    },
    methods: {
      // 데이터타입 힌트 변경
      setSearchOptions(val) {
        let options = getOptionSearch(val)
        if (options.length !== 0) {
          this.options = options
          this.dataType = val
        }
      },
      // 데이터타입 힌트 show,hide
      dataTypeHintVisible(type) {
        JSLog('DataType', 'dataTypeHintVisible', type)
        this.hintCheck = type === 'show'
        $(this.$el).find('select')[type]()
      },
      // 데이터타입 힌트 hide 타임셋
      dataTypeHintHide() {
        setTimeout(function () {
          JSLog('DataType', 'dataTypeHintHide', this.hintCheck)
          if (this.hintCheck) {
            this.dataTypeHintVisible('hide')
          }
        }.bind(this), 100)
      },
      // 데이터타입 힌트 포커스
      selectFocus(e) {
        if (e.key === 'ArrowDown') {
          this.searchCheck = false
          this.hintCheck = false
          $(this.$el).find('select').focus()
          $(this.$el).find('select > option').eq(0).prop('selected', true)
        } else {
          this.searchCheck = true
        }
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
        if (this.searchCheck) {
          this.setSearchOptions(val)
        }
      },
      // 데이터타입 힌트에 따른 데이터 변경
      selected(val) {
        if (val !== '') {
          this.searchCheck = false
          this.dataType = val
        }
      }
    },
    created() {
      // 무빙시 데이터 바인딩
      let table = getData(storeERD.state.tables, this.tableId)
      let column = getData(table.columns, this.columnId)
      if (column.dataType) {
        this.dataType = column.dataType
      }
      // 데이터타입 힌트 셋팅
      this.options = getDataTypeOptions()
    },
    mounted() {
      // 데이터타입 힌트 hide
      $(this.$el).find('select').mouseleave(function () {
        this.dataTypeHintVisible('hide')
      }.bind(this))
      $(this.$el).find('select').mouseenter(function () {
        this.hintCheck = false
      }.bind(this))
      // 데이터타입 힌트 show
      $(this.$el).find('select').keyup(function (e) {
        if (e.keyCode === 13) {
          this.hintCheck = true
          $(this.$el).find('input').focus()
        }
      }.bind(this))
    }
  }
</script>

<style lang="scss" scoped>
  .custom-select {
    width: 168px;
    position: absolute;
    z-index: 2000;
    display: none;
  }
</style>
