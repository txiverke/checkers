import Game from './Game'
import { boardCoords } from '../utils/Constants'
import { createElement } from '../utils/Helpers'

const Player = Object.create(Game)

/**
 * SETUP
 * Creates the the User pieces
 * 
 * @param {Object}
 */
Player.setup = function (size, name) {
  this.init(size)
  this.elem = { [name]: [] }

  let count = 0
  let index = 1
  let down = 2

  for (var i = 1; i <= 12; i++) {
    let square = 0
    let id = 0

    if (name === 'user') {
      square = (count%2 === 0) ? index * 2 : (index + (index - 1))
      id = boardCoords.x[down] + square      
    } else {
      square = (count%2 === 0) ? (index + (index - 1)) : index * 2
      id = boardCoords.x[(boardCoords.x.length - 1) - count] + square
    }
     
    this.elem[name].push({
      html: createElement('div', { 
        classes: ['piece', name], 
        data: { 'index': id } 
      })
    })

    if (i%4 === 0) {
      count++
      index = 0
      if (name === 'user') down--
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
Player.build = function (output) {
  this.insert(output)

  const keys = Object.keys(this.elem)

  for (var i = 0; i < this.elem[keys[0]].length; i++) {
    let temp = this.elem[keys[0]][i].html.dataset.index
    document.querySelector(`[data-index="${temp}"]`).style.left = document.getElementById(temp).offsetLeft + 'px'
    //document.querySelector(`[data-index="${temp}"]`).sytle.top = document.getElementById(temp).offsetTop + 'px'
  }
}

export default Player
