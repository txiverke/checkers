import Board from '../Board'
import { boardCoords } from '../../utils/Constants'

const newBoard = Object.create(Board)
newBoard.setup({ w: 300, h: 250 }, boardCoords)

describe('Board', () => {
  test('creates the board', () => {
    expect(newBoard.elem.classList[0]).toBe('board')
    expect(newBoard.elem.childNodes[0].classList[0]).toBe('board-cell')
  })
})