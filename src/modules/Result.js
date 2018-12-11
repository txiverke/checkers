import Game from './Game'

import { createElement } from '../utils/Helpers'

const Result = Object.create(Game)

Result.setup = function (size) {
  this.init(size)

  this.elem = createElement('div', { 'classes': ['result'] })
  this.resultBlack = createElement('div', { 'classes': ['result-box', 'black'] })
  this.resultBlack.appendChild(createElement('div'))
  
  this.resultRed = createElement('div', { 'classes': ['result-box', 'red'] })
  this.resultRed.appendChild(createElement('div'))

  this.elem.appendChild(this.resultBlack)
  this.elem.appendChild(this.resultRed)
}

Result.build = function (output) {
  this.insert(output)
  this.setDefault()
}

Result.setDefault = function() {
  this.result = { user: 0, computer: 0 }
  this.resultBlack.querySelector('div').textContent = this.result.computer
  this.resultRed.querySelector('div').textContent = this.result.user
}

export default Result
