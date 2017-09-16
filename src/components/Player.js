import Game from './Game'

import { createElement } from '../utils/Helpers'
import { boardCoords } from '../utils/Constants'

const Player = Object.create(Game)

Player.setup = function(size) {
  this.init(size)
  this.elem = { black: [], red: [] }

  const teams = Object.keys(this.elem)

  teams.forEach(team => {
    let count = 0
    let index = 1
    let down = 2

    for (var i = 1; i <= 12; i++) {
      let id = 0
      let square = 0      

      if (team === 'black') {
        square = (count%2 === 0) ? (index + (index - 1)) : index * 2
        id = boardCoords.x[(boardCoords.x.length - 1) - count] + square
      } else {
        square = (count%2 === 0) ? index * 2 : (index + (index - 1))
        id = boardCoords.x[down] + square        
      }

      this.elem[team].push({
        html: createElement('div', { 
          classes: ['piece'], 
          data: { 'index': id } 
        })
      })

      if (i%4 === 0) {
        count++
        index = 0
        if (team !== 'black') down--
      }

      index++      
    }
  })
}

Player.build = function(output) {
  this.insert(output)
  this.elem.red.forEach(piece => piece.html.addEventListener('click', this.click.bind(this)))
  this.initialPosition()
}

Player.click = function(e) {
  if (this.turn) {
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

    if (this.nextMove.length > 0) this.showNextOptions(e)
  }
  
}


Player.initialPosition = function() {
  const boardCells = Array.from(document.querySelectorAll('.board-cell'))
  console.log('**SET PIECES IN THE INITIAL POSITION**')

  boardCells.forEach(cell => {
    this.coords = Object.assign({}, this.coords, {
      [cell.id]: { x: cell.offsetLeft, y: cell.offsetTop }
    })
  })

  this.pieces = Array.from(document.querySelectorAll('.piece'))
  this.pieces.forEach(piece => {
    let index = piece.dataset.index
    piece.style.top = this.coords[index].y + 'px'   
    piece.style.left = this.coords[index].x + 'px'
    this.coords[index].active = true
    this.coords[index].user = piece.classList.contains('red') ? true : false 
  })
}

Player.showNextOptions = function (e) {
  const moveFrom = e.target.dataset.index
  const html = document.querySelector('.board')
  const oldNextMoves = document.querySelectorAll('.piece-next')

  if (oldNextMoves.length > 0) this.hideNextOptions(oldNextMoves)

  this.nextMove.forEach((item) => {
    let next = createElement('div', { 
      'classes': ['piece', 'piece-next'], 
      'data': {
        'from': moveFrom, 
        'to': item 
      } 
    })
    next.style.left = this.coords[item].x + 'px'
    next.style.top = this.coords[item].y + 'px'
    next.addEventListener('click', this.move.bind(this))

    html.appendChild(next)
  })
  
  this.oldNext = document.querySelectorAll('.piece-next')  

  if (!e.target.classList.contains('active')) {
    this.elem.red.forEach(item => item.html.classList.remove('active'))
    e.target.classList.add('active')
  }
}

Player.hideNextOptions = function(arr) {
  const parent = document.querySelector('.board')
  arr.forEach(item => parent.removeChild(item))
}

Player.move = function(e) {
  const target = e.target.dataset
  const elem = document.querySelector(`[data-index="${target.from}"]`)
  elem.style.left = this.coords[target.to].x +'px'
  elem.style.top = this.coords[target.to].y +'px'
  elem.dataset.index = target.to
  elem.classList.remove('active')

  this.coords[target.from].active = false
  this.coords[target.from].user = false
  this.coords[target.to].active = true
  this.coords[target.to].user = true

  this.hideNextOptions(document.querySelectorAll('.piece-next'))
}

export default Player
