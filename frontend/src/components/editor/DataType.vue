<template>
  <div>
      <input type="text" placeholder="dataType" v-model="dataType"
             @click="dataTypeHintVisible('show')"
             @keydown="dataTypeHintVisible('show')"
             @keyup="selectFocus"
             @mouseout="dataTypeHintHide"
             @blur="dataTypeHintHide" />
      <b-form-select ref="box" v-model="selected" :options="options" class="mb-4" :select-size="20"></b-form-select>
  </div>
</template>

<script>
  import storeERD from '../../store/erd'
  import { getDataTypeOptions, getOptionSearch } from '../../utils/common'

  export default {
    name: "DataType",
    props: ['tableId', 'columnId'],
    data () {
      return {
        dataType: '',
        selected: '',
        options: [],
        hintCheck: true,
        searchCheck: true
      }
    },
    created () {
      // 데이터타입 힌트 셋팅
      this.options = getDataTypeOptions()
    },
    mounted () {
      // 데이터타입 힌트 hide
      this.dataTypeHintVisible('hide')
      this.jquery(this.$el).find('select').mouseleave(function(){
        this.dataTypeHintVisible('hide')
      }.bind(this))
      this.jquery(this.$el).find('select').mouseenter(function(){
        this.hintCheck = false
      }.bind(this))
      // 데이터타입 힌트 show
      this.jquery(this.$el).find('select').keyup(function(e){
        if(e.keyCode === 13) {
          this.hintCheck = true
          this.jquery(this.$el).find('input').focus()
        }
      }.bind(this))
    },
    watch: {
      // 데이터 변경
      dataType (val) {
        storeERD.commit({
          type: 'changeDataType',
          tableId: this.tableId,
          columnId: this.columnId,
          dataType: val
        })
        if(this.searchCheck) {
          this.setSearchOptions(val)
        }
      },
      // 데이터타입 힌트에 따른 데이터 변경
      selected (val) {
        if(val !== '') {
          this.searchCheck = false
          this.dataType = val
        }
      }
    },
    methods: {
      // 데이터타입 힌트 변경
      setSearchOptions (val) {
        let options = getOptionSearch(val)
        if(options.length !== 0) {
          this.options = options
          this.dataType = val
        }
      },
      // 데이터타입 힌트 show,hide
      dataTypeHintVisible (type) {
        JSLog('dataTypeHintVisible', type)
        if(type === 'show') this.hintCheck = true
        this.jquery(this.$el).find('select')[type]()
      },
      // 데이터타입 힌트 hide 타임셋
      dataTypeHintHide () {
        setTimeout(function(){
          JSLog(this.hintCheck)
          if(this.hintCheck) {
            this.dataTypeHintVisible('hide')
          }
        }.bind(this), 100)
      },
      // 데이터타입 힌트 포커스
      selectFocus (e) {
        if(e.key === 'ArrowDown') {
          this.searchCheck = false
          this.hintCheck = false
          this.jquery(this.$el).find('select').focus()
          this.jquery(this.$el).find('select > option').eq(0).prop('selected', true)
        }else {
          this.searchCheck = true
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .custom-select {
    position: absolute;
    z-index: 2000;
  }
</style>
