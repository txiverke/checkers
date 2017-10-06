import Player from './Player'
import Machine from './Machine'
import { boardCoords } from '../utils/Constants'
import { createElement } from '../utils/Helpers'

const User = Object.create(Player)

User.create = function(size, name, output) {
  this.setup(size, name)
  this.build(output)
  this.coords = {}
  this.elem.user.forEach((item) => {
    let index = item.html.dataset.index

    this.coords = Object.assign({}, this.coords, {
      [item.html.dataset.index]: {
        x: document.getElementById(index).offsetLeft,
        y: document.getElementById(index).offsetTop,
        user: true,
      }
    })

    item.html.addEventListener('click', this.click.bind(this))    
  })
}

User.click = function (e) {
  if (this.history.length%2 === 0) {
    this.getCells()
    this.getCoords()
    this.item = e.target
    this.nextMove = []

    const currentPos = (this.item.dataset.index).split('')
    const num = []
    const x = boardCoords.x
  
    switch (currentPos[1]) {
      case '1': num.push(2); break;
      case '8': num.push(7); break;
      default: num.push(Number(currentPos[1]) - 1, Number(currentPos[1]) + 1); 
    }

    num.forEach((item) => {
      let temp = x[x.findIndex(item => item === currentPos[0]) + 1] + item

      if (!this.coords.user[temp]) {
        this.nextMove.push(temp)
      } 
    })

    if (this.nextMove.length > 0) {
      e.target.classList.add('active')      
      this.showNextOptions()
    }
  }
}

User.showNextOptions = function () {
  const moveFrom = this.item.dataset.index
  const html = document.querySelector('.board')
  const oldNextMoves = document.querySelectorAll('.piece-next')
  
  if (oldNextMoves.length > 0) this.hideNextOptions(oldNextMoves)

  this.nextMove.forEach((item) => {
    let next = createElement('div', { 
      'classes': ['piece', 'piece-next'], 
      'data': { 'from': moveFrom, 'to': item } 
    })

    next.style.left = this.cells[item].x + 'px'
    next.style.top = this.cells[item].y + 'px'
    next.addEventListener('click', this.move.bind(this))

    html.appendChild(next)
  })
}

User.move = function (e) {
  const target = e.target.dataset
  this.item.style.left = this.cells[target.to].x +'px'
  this.item.style.top = this.cells[target.to].y +'px'
  this.item.dataset.index = target.to

  delete this.coords.user[target.from]

  this.coords.user = Object.assign({}, this.coords.user, {
    [target.to]: {
      x: this.cells[target.to].x,
      y: this.cells[target.to].y,
      type: 'user' }
  })

  this.hideNextOptions(document.querySelectorAll('.piece-next'))
  this.history.push({ user: true, from: target.from, to: target.to })

  setTimeout(() => {
    Machine.set.call(this)
  }, 500)
  
}

User.hideNextOptions = function (arr) {
  const parent = document.querySelector('.board')
  arr.forEach(item => parent.removeChild(item))
  this.elem.user.forEach(item => item.html.classList.remove('active'))
}

export default User
