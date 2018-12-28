import { getType } from '../utils/Helpers';

const Game = {
  /**
   * Initializes the Object properties
   * @param {object} size
   */
  init(size) {
    this.width = size.w || 0;
    this.height = size.h || 0;
    this.sizeType = size.t || 'px';
    this.elem = {};
  },
  /**
   * Adds the html nodes to the DOM
   * @param {string} output
   */
  insert(output) {
    switch (getType(this.elem)) {
      case 'HTMLElement':
        this.elem.style.width = `${this.width}${this.sizeType}`;
        this.elem.style.height = `${this.height}${this.sizeType}`;
        output.appendChild(this.elem);
        break;

      case 'Object':
        Object.keys(this.elem).forEach(key => {
          this.elem[key].forEach(item => {
            item.html.style.width = `${this.width}${this.sizeType}`;
            item.html.style.height = `${this.height}${this.sizeType}`;
            output.appendChild(item.html);
          });
        });
        break;
    }
  },
};

export default Game;
