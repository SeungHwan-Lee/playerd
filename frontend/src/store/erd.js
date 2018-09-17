import Vue from "vue"
import Vuex from 'vuex'
import { guid, getData } from '../utils/common'
import { mysql5_7 } from "./dataType"

Vue.use(Vuex)

// ERD 데이터
export default new Vuex.Store({
  state: {
    DBType: 'mysql5.7',
    DBTypes: [
      {
        value: 'mysql5.7',
        text: 'MySQL 5.7',
        dataTypes: mysql5_7.dataTypes
      }
    ],
    tables: []
  },
  mutations: {
    // 테이블 추가
    addTable (state) {
      state.tables.push({
        id: guid(),
        name: null,
        comment: null,
        columns: []
      })
      JSLog('storeERD', 'addTable')
      JSLog('to', state.tables)
    },
    // 컬럼 추가
    addColumn (state, data) {
      let len = state.tables.length
      for(let i=0; i<len; i++) {
        if(data.id === state.tables[i].id) {
          state.tables[i].columns.push({
            id: guid(),
            name: null,
            comment: null,
            dataType: null,
            isNull: true
          })
          break
        }
      }
    },
    // NULL 조건 변경
    changeNull (state, data) {
      let table = getData(state.tables, data.tableId)
      let column = getData(table.columns, data.columnId)
      column.isNull = !column.isNull
    },
    // 데이터타입 변경
    changeDataType (state, data) {
      let table = getData(state.tables, data.tableId)
      let column = getData(table.columns, data.columnId)
      column.dataType = data.dataType
    },
    // DB 변경
    changeDB (state, data) {
      state.DBType = data.DBType
    }
  }
})
