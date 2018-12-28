import Game from './Game';
import { boardCoords } from '../utils/Constants';
import { createElement } from '../utils/Helpers';

const Pieces = Object.create(Game);

Pieces.setup = function(size, name) {
  this.init(size);
  this.name = name;
  this.elem = { [this.name]: [] };

  const NUMBER_OF_PIECES = 12;
  let i = 1;
  let currentRow = 0;
  let index = 1;

  while (i <= NUMBER_OF_PIECES) {
    let pieceIndex = 0;
    let pieceName = null;

    if (this.name === 'user') {
      pieceIndex = currentRow % 2 === 0 ? index * 2 : index + (index - 1);
      pieceName = boardCoords[2 - currentRow] + pieceIndex;
    } else {
      pieceIndex = currentRow % 2 === 0 ? index + (index - 1) : index * 2;
      pieceName = boardCoords[boardCoords.length - 1 - currentRow] + pieceIndex;
    }

    this.elem[this.name].push({
      html: createElement('div', {
        class: ['piece', this.name],
        data: { index: pieceName, king: false },
      }),
    });

    if (this.elem[this.name].length % 4 === 0) {
      currentRow++;
      index = 0;
    }

    index++;
    i++;
  }
};

Pieces.build = function(output) {
  this.insert(output);

  const key = Object.keys(this.elem)[0];

  this.elem[key].forEach(key => {
    let piece = key.html;
    let boardPosition = document.getElementById(piece.dataset.index);
    piece.style.left = `${boardPosition.offsetLeft}px`;
    piece.style.top = `${boardPosition.offsetTop}px`;
  });
};

Pieces.remove = function(type, item) {
  this.move_sound = document.getElementById('sound_move');
  const parent = document.querySelector('.board');
  const piece = document.querySelector(`.${type}[data-index="${item}"]`);
  parent.removeChild(piece);
};

export default Pieces;
