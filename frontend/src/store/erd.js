import Vue from 'vue'
import Vuex from 'vuex'
import {guid, getData} from '@/js/common'
import {mysql5_7} from './dataType'
import ERD from '@/js/ERD'

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
    tables: [],
    lines: []
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
          selected: false,
          top: 0,
          left: 0
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
              selected: false,
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
      const table = getData(state.tables, data.tableId)
      for (let i in table.columns) {
        if (data.columnId === table.columns[i].id) {
          table.columns.splice(i, 1)
          break
        }
      }
    },
    // NULL 조건 변경
    changeNull(state, data) {
      const table = getData(state.tables, data.tableId)
      const column = getData(table.columns, data.columnId)
      column.isNull = !column.isNull
    },
    // 데이터타입 변경
    changeDataType(state, data) {
      const table = getData(state.tables, data.tableId)
      const column = getData(table.columns, data.columnId)
      column.dataType = data.dataType
    },
    // DB 변경
    changeDB(state, data) {
      state.DBType = data.DBType
    },
    // table 선택
    tableSelected(state, data) {
      state.tables.forEach(v => {
        v.ui.selected = data.id === v.id;
      })
      // column 선택 제거
      if(data.onlyTableSelected) {
        columnSelectedNone(state)
      }
      // line drawing 시작
      if(ERD.core.event.isCursor && !ERD.core.event.isDraw) {
        const table = getData(state.tables, data.id)
        const id = guid()
        this.state.lines.push({
          id: id,
          points: [
            {
              id: data.id,
              x: table.ui.left,
              y: table.ui.top
            },
            {
              id: null,
              x: table.ui.left,
              y: table.ui.top
            }
          ]
        })
        ERD.core.event.startCursor(id)
      }
    },
    // column 선택
    columnSelected(state, data) {
      columnSelectedNone(state)
      const table = getData(state.tables, data.tableId)
      const column = getData(table.columns, data.columnId)
      if(column) column.ui.selected = true
    },
    // column key active
    columnKey(state, data) {
      switch (data.key) {
        case 'pk':
          setColumnKey(state, data.key)
          break
      }
    },
    // table top, left 변경
    tableTracker(state, data) {
      const table = getData(state.tables, data.id)
      table.ui.top = data.top
      table.ui.left = data.left
    },
    // line mousemove drawing
    lineDraw(state, data) {
      const line = getData(state.lines, data.id)
      line.points[1].x = data.x
      line.points[1].y = data.y
    },
    // line 제거
    deleteLine(state, data) {
      for (let i in state.lines) {
        if (data.id === state.lines[i].id) {
          state.lines.splice(i, 1)
          break
        }
      }
    }
  }
})

// column 선택 초기화
function columnSelectedNone(state) {
  state.tables.forEach(table => {
    table.columns.forEach(v => {
      v.ui.selected = false
    })
  })
}

// column key active
function setColumnKey(state, key) {
  for(let table of state.tables) {
    let check = false
    for(let column of table.columns) {
      if(column.ui.selected) {
        column.ui.key[key] = !column.ui.key[key]
        check = true
        break
      }
    }
    if(check) {
      break
    }
  }
}
