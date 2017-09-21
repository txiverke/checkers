import Game from './Game'
import { createElement } from '../utils/Helpers'

const Board = Object.create(Game)

Board.setup = function(size, coords) {
  this.init(size)
  this.elem = createElement('div', { 'classes': ['board'] })
  this.board = []

  for (var i = 0; i < coords.x.length; i++) {
    for (var j = 0; j < coords.y.length; j++) {
      this.board.push(coords.x[coords.x.length - i -1] + coords.y[j])
    }
  }

  this.board.map((item, index) => {
    let breakline = (index%8 === 0 && index !== 0) ? '<br />' : ''
    this.elem.innerHTML += `${breakline}<div id=${item} class="board-cell"></div>`
  }).join('')

}

Board.build = function(output) {
  this.insert(output)
}

Board.get = function () {
  console.log('its called')
  return this.board
}

export default Board