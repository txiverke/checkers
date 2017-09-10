import Game from './Game'

import { createElement } from '../utils/Helpers'
import { boardCoords } from '../utils/Constants'

const Piece = Object.create(Game)

Piece.setup = function(size) {
  this.init(size, this.elemArr)
  this.elemArr = { black: [], red: [] }

  const teams = Object.keys(this.elemArr)

  for(var key in teams) {
    let count = 0
    let index = 1
    let down = 2

    for (var i = 1; i <= 12; i++) {
      let currentKey = teams[key]
      let id = 0
      let square = 0      

      if (currentKey === 'black') {
        square = (count%2 === 0) ? (index + (index - 1)) : index * 2
        id = boardCoords.x[(boardCoords.x.length - 1) - count] + square

        if (i%4 === 0) {
           count++
           index = 0
        }

        index++
      } else {
        square = (count%2 === 0) ? index * 2 : (index + (index - 1))
        id = boardCoords.x[down] + square

        if (i%4 === 0) {
          count++
          index = 0
          down--
        }
        
        index++
      }

      this.elemArr[currentKey].push({
        id,
        html: createElement('div', ['piece'], {'data-id': id})
      })

    }
  }
}

Piece.build = function(output) {
  this.insert(output)
}

export default Piece
