import Pieces from './Pieces';
import Result from './Result';
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
  this.nextEnemies = [];
  this.nextMoves = [];
  this.piece = '';
  this.moveAvailable();
  this.usersAvailable();
  this.setMove();
};

Machine.moveAvailable = function() {
  state.machine.forEach(item => {
    let [char, int] = item.split('');
    let elem = board[board.findIndex(b => b === char) - 1];
    int = Number(int);

    if (int === 1) {
      elem = elem + '2';
    } else if (int === 8) {
      elem = elem + '7';
    } else {
      elem = [elem + (int - 1), elem + (int + 1)];
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
};

Machine.usersAvailable = function() {
  const users = state.user;
  const machine = this.nextMoves;

  for (let i = 0, l = users.length; i < l; i++) {
    for (let j = 0, len = machine.length; j < len; j++) {
      let nextEnemy = users[i];
      let [char, int] = nextEnemy.split('');
      let nextMachine = machine[j];
      let [fromChar, fromInt] = nextMachine.from.split('');
      let [toChar, toInt] = nextMachine.to.split('');
      let nextChar = board[board.findIndex(b => b === toChar) - 1];
      let target = undefined;
      fromInt = Number(fromInt);
      toInt = Number(toInt);

      if (fromInt > toInt && toInt > 1) {
        target = nextChar + (toInt - 1);
      } else if (fromInt < toInt && toInt < 8) {
        target = nextChar + (toInt + 1);
      }

      if (
        target &&
        users.includes(nextMachine.to) &&
        !this.nextEnemies.includes(nextMachine.to) &&
        !users.includes(target) &&
        !machine.includes(target)
      ) {
        this.nextEnemies.push({
          from: machine[j].from,
          to: target,
          remove: machine[j].to,
        });
        break;
      }
    }
  }
};

Machine.setMove = function() {
  if (this.nextEnemies.length === 0) {
    const r = getRandom(0, this.nextMoves.length);
    const random = this.nextMoves[r];
    this.piece = document.querySelector(`.machine[data-index=${random.from}]`);
    this.moveTo = random.to;
    this.move();
  } else {
    const move = this.nextEnemies[0];
    this.piece = document.querySelector(`.machine[data-index=${move.from}]`);
    this.moveTo = move.to;
    this.removeUser = move.remove;
    this.kill();
  }
};

Machine.move = function() {
  let moveFrom = this.piece.dataset.index;

  this.piece.style.top = `${state.coords[this.moveTo].y}px`;
  this.piece.style.left = `${state.coords[this.moveTo].x}px`;
  this.piece.dataset.index = this.moveTo;
  this.update(moveFrom, this.moveTo);
};

Machine.kill = function() {
  let moveFrom = this.piece.dataset.index;

  this.piece.style.top = `${state.coords[this.moveTo].y}px`;
  this.piece.style.left = `${state.coords[this.moveTo].x}px`;
  this.piece.dataset.index = this.moveTo;

  state.delete('user', this.removeUser);
  this.remove('user', this.removeUser);
  this.update(moveFrom, this.moveTo);

  Result.increase.call(this);
};

Machine.update = function(from, to) {
  state.update('machine', from, to);

  state.set('history', {
    user: false,
    from,
    to,
  });
};

export default Machine;
