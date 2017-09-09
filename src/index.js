import Board from './components/Board'

window.addEventListener('DOMContentLoaded', () => {
  const html = document.querySelector('.root')

  const newBoard = Object.create(Board)
  newBoard.setup()
  newBoard.build(html) 
})