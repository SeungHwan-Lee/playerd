import storeERD from '@/store/erd'
import dataType from '@/store/dataType'

// UUID 생성
export const guid = () => {
  function s4() {
    return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1)
  }
  return [s4(),s4(),'-',s4(),'-',s4(),'-',s4(),'-',s4(),s4(),s4()].join('')
}

//==================== ERD ====================
// id -> data 반환
export const getData = (list, id) => {
  for(let i in list) {
    if(id === list[i].id) {
      return list[i]
    }
  }
}

// option 검색
export const getDataTypeSearch = key => {
  JSLog(key)
  const dbType = storeERD.state.DBType
  const dataTypes = dataType[dbType].slice()

  for(let i=0; i<dataTypes.length; i++) {
    let check = true
    if(dataTypes[i].name.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
      check = false
    }
    if(check) {
      dataTypes.splice(i, 1)
      i--
    }
  }
  return dataTypes
}

// max z-index 반환
export const getZIndex = el => {
  let max = 0
  $(el).each(function(){
    const zIndex = Number($(this).css('z-index'))
    if(max < zIndex) {
      max = zIndex
    }
  })
  return ++max
}

// z-index 콜백 함수
export const setZIndex = function() {
  $(this).css('z-index', getZIndex('.erd_table'))
}

// dataTypeHint show/hide 콜백 함수
export const setDataTypeHint = function(e) {
  if (!$(e.target).closest('.data_type_list').length) {
    storeERD.commit({
      type: 'dataTypeHintVisibleAll',
      isDataTypeHint: false
    })
  }
}

//==================== ERD END ====================
