import Game from './Game'
import { boardCoords } from '../utils/Constants'
import { createElement } from '../utils/Helpers'

const Player = Object.create(Game)

/**
 * SETUP
 * Creates the the User pieces
 * 
 * @param {Object}
 */
Player.setup = function (size, name) {
  this.init(size)
  this.elem = { [name]: [] }

  let count = 0
  let index = 1
  let down = 2

  for (var i = 1; i <= 12; i++) {
    let square = 0
    let id = 0

    if (name === 'user') {
      square = (count%2 === 0) ? index * 2 : (index + (index - 1))
      id = boardCoords.x[down] + square      
    } else {
      square = (count%2 === 0) ? (index + (index - 1)) : index * 2
      id = boardCoords.x[(boardCoords.x.length - 1) - count] + square
    }
     
    this.elem[name].push({
      html: createElement('div', { 
        classes: ['piece', name], 
        data: { 'index': id, 'role': name } 
      })
    })

    if (i%4 === 0) {
      count++
      index = 0
      if (name === 'user') down--
    }

    index++      
  }
}

/**
 * BUILD
 * Adds the User pieces in the board 
 * Binds the pieces with a click Event
 * 
 * @param {Object - DOM Element}
 */
Player.build = function (output) {
  this.insert(output)

  const keys = Object.keys(this.elem)

  for (var i = 0; i < this.elem[keys[0]].length; i++) {
    let item = this.elem[keys[0]][i].html
    let index = item.dataset.index
    let target = document.getElementById(index)

    item.style.left = target.offsetLeft + 'px'
    item.style.top = target.offsetTop + 'px'
  }
}

Player.getCoords = function () {
  this.coords = { user: {}, machine: {}}

  const pieces = document.querySelectorAll('.piece')
  pieces.forEach((piece) => {
    const type = piece.dataset.role
    this.coords[type] = Object.assign({}, this.coords[type], {
      [piece.dataset.index]: {
        x: piece.offsetLeft,
        y: piece.offsetTop,
        type: type === 'user' ? 'user' : 'machine'
      }
    })
  })
}

Player.getCells = function () {
  const cells = document.querySelectorAll('.board-cell')
  
  cells.forEach(cell => {
    this.cells = Object.assign({}, this.cells, {
      [cell.id]: { x: cell.offsetLeft, y: cell.offsetTop }
    })
  })
}

export default Player
