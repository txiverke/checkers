const Game = {
  init(size, elemArr) {
    this.width = size 
    this.height = size
    this.elem = null
    this.elemArr = elemArr || null
    this.coords = {}
    this.pieces = []
  },
  insert(output) {
    if (this.elemArr) {
      const elemObj = Object.keys(this.elemArr)

      for (var key in elemObj) {
        let color = elemObj[key] === 'black' ? 'black' : 'red'

        for (var i = 0; i < this.elemArr[elemObj[key]].length; i++) {
          this.elemArr[elemObj[key]][i].html.style.background = color
          this.elemArr[elemObj[key]][i].html.style.width = this.width + 'px'
          this.elemArr[elemObj[key]][i].html.style.height = this.height + 'px'

          output.appendChild(this.elemArr[elemObj[key]][i].html)
        }
      }
    }

    if(this.elem) {
      this.elem.style.width = this.width + 'px'
      this.elem.style.height = this.height + 'px'

      output.appendChild(this.elem)
    }


  }
}

export default Game