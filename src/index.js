import Board from './components/Board'
import Piece from './components/Piece'
import Result from './components/Result'

import { boardCoords } from './utils/Constants'

window.addEventListener('DOMContentLoaded', () => {
  const html = document.querySelector('.root')

  const newBoard = Object.create(Board)
  newBoard.setup({ w: 500, h: 500 }, boardCoords)
  newBoard.build(html) 

  const boardHtml = document.querySelector('.board')
  const newPieces = Object.create(Piece)
  newPieces.setup({ w: 52.5, h: 52.5 })
  newPieces.build(boardHtml)

  const newResult = Object.create(Result)
  newResult.setup({ w: 80, h: 150 })
  newResult.build(html)
})