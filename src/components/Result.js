import Game from './Game'

import { createElement } from '../utils/Helpers'

const Result = Object.create(Game)

Result.setup = function (size) {
  this.init(size)

  this.elem = createElement('div', { 'classes': ['result'] })
  this.title = createElement
}
Result.build = function (output) {
  this.insert(output)
}

export default Result
