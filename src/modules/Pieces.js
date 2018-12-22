import Game from './Game';
import { boardCoords } from '../utils/Constants';
import { createElement } from '../utils/Helpers';

const Pieces = Object.create(Game);

Pieces.setup = function(size, name) {
  this.init(size);
  this.elem = { [name]: [] };

  let count = 0;
  let index = 1;
  let down = 2;

  for (var i = 1; i <= 12; i++) {
    let square = 0;
    let id = 0;

    if (name === 'user') {
      square = count % 2 === 0 ? index * 2 : index + (index - 1);
      id = boardCoords[down] + square;
    } else {
      square = count % 2 === 0 ? index + (index - 1) : index * 2;
      id = boardCoords[boardCoords.length - 1 - count] + square;
    }
 
    this.elem[name].push({
      html: createElement('div', {
        classes: ['piece', name],
        data: { index: id },
      }),
    });

    if (i % 4 === 0) {
      count++;
      index = 0;
      if (name === 'user') down--;
    }

    index++;
  }
};

Pieces.build = function(output) {
  this.insert(output);

  const keys = Object.keys(this.elem);

  for (var i = 0; i < this.elem[keys[0]].length; i++) {
    let item = this.elem[keys[0]][i].html;
    let index = item.dataset.index;
    let target = document.getElementById(index);

    item.style.left = target.offsetLeft + 'px';
    item.style.top = target.offsetTop + 'px';
  }
};

Pieces.remove = function(type, item) {
  const parent = document.querySelector('.board');
  const piece = document.querySelector(`.${type}[data-index="${item}"]`);
  parent.removeChild(piece);
};

export default Pieces;
