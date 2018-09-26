import Vue from 'vue'
import Vuex from 'vuex'
import {guid, getData} from '@/js/common'
import {mysql5_7} from "./dataType"

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
    addTable(state) {
      state.tables.push({
        id: guid(),
        name: null,
        comment: null,
        columns: [],
        ui: {
          selected: false
        }
      })
    },
    // 테이블 삭제
    deleteTable(state, data) {
      for (let i in state.tables) {
        if (data.id === state.tables[i].id) {
          state.tables.splice(i, 1)
          break
        }
      }
    },
    // 컬럼 추가
    addColumn(state, data) {
      for (let i in state.tables) {
        if (data.id === state.tables[i].id) {
          state.tables[i].columns.push({
            id: guid(),
            name: null,
            comment: null,
            dataType: null,
            isNull: true,
            ui: {
              key: {
                pk: false,
                fk: false,
                pfk: false
              }
            }
          })
          break
        }
      }
    },
    // 컬럼 삭제
    deleteColumn(state, data) {
      let table = getData(state.tables, data.tableId)
      for (let i in table.columns) {
        if (data.columnId === table.columns[i].id) {
          table.columns.splice(i, 1)
          break
        }
      }
    },
    // NULL 조건 변경
    changeNull(state, data) {
      let table = getData(state.tables, data.tableId)
      let column = getData(table.columns, data.columnId)
      column.isNull = !column.isNull
    },
    // 데이터타입 변경
    changeDataType(state, data) {
      let table = getData(state.tables, data.tableId)
      let column = getData(table.columns, data.columnId)
      column.dataType = data.dataType
    },
    // DB 변경
    changeDB(state, data) {
      state.DBType = data.DBType
    },
    // table 선택
    tableSelected(state, data) {
      state.tables.forEach(v => {
        data.ids.forEach(id => {
          v.ui.selected = id === v.id;
        })
      })
    }
  }
})
