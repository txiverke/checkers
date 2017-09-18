import Game from './Game'
import Machine from './Machine'

import { createElement } from '../utils/Helpers'
import { boardCoords } from '../utils/Constants'

const User = Object.create(Game)

/**
 * SETUP
 * Creates the the User pieces
 * 
 * @param {Object}
 */
User.setup = function (size) {
  this.init(size)
  this.elem = {user: []}

  let count = 0
  let index = 1
  let down = 2

  for (var i = 1; i <= 12; i++) {
    const square = (count%2 === 0) ? index * 2 : (index + (index - 1))
    const id = boardCoords.x[down] + square        
    
    this.elem.user.push({
      html: createElement('div', { 
        classes: ['piece', 'user'], 
        data: { 'index': id } 
      })
    })

    if (i%4 === 0) {
      count++
      index = 0
      down--
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
User.build = function (output) {
  this.insert(output)
  this.elem.user.forEach(piece => piece.html.addEventListener('click', this.click.bind(this)))
  this.setDefault()
}

/**
 * SET_DEFAULT
 * Set the pieces in the right position in the board
 * Fill this.coords Array with the info of the game
 */
User.setDefault = function () {
  const boardCells = Array.from(document.querySelectorAll('.board-cell'))

  boardCells.forEach(cell => {
    this.coords = Object.assign({}, this.coords, {
      [cell.id]: { x: cell.offsetLeft, y: cell.offsetTop }
    })
  })

  this.pieces = Array.from(document.querySelectorAll('.user'))
  this.pieces.forEach(piece => {
    let index = piece.dataset.index
    piece.style.top = this.coords[index].y + 'px'   
    piece.style.left = this.coords[index].x + 'px'
    this.coords[index].active = true
    this.coords[index].user = true 
  })
}

/**
 * CLICK
 * Get the piece that was clicked
 * Fill an Array with the posible moves
 * Chech if the next moves are available
 * 
 * @param {Object - event}
 */
User.click = function (e) {
  if (this.history.length%2 === 0 ) {
    const currentPos = (e.target.dataset.index).split('')
    const num = []
    const x = boardCoords.x
  
    switch (currentPos[1]) {
      case '1': num.push(2); break;
      case '8': num.push(7); break;
      default: num.push(Number(currentPos[1]) - 1, Number(currentPos[1]) + 1); 
    }

    this.nextMove = []

    num.forEach((item) => {
      let temp = x[x.findIndex(item => item === currentPos[0]) + 1] + item
      if (!this.coords[temp].active) {
        this.nextMove.push(temp)
      }
    })

    if (this.nextMove.length > 0) {
      e.target.classList.add('active')      
      this.showNextOptions(e)
    }
  }
  
}

User.showNextOptions = function (e) {
  const moveFrom = e.target.dataset.index
  const html = document.querySelector('.board')
  const oldNextMoves = document.querySelectorAll('.piece-next')

  if (oldNextMoves.length > 0) this.hideNextOptions(oldNextMoves)

  this.nextMove.forEach((item) => {
    let next = createElement('div', { 
      'classes': ['piece', 'piece-next'], 
      'data': { 'from': moveFrom, 'to': item } 
    })
    next.style.left = this.coords[item].x + 'px'
    next.style.top = this.coords[item].y + 'px'
    next.addEventListener('click', this.move.bind(this))

    html.appendChild(next)
  })
  
}

User.hideNextOptions = function (arr) {
  const parent = document.querySelector('.board')
  arr.forEach(item => parent.removeChild(item))
  this.elem.user.forEach(item => item.html.classList.remove('active'))
}

User.move = function (e) {
  const target = e.target.dataset
  const elem = document.querySelector(`[data-index="${target.from}"]`)
  elem.style.left = this.coords[target.to].x +'px'
  elem.style.top = this.coords[target.to].y +'px'
  elem.dataset.index = target.to

  this.coords[target.from].active = false
  this.coords[target.from].user = false
  this.coords[target.to].active = true
  this.coords[target.to].user = true

  this.hideNextOptions(document.querySelectorAll('.piece-next'))
  this.history.push({ user: true, from: target.from, to: target.to })
  
  Machine.start()
}

export default User
