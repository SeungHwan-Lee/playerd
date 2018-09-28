/**
 * 이벤트 클래스
 */
class Event {
  constructor() {
    JSLog('Class Event')

    this.core = null
    this.rightClickListener = []
    this.setEvent()
  }

  // 종속성 초기화
  init(core) {
    JSLog('Class Event init')
    this.core = core
  }

  setEvent() {
    // 오른쪽 클릭 이벤트
    window.addEventListener('contextmenu', function (e) {
      e.preventDefault()
      this.core.event.onRightClick(e)
    }.bind(this))
    // 페이지 이동시 경고창
    window.onbeforeunload = e => {
      const dialogText = 'Dialog text here';
      e.returnValue = dialogText;
      return dialogText;
    }
  }

  // 오른쪽 클릭 이벤트 추가
  addRightClick(fn, id) {
    this.rightClickListener.push({
      fn: fn,
      id: id
    })
  }

  // 오른쪽 클릭 이벤트 삭제
  removeRightClick(id) {
    for (let i in this.rightClickListener) {
      if (id === this.rightClickListener[i].id) {
        this.rightClickListener.splice(i, 1)
        break
      }
    }
  }

  // 오른쪽 클릭 이벤트 실행
  onRightClick(e) {
    JSLog('initialize', 'onRightClick')
    JSLog('to', this.rightClickListener)
    this.rightClickListener.forEach(v => {
      if (typeof v.fn === 'function') v.fn(e)
    })
  }
}

export default new Event()
