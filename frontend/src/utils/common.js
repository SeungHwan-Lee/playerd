import storeERD from '../store/erd'

// UUID 생성
export const guid = function () {
  function s4() {
    return ((1 + Math.random()) * 0x10000 | 0).toString(16).substring(1)
  }
  return [s4(),s4(),'-',s4(),'-',s4(),'-',s4(),'-',s4(),s4(),s4()].join('')
}

// id -> data 반환
export const getData = function (list, id) {
  let len = list.length
  for(let i=0; i<len; i++) {
    if(id === list[i].id) {
      return list[i]
    }
  }
}

// dataType 리스트 options 형태로 반환
export const getDataTypeOptions = function () {
  let len = storeERD.state.DBTypes.length
  let dbType = storeERD.state.DBType
  let dataTypes = []
  for(let i=0; i<len; i++) {
    if(dbType === storeERD.state.DBTypes[i].value) {
      dataTypes = storeERD.state.DBTypes[i].dataTypes
      break
    }
  }
  let options = []
  dataTypes.forEach(function(v){
    options.push({
      value: v.name,
      text: v.name
    })
  })
  return options
}

// option 검색
export const getOptionSearch = function (key) {
  let options = getDataTypeOptions()
  let check = true
  for(let i=0; i<options.length; i++) {
    check = true
    if(options[i].text.toLowerCase().indexOf(key.toLowerCase()) != -1) {
      check = false
    }
    if(check) {
      options.splice(i, 1)
      i--
    }
  }
  return options
}
