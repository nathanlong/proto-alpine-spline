export default class counter {
  constructor(el) {
    this.el = el
    this.setVars()
    this.bindEvents()
    this.setCounter(0)
  }

  setVars() {
    this.counter = 0
    this.button = this.el.querySelector('#counter');
  }

  bindEvents() {
    this.button.addEventListener('click', () => this.setCounter(this.counter + 1))
  }

  setCounter(count) {
    this.counter = count
    this.button.innerHTML = `count is ${this.counter}`
  }

  cleanUp() {
    this.button.removeEventListener('click', () => this.setCounter(this.counter + 1))
  }
}
