import Pieces from './Pieces';

import { boardCoords as board } from '../utils/Constants';
import { getRandom } from '../utils/Helpers';
import state from './state';

Object.setPrototypeOf(Machine.prototype, Pieces.prototype);

function Machine(size) {
  Pieces.call(this, size, 'machine');
  this.bind();
}

Machine.prototype.bind = function() {
  this.elem.machine.forEach(item =>
    state.set('machine', item.html.dataset.index),
  );

  state.registerListener('history', () => {
    if (state.history.length % 2 !== 0) {
      this.start();
    }
  });
};

Machine.prototype.start = function() {
  this.nextEnemies = [];
  this.nextMoves = [];
  this.piece = '';
  this.cellsAvailable();
  this.usersAvailable();

  setTimeout(() => {
    this.setMove();
  }, 1000);
};

/**
 * Fill nextMoves prop with the moves
 * available checking the empty cells
 */
Machine.prototype.cellsAvailable = function() {
  state.machine.forEach(from => {
    let [char, int] = from.split('');
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
      elem.forEach(to => {
        if (!state.machine.includes(to) && !this.nextMoves.includes(to)) {
          this.nextMoves.push({ from, to });
        }
      });
    } else if (!state.machine.includes(elem)) {
      this.nextMoves.push({ from, to: elem });
    }
  });
};

/**
 * Fill the nextEnemies array when there are
 * user pieces that could be killed
 */
Machine.prototype.usersAvailable = function() {
  const users = state.user;
  const machine = this.nextMoves;

  for (let i = 0, l = users.length; i < l; i++) {
    for (let j = 0, len = machine.length; j < len; j++) {
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
        !users.includes(target) &&
        !machine.includes(target)
      ) {
        if (this.nextEnemies.length && this.nextEnemies[0].to === target) break;

        this.nextEnemies.push({
          from: machine[j].from,
          to: target,
          remove: machine[j].to,
        });
      }
    }
  }
};

/**
 * Remove form the nextMoves Array the user pieces
 * that cannot be killed
 */
Machine.prototype.checkUserPieces = function() {
  const users = state.user;
  const machine = this.nextMoves;
  const result = [...machine];

  for (let j = 0, len = machine.length; j < len; j++) {
    if (users.includes(machine[j].to)) {
      result.splice(result.findIndex(el => el.to === machine[j].to), 1);
    }
  }

  this.nextMoves = result;
};

Machine.prototype.checkMachinePieces = function() {
  const machine = state.machine;
  const enemies = this.nextEnemies;
  const result = [...enemies];

  for (let j = 0, len = enemies.length; j < len; j++) {
    if (machine.includes(enemies[j].to)) {
      result.splice(result.findIndex(el => el.to === enemies[j].to), 1);
    }
  }

  this.nextEnemies = result;
};

Machine.prototype.setMove = function() {
  console.log('prev', this.nextEnemies);
  if (this.nextEnemies.length) this.checkMachinePieces();
  console.log('next', this.nextEnemies);
  if (this.nextEnemies.length === 0) {
    this.checkUserPieces();
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

Machine.prototype.move = function() {
  let moveFrom = this.piece.dataset.index;

  this.piece.style.top = `${state.coords[this.moveTo].y}px`;
  this.piece.style.left = `${state.coords[this.moveTo].x}px`;
  this.piece.dataset.index = this.moveTo;

  this.update(moveFrom, this.moveTo);
};

Machine.prototype.kill = function() {
  let moveFrom = this.piece.dataset.index;

  this.piece.style.top = `${state.coords[this.moveTo].y}px`;
  this.piece.style.left = `${state.coords[this.moveTo].x}px`;
  this.piece.dataset.index = this.moveTo;

  state.delete('user', this.removeUser);
  this.remove('user', this.removeUser);
  this.update(moveFrom, this.moveTo);

  this.move_sound.currentTime = 0;
  this.move_sound.play();

  state.increase(this)
};

Machine.prototype.update = function(from, to) {
  state.update('machine', from, to);

  state.set('history', {
    user: false,
    from,
    to,
  });
};

export default Machine;
