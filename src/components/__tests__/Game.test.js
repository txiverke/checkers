import Game from '../Game'

const newGame = Object.create(Game)
const output = document.createElement('div')

describe('Game', () => {
  test('init method', () => {
    newGame.init(500)

    expect(newGame.width).toBe(500)
    expect(newGame.height).toBe(500)
    expect(newGame.elem).toBe(null)
  })
})
