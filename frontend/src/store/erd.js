import Vue from 'vue'
import Vuex from 'vuex'
import {guid, getData} from '@/js/common'
import dataType from './dataType'
import ERD from '@/js/ERD'

Vue.use(Vuex)

// ERD 데이터
export default new Vuex.Store({
  state: {
    DBType: 'MySQL',
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
          top: document.documentElement.scrollTop+100,
          left: document.documentElement.scrollLeft+200
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
              },
              isDataTypeHint: false,
              dataTypes: dataType.MySQL
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
    // DB 변경
    changeDB(state, data) {
      state.DBType = data.DBType
      setDataTypes(state, dataType[data.DBType])
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

      // line drawing 종료
      }else if(ERD.core.event.isDraw) {
        const line = getData(state.lines, ERD.core.event.lineId)
        if(data.id !== line.points[0].id) {
          ERD.core.event.endCursor(data.id)
        }
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
    // 데이터타입 힌트 show/hide
    dataTypeHintVisible(state, data) {
      const table = getData(state.tables, data.tableId)
      const column = getData(table.columns, data.columnId)
      column.ui.isDataTypeHint = data.isDataTypeHint
    },
    // 데이터타입 힌트 show/hide ALL
    dataTypeHintVisibleAll(state, data) {
      setDataTypeHint(state, data.isDataTypeHint)
    },
    // table top, left 변경
    tableTracker(state, data) {
      const table = getData(state.tables, data.id)
      table.ui.top = data.top
      table.ui.left = data.left
      // line 업데이트
      this.state.lines.forEach(line => {
        line.points.forEach(v => {
          if(v.id === data.id) {
            v.x = data.left
            v.y = data.top
          }
        })
      })
    },
    // line drawing
    lineDraw(state, data) {
      const line = getData(state.lines, data.id)
      line.points[1].x = data.x
      line.points[1].y = data.y
      if(data.tableId) line.points[1].id = data.tableId
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

// dataType 변경
function setDataTypes(state, dataTypes) {
  for(let table of state.tables) {
    for(let column of table.columns) {
      column.ui.dataTypes = dataTypes
    }
  }
}

// 데이터타입 힌트 show/hide ALL
function setDataTypeHint(state, isDataTypeHint) {
  for(let table of state.tables) {
    for(let column of table.columns) {
      column.ui.isDataTypeHint = isDataTypeHint
    }
  }
}
