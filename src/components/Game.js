const Game = {
  init(name) {
    this.elem = null
    this.start = false    
  },
  insert(output) {
    if(this.elem) {
      output.appendChild(this.elem)
    }
  }
}

export default Game