import Pieces from './Pieces';
import { boardCoords } from '../utils/Constants';
import { getRandom } from '../utils/Helpers';
import state from './state';

const Machine = Object.create(Pieces);

Machine.create = function(size, name, output) {
  this.setup(size, name);
  this.build(output);
  this.bind();
  this.piece = ''
};

Machine.bind = function() {
  this.elem.machine.forEach(item =>
    state.set('machine', item.html.dataset.index),
  );
};

Machine.start = function() {
  if (state.history.length === 1) {
    Machine.firstMove();
  }
};

Machine.firstMove = function() {
  const values = [1, 3, 5, 7];
  const r = getRandom(0, 4);
  const random = values[r];

  this.piece = document.querySelector(`[data-index=F${random}]`);
  this.move();
};

Machine.move = function() {
  const currentPos = this.piece.dataset.index.split('');
  const num = [];
  const x = boardCoords;

  switch (currentPos[1]) {
    case '1':
      num.push(2);
      break;
    case '8':
      num.push(7);
      break;
    default:
      num.push(Number(currentPos[1]) - 1, Number(currentPos[1]) + 1);
  }

  const randomNum = num[getRandom(0, num.length)];
  const item = x[x.findIndex(item => item === currentPos[0]) - 1] + randomNum;

  this.piece.style.top = `${state.coords[item].y}px`;
  this.piece.style.left = `${state.coords[item].x}px`;

  //state.update('machine', currentPos, item)
  state.set('history', { user: false, from: this.piece.dataset.index, to: item });

};

export default Machine;
