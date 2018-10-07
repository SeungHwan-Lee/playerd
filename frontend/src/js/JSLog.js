/**
 * 전역 로그
 * @param option 옵션 'to' -> toString
 * @param list
 * @constructor
 */
window.JSLog = function (option, ...list) {
  if (option === 'to') {
    list.forEach(obj => {
      let log = '', objs = [], i = 0
      for (let prop in obj) {
        if (i !== 0) {
          log += 'JSLog: '
        }
        i++
        log += `${prop} : ${obj[prop]} \n`
        if (typeof(obj[prop]) === 'object') {
          objs.push({
            name: prop,
            o: obj[prop]
          });
        }
      }
      JSLog(log)
      objs.forEach(function (v) {
        JSLog(`-> ${v.name}`)
        JSLog('to', v.o)
      })
    })
  } else {
    let args = Array.prototype.slice.call(arguments)
    if (window.console) console.log(`JSLog: ${args.join(' | ')}`)
  }
}
