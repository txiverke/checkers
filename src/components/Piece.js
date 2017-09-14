import Game from './Game'
import { createElement } from '../utils/Helpers'
import { boardCoords } from '../utils/Constants'

const Piece = Object.create(Game)

Piece.setup = function(size) {
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
          data: { 'data-index': id } 
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

Piece.build = function(output) {
  this.insert(output)

  this.elem.red.forEach(piece => piece.html.addEventListener('click', this.click.bind(this)))
  
  this.initialPosition()
}

Piece.click = function(e) {
  const currentPos = (e.target.dataset.index).split('')
  const num = []
  const x = boardCoords.x

  switch (currentPos[1]) {
    case '1':
      num.push(2)
      break
    case '8':
      num.push(7)
      break
    default:
      num.push(Number(currentPos[1]) - 1, Number(currentPos[1]) + 1) 
  }

  this.nextMove = num.map(item => x[x.findIndex(item => item === currentPos[0]) + 1] + item)
  this.renderNextMove(e)
}

Piece.initialPosition = function() {
  const boardCells = Array.from(document.querySelectorAll('.board-cell'))

  boardCells.forEach(cell => {
    this.coords = Object.assign({}, this.coords, {
      [cell.id]: { 
        x: cell.offsetLeft, 
        y: cell.offsetTop 
      }
    })
  })

  this.pieces = Array.from(document.querySelectorAll('.piece'))
  this.pieces.forEach(piece => {
    let index = piece.dataset.index

    piece.style.top = this.coords[index].y + 'px'   
    piece.style.left = this.coords[index].x + 'px'
  })

}

Piece.renderNextMove = function (e) {
  const moveFrom = e.target.dataset.index
  const html = document.querySelector('.board')

  this.nextMove.forEach((item) => {
    let next = createElement('div', { 
      'classes': ['piece', 'piece-next'], 
      'data': {
        'data-from': moveFrom, 
        'data-to': item 
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

Piece.move = function(e) {
  const _this = e.target.dataset

  this.oldNext.forEach(item => {
    item.classList.remove('next')
    item.removeEventListener('click', this.move.bind(this))
  })

  const elem = document.querySelector(`[data-index="${_this.from}"]`)
  elem.style.left = this.coords[_this.to].x +'px'
  elem.style.top = this.coords[_this.to].y +'px'
  elem.dataset.index = _this.to
  elem.classList.remove('active')
}

export default Piece
