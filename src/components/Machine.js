import Player from './Player'

const Machine = Object.create(Player)

Machine.create = function(size, name, output) {
  Player.setup(size, name)
  Player.build(output)
}

Machine.set = function () {
  this.getCoords()
  if (this.history.length === 1) {
    Machine.firstMove()
  }
}

Machine.firstMove = function () {
  const values = [1, 3, 5, 7]
  const random = Math.floor(Math.random() * 4)
  console.log(random)
}

export default Machine
