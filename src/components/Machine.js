import Player from './Player'

const Machine = Object.create(Player)

Machine.create = function(size, name, output) {
  Player.setup(size, name)
  Player.build(output)
}

export default Machine
