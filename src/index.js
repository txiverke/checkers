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
  const user1 = Object.create(User)
  user1.create({ w: 52.5, h: 52.5 }, 'user', boardHtml)

  const user2 = Object.create(Machine)
  user2.create({ w: 52.5, h: 52.5 }, 'machine', boardHtml)

  const newResult = Object.create(Result)
  newResult.setup({ w: 80, h: 150 })
  newResult.build(html)
})