import Pieces from './Pieces';
import { boardCoords as board } from '../utils/Constants';
import { getRandom } from '../utils/Helpers';
import state from './state';

const Machine = Object.create(Pieces);

Machine.create = function(size, name, output) {
  this.setup(size, name);
  this.build(output);
  this.bind();
};

Machine.bind = function() {
  this.elem.machine.forEach(item =>
    state.set('machine', item.html.dataset.index),
  );
};

Machine.start = function() {
  this.nextMoves = [];
  this.piece = '';
  this.moveAvailable();
};

Machine.moveAvailable = function() {
  let elem = '';
  let itemArr = [];

  state.machine.forEach(item => {
    itemArr = item.split('');
    elem = board[board.findIndex(b => b === itemArr[0]) - 1];

    if (itemArr[1] === '1') {
      elem = elem + '2';
    } else if (itemArr[1] === '8') {
      elem = elem + '7';
    } else {
      elem = [elem + (Number(itemArr[1]) - 1), elem + (Number(itemArr[1]) + 1)];
    }

    if (Array.isArray(elem)) {
      elem.forEach(n => {
        if (!state.machine.includes(n) && !this.nextMoves.includes(n)) {
          this.nextMoves.push({ from: item, to: n });
        }
      });
    } else if (!state.machine.includes(elem)) {
      this.nextMoves.push({ from: item, to: elem });
    }
  });

  this.setMove();
};

Machine.setMove = function() {
  const r = getRandom(0, this.nextMoves.length);
  const random = this.nextMoves[r];

  this.piece = document.querySelector(`[data-index=${random.from}]`);
  this.moveTo = random.to;

  this.move();
};

Machine.move = function() {
  let moveFrom = this.piece.dataset.index;

  this.piece.style.top = `${state.coords[this.moveTo].y}px`;
  this.piece.style.left = `${state.coords[this.moveTo].x}px`;
  this.piece.dataset.index = this.moveTo;

  state.update('machine', moveFrom, this.moveTo);
  
  state.set('history', {
    user: false,
    from: moveFrom,
    to: this.moveTo,
  });
};

export default Machine;
