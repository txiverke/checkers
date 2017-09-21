import Player from './Player'

const User = Object.create(Player)

User.create = function(size, name, output) {
  Player.setup(size, name)
  Player.build(output)
}

/**
User.setDefault = function () {
  const boardCells = Array.from(document.querySelectorAll('.board-cell'))

  this.board = Board.get.bind(Board)()
  console.log('user', this.board)

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
  
  console.log(this.coords)
  Machine.start.call(Machine)
}
*/

export default User
