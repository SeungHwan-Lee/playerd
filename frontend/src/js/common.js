import storeERD from '@/store/erd'
import dataType from '@/store/dataType'

// UUID 생성
export const guid = () => {
  function s4() {
    return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1)
  }

  return [s4(), s4(), '-', s4(), '-', s4(), '-', s4(), '-', s4(), s4(), s4()].join('')
}

//==================== ERD ====================
// id -> data 반환
export const getData = (list, id) => {
  for (let v of list) {
    if (id === v.id) {
      return v
    }
  }
}

// option 검색
export const getDataTypeSearch = key => {
  const DBType = storeERD.state.DBType
  const dataTypes = dataType[DBType].slice()

  for (let i = 0; i < dataTypes.length; i++) {
    let check = true
    if (dataTypes[i].name.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
      check = false
    }
    if (check) {
      dataTypes.splice(i, 1)
      i--
    }
  }
  return dataTypes
}

// max z-index 반환
export const getZIndex = el => {
  let max = 0
  $(el).each(function () {
    const zIndex = Number($(this).css('z-index'))
    if (max < zIndex) {
      max = zIndex
    }
  })
  return ++max
}

// z-index 콜백 함수
export const setZIndex = function () {
  $(this).css('z-index', getZIndex('.erd_table'))
}

// dataTypeHint show/hide 콜백 함수
export const setDataTypeHint = function (e) {
  if (!$(e.target).closest('.data_type_list').length) {
    storeERD.commit({
      type: 'dataTypeHintVisibleAll',
      isDataTypeHint: false
    })
  }
}

// 좌표 데이터 정제
function getPoints(ui) {
  return {
    top: {
      x: ui.left + (ui.width / 2),
      y: ui.top
    },
    bottom: {
      x: ui.left + (ui.width / 2),
      y: ui.top + ui.height
    },
    left: {
      x: ui.left,
      y: ui.top + (ui.height / 2)
    },
    right: {
      x: ui.left + ui.width,
      y: ui.top + (ui.height / 2)
    }
  }
}

// 테이블 선좌표 최적화
export const getLineXY = v => {
  const startTable = getData(storeERD.state.tables, v.points[0].id)
  const endTable = getData(storeERD.state.tables, v.points[1].id)

  let startKey = 'left'
  const startUI = getPoints(startTable.ui)
  if (endTable) {
    const endUI = getPoints(endTable.ui)
    let minXY = Math.abs(startUI.left.x - endUI.left.x) + Math.abs(startUI.left.y - endUI.left.y)
    v.points[0].x = startUI.left.x
    v.points[0].y = startUI.left.y
    v.points[1].x = endUI.left.x
    v.points[1].y = endUI.left.y

    Object.keys(startUI).forEach(function (key) {
      Object.keys(endUI).forEach(function (key2) {
        let tempXY = Math.abs(startUI[key].x - endUI[key2].x) + Math.abs(startUI[key].y - endUI[key2].y)
        if(minXY > tempXY) {
          minXY = tempXY
          startKey = key
          v.points[0].x = startUI[key].x
          v.points[0].y = startUI[key].y
          v.points[1].x = endUI[key2].x
          v.points[1].y = endUI[key2].y
        }
      })
    })
  } else {
    let minXY = Math.abs(startUI.left.x - v.points[1].x) + Math.abs(startUI.left.y - v.points[1].y)
    v.points[0].x = startUI.left.x
    v.points[0].y = startUI.left.y

    Object.keys(startUI).forEach(function (key) {
      let tempXY = Math.abs(startUI[key].x - v.points[1].x) + Math.abs(startUI[key].y - v.points[1].y)
      if (minXY > tempXY) {
        minXY = tempXY
        startKey = key
        v.points[0].x = startUI[key].x
        v.points[0].y = startUI[key].y
      }
    })
  }

  const points = []
  points.push(`M${v.points[0].x} ${v.points[0].y}`)
  if(startKey === 'left' || startKey === 'right') {
    points.push(`Q ${(v.points[0].x + v.points[1].x) / 2} ${v.points[0].y}`)
  }else {
    points.push(`Q ${v.points[0].x} ${(v.points[0].y + v.points[1].y) / 2}`)
  }
  points.push(`${v.points[1].x} ${v.points[1].y}`)
  return points.join(' ')
}

//==================== ERD END ====================
