import Game from './Game';
import { createElement } from '../utils/Helpers';
import state from './state';

import { boardCoords as coords } from '../utils/Constants';

Board.prototype = Object.create(Game.prototype);

function Board(size) {
  Game.call(this, size);
  this.setup();
}

Board.prototype.setup = function() {
  this.board = [];
  this.elem = createElement('article', { class: ['board'] });

  for (var i = 0, l = coords.length; i < l; i++) {
    for (var j = 1; j <= l; j++) {
      this.board.push(coords[coords.length - i - 1] + j);
    }
  }

  this.board
    .map((item, index) => {
      let breakline = index % 8 === 0 && index !== 0 ? '<br />' : '';
      this.elem.innerHTML += `${breakline}<div id=${item} class="board-cell"></div>`;
    })
    .join('');
};

Board.prototype.build = function(output) {
  this.insert(output);
  this.getCoords();
};

Board.prototype.getCoords = function() {
  const cells = document.querySelectorAll('.board-cell');

  cells.forEach(cell => {
    state.coords[cell.id] = { x: cell.offsetLeft, y: cell.offsetTop };
  });
};

export default Board;
