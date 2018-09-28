import event from './Event'

/**
 * core 클래스
 */
class ERD {
  constructor() {
    JSLog('Class ERD')

    // 모듈 객체
    this.core = {
      event: event
    }

    this.setInit(this.core)
  }

  // 종속성 초기화
  setInit(core) {
    JSLog('Class ERD Init')
    Object.keys(this.core).forEach(function(v){
      this[v].init(core)
    }.bind(this.core))
  }

}

export default new ERD()
