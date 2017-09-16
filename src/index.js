import Board from './components/Board'
import Player from './components/Player'
import Result from './components/Result'

import { boardCoords } from './utils/Constants'

window.addEventListener('DOMContentLoaded', () => {
  const html = document.querySelector('.root')

  const newBoard = Object.create(Board)
  newBoard.setup({ w: 500, h: 500 }, boardCoords)
  newBoard.build(html) 

  const boardHtml = document.querySelector('.board')
  const newPlayer = Object.create(Player)
  newPlayer.setup({ w: 52.5, h: 52.5 })
  newPlayer.build(boardHtml)

  const newResult = Object.create(Result)
  newResult.setup({ w: 80, h: 150 })
  newResult.build(html)
})