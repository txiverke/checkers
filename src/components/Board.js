import Game from './Game'
import { createElement } from '../utils/Helpers'

const Board = Object.create(Game)

Board.setup = function() {
  this.init()
  this.elem = createElement('div', { 'class': 'board-wrapper'})
}

Board.build = function(output) {
  this.insert(output)
}

export default Board