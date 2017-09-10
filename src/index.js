import Board from './components/Board'
import Piece from './components/Piece'

import { boardCoords } from './utils/Constants'

window.addEventListener('DOMContentLoaded', () => {
  const html = document.querySelector('.root')

  const newBoard = Object.create(Board)
  newBoard.setup(500, boardCoords)
  newBoard.build(html) 

  const board = document.querySelector('.board')
  const newPieces = Object.create(Piece)
  newPieces.setup(52.5)
  newPieces.build(board)
})