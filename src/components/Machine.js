import Player from './Player'

import { boardCoords } from '../utils/Constants'
import { getRandom } from '../utils/Helpers'

const Machine = Object.create(Player)

Machine.create = function(size, name, output) {
  Player.setup(size, name)
  Player.build(output)
}

/** 
 * This method is called from User 
 * so the keyword "this" is a reference of User  
 */
Machine.set = function () {
  Machine.history = this.history

  if (this.history.length === 1) {
    Machine.firstMove()
  }
  
}

Machine.firstMove = function () {
  const values = [1, 3, 5, 7]
  const r = getRandom(0, 4)
  const random = values[r]

  this.item = document.querySelector(`[data-index=F${random}]`)
  this.move()
}

Machine.move = function () {
  this.getCells()
  this.getCoords()

  const currentPos = (this.item.dataset.index).split('')
  const num = []
  const x = boardCoords.x

  switch (currentPos[1]) {
    case '1': num.push(2); break;
    case '8': num.push(7); break;
    default: num.push(Number(currentPos[1]) - 1, Number(currentPos[1]) + 1); 
  }
  
  const randomNum = num[getRandom(0, num.length)] 
  const item = x[x.findIndex(item => item === currentPos[0]) - 1] + randomNum

  this.item.style.top = `${this.cells[item].y}px`
  this.item.style.left = `${this.cells[item].x}px`

  delete this.coords.machine[this.item.dataset.index]

  this.coords.machine = Object.assign({}, this.coords.machine, {
    [item]: {
      x: this.cells[item].x,
      y: this.cells[item].y,
      type: 'machine' }
  })
  this.history.push({ user: false, from: this.item.dataset.index, to: item })
  console.log(this.history)
}

export default Machine
