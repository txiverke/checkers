import Game from './Game'

import { createElement } from '../utils/Helpers'
import { boardCoords } from '../utils/Constants'

const Machine = Object.create(Game)

/**
 * SETUP
 * Creates the the Machine pieces
 * 
 * @param {Object}
 */
Machine.setup = function (size) {
  this.init(size)
  this.elem = {machine: []}

  let count = 0
  let index = 1
  let down = 2

  for (var i = 1; i <= 12; i++) {
    let id = 0
    let square = 0      

    square = (count%2 === 0) ? (index + (index - 1)) : index * 2
    id = boardCoords.x[(boardCoords.x.length - 1) - count] + square

    this.elem.machine.push({
      html: createElement('div', { 
        classes: ['piece'], 
        data: { 'index': id } 
      })
    })

    if (i%4 === 0) {
      count++
      index = 0
    }

    index++      
  }
}

/**
 * BUILD
 * Adds the Machine pieces in the board 
 * 
 * @param {Object - DOM Element}
 */
Machine.build = function (output) {
  this.insert(output)
  this.setDefault()
}

/**
 * SET_DEFAULT
 * Set the pieces in the right position in the board
 * Fill this.coords Array with the info of the game
 */
Machine.setDefault = function () {
  const boardCells = Array.from(document.querySelectorAll('.board-cell'))

  boardCells.forEach(cell => {
    this.coords = Object.assign({}, this.coords, {
      [cell.id]: { x: cell.offsetLeft, y: cell.offsetTop }
    })
  })

  this.pieces = Array.from(document.querySelectorAll('.machine'))
  this.pieces.forEach(piece => {
    let index = piece.dataset.index
    piece.style.top = this.coords[index].y + 'px'   
    piece.style.left = this.coords[index].x + 'px'
    this.coords[index].active = true
    this.coords[index].user = false
  })
}

Machine.start = function() {
  console.log(this)
}

export default Machine
