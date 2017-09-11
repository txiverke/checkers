import Game from '../Game'

const newGame = Object.create(Game)
const output = document.createElement('div')

describe('Game', () => {
  test('init method', () => {
    newGame.init({ w: 500, h: 300 })

    expect(newGame.width).toBe(500)
    expect(newGame.height).toBe(300)
    expect(newGame.elem).toBe(null)
  })
})
