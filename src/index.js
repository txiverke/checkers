import Board from './components/Board'
import User from './components/User'
import Machine from './components/Machine'
import Result from './components/Result'

import { boardCoords } from './utils/Constants'

window.addEventListener('DOMContentLoaded', () => {
  const html = document.querySelector('.root')

  const newBoard = Object.create(Board)
  newBoard.setup({ w: 500, h: 500 }, boardCoords)
  newBoard.build(html) 

  const boardHtml = document.querySelector('.board')
  const newUser = Object.create(User)
  newUser.setup({ w: 52.5, h: 52.5 })
  newUser.build(boardHtml)

  const newMachine = Object.create(Machine)
  newMachine.setup({ w: 52.5, h: 52.5 })
  newMachine.build(boardHtml)

  const newResult = Object.create(Result)
  newResult.setup({ w: 80, h: 150 })
  newResult.build(html)
})