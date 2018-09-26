import event from './Event'

/**
 * 초기화 클래스
 */
class Initialize {
  constructor() {
    JSLog('Class Initialize')

    this.core = {
      event: event
    }

    this.setInit(this.core)
  }

  setInit(core) {
    Object.keys(this.core).forEach(function(v){
      this[v].init(core)
    }.bind(this.core))
  }

}

export default new Initialize()
