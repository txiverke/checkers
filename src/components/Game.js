import { getType } from '../utils/Helpers'

const Game = {
  /**
   * Initializes the Object properties
   * @param {object} size 
   */
  init(size) {
    this.width = size.w || 0 
    this.height = size.h || 0
    this.elem = null
    this.coords = {}
    this.pieces = []
    this.nextMove = []
  },
  /**
   * Adds the html nodes to the DOM
   * @param {string} output 
   */
  insert(output) {
    switch (getType(this.elem)) {
      case 'HTMLDivElement':
        this.elem.style.width = this.width + 'px'
        this.elem.style.height = this.height + 'px'

        output.appendChild(this.elem)
        break
      
      case 'Object':
        const keys = Object.keys(this.elem)
        
        keys.forEach(key => {
          this.elem[key].forEach(item => {
            item.html.classList.add(key)
            item.html.style.width = `${this.width}px`
            item.html.style.height = `${this.height}px`
            
            output.appendChild(item.html)
          })
        })
        break
    }
  }
}

export default Game