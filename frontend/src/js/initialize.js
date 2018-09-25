// 초기화 클래스
class initialize {
  constructor() {
    this.rightClickListener = []
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
  onRightClick() {
    this.rightClickListener.forEach(v => {
      if (typeof v.fn === 'function') v.fn()
    })
  }
}

export default new initialize()
