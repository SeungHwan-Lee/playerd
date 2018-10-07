import storeERD from '../store/erd'

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

// dataType 리스트 options 형태로 반환
export const getDataTypeOptions = () => {
  const dbType = storeERD.state.DBType
  let dataTypes = []
  for(let i in storeERD.state.DBTypes) {
    if(dbType === storeERD.state.DBTypes[i].value) {
      dataTypes = storeERD.state.DBTypes[i].dataTypes
      break
    }
  }
  const options = []
  dataTypes.forEach(function(v){
    options.push({
      value: v.name,
      text: v.name
    })
  })
  return options
}

// option 검색
export const getOptionSearch = key => {
  const options = getDataTypeOptions()
  for(let i in options) {
    let check = true
    if(options[i].text.toLowerCase().indexOf(key.toLowerCase()) !== -1) {
      check = false
    }
    if(check) {
      options.splice(i, 1)
      i--
    }
  }
  return options
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

//==================== ERD END ====================
