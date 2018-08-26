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

// id -> data 반환
function getData(list, id) {
  let len = list.length
  for(let i=0; i<len; i++) {
    if(id === list[i].id) {
      return list[i]
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
    }
  }
})
