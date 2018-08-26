import Vue from "vue"
import Vuex from 'vuex'

Vue.use(Vuex)

// UUID 생성
function guid() {
  function s4() {
    return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1)
  }
  return [s4(),s4(),'-',s4(),'-',s4(),'-',s4(),'-',s4(),s4(),s4()].join('')
}

// id -> table 반환
function getTable(id) {
  let len = this.tables.length
  for(let i=0; i<len; i++) {
    if(id === this.tables[i].id) {
      return this.tables[i]
    }
  }
}
// id -> column 반환
function getColumn(table, id) {
  let len = table.columns.length
  for(let i=0; i<len; i++) {
    if(id === table.columns[i].id) {
      return table.columns[i]
    }
  }
}

// ERD 데이터
export default new Vuex.Store({
  state: {
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
            notNull: false
          })
          break
        }
      }
    },
    changeNotNull (state, data) {
      let table = getTable(data.datatableId)
      let column = getColumn(table, data.columnId)
      column.notNull = !column.notNull
    }
  }
})
