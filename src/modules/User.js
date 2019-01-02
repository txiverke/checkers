import Pieces from './Pieces';
import Result from './Result';
import { boardCoords as board } from '../utils/Constants';
import { createElement } from '../utils/Helpers';
import state from './state';

User.prototype = Object.create(Pieces.prototype);

function User(size) {
  Pieces.call(this, size, 'user');

  this.bind();
  this.clicked = false;
}

User.prototype.bind = function() {
  this.elem.user.forEach(item => {
    state.set('user', item.html.dataset.index);
    item.html.addEventListener('click', this.click.bind(this));
  });
};

User.prototype.click = function(e) {
  if (state.history.length % 2 === 0 && !this.clicked) {
    this.piece = e.target;
    this.nextMoves = [];
    this.nextEnemies = [];

    this.movesAvailable();
    this.enemiesAvailable();

    if (this.nextMoves.length > 0) {
      this.clicked = true;
      e.target.classList.add('active');
      this.showMoves();
    }
  }
};

User.prototype.movesAvailable = function() {
  let [char, int] = this.piece.dataset.index.split('');
  let elem = board[board.findIndex(b => b === char) + 1];
  int = Number(int);

  if (int === 1) {
    elem = elem + 2;
  } else if (int === 8) {
    elem = elem + 7;
  } else {
    elem = [elem + (int - 1), elem + (int + 1)];
  }

  if (Array.isArray(elem)) {
    elem.forEach(n => {
      if (!state.user.includes(n) && !this.nextMoves.includes(n)) {
        this.nextMoves.push(n);
      }
    });
  } else if (!state.user.includes(elem)) {
    this.nextMoves.push(elem);
  }
};

User.prototype.enemiesAvailable = function() {
  const [char, int] = this.piece.dataset.index.split('');
  let nextEnemies = [];
  let nextChar, nextInt;

  state.machine.forEach(item => {
    if (this.nextMoves.includes(item)) {
      nextEnemies = item.split('');
      nextChar = board[board.findIndex(b => b === nextEnemies[0]) + 1];
      nextInt = Number(nextEnemies[1]);

      if (
        /**
         * If the nextMove goes out of the board
         * it is removed from the nextMoves Array
         */
        nextInt === 8 ||
        nextInt === 1 ||
        (nextChar === undefined &&
          state.machine.includes(nextChar + (nextInt + 1)))
      ) {
        this.nextMoves.splice(this.nextMoves.findIndex(el => el === item), 1);
      } else if (
        /**
         *  Add move to nextEnemies to right cell
         */
        nextInt > int &&
        nextInt < 8 &&
        nextChar !== undefined &&
        !state.machine.includes(nextChar + (nextInt + 1)) &&
        !state.user.includes(nextChar + (nextInt + 1))
      ) {
        this.nextEnemies.push({
          from: char + int,
          to: nextChar + (nextInt + 1),
          remove: item,
        });
      } else if (
        /**
         * Add move to nextEnemies to left cell
         */
        nextInt < int &&
        nextInt > 1 &&
        nextChar !== undefined &&
        !state.machine.includes(nextChar + (nextInt - 1)) &&
        !state.user.includes(nextChar + (nextInt - 1))
      ) {
        this.nextEnemies.push({
          from: char + int,
          to: nextChar + (nextInt - 1),
          remove: item,
        });
      } else if (
        /**
         * Removes item from nextMoves, it is not possible to kill
         * bc there are machine pieces protecting
         */
        (nextInt > int && state.machine.includes(nextChar + (nextInt + 1))) ||
        nextChar === undefined ||
        ((nextInt < int && state.machine.includes(nextChar + (nextInt - 1))) ||
          nextChar === undefined)
      ) {
        this.nextMoves.splice(this.nextMoves.findIndex(el => el === item), 1);
      }
    }
  });
};

User.prototype.showMoves = function() {
  const board = document.querySelector('.board');
  const moveFrom = this.piece.dataset.index;

  if (this.nextEnemies.length) {
    this.nextMoves = [];
    this.nextMoves.push(this.nextEnemies[0].remove);
  }

  this.nextMoves.forEach(item => {
    let next = createElement('div', {
      class: ['piece', 'piece-next'],
      data: { from: moveFrom, to: item },
    });

    next.style.left = state.coords[item].x + 'px';
    next.style.top = state.coords[item].y + 'px';

    if (this.nextEnemies.length) {
      next.addEventListener('click', this.kill.bind(this));
    } else {
      next.addEventListener('click', this.move.bind(this));
    }

    board.appendChild(next);
  });
};

User.prototype.kill = function(e) {
  const { from, to, remove } = this.nextEnemies[0];
  this.piece.style.left = state.coords[to].x + 'px';
  this.piece.style.top = state.coords[to].y + 'px';
  this.piece.dataset.index = to;

  state.delete('machine', remove);

  this.remove('machine', remove);
  this.update(from, to);

  state.increase(this);
  this.move_sound.currentTime = 0;
  this.move_sound.play();
};

User.prototype.move = function(e) {
  const target = e.target.dataset;
  this.piece.style.left = state.coords[target.to].x + 'px';
  this.piece.style.top = state.coords[target.to].y + 'px';
  this.piece.dataset.index = target.to;
  this.update(target.from, target.to);
};

User.prototype.update = function(from, to) {
  this.resetUser();

  state.update('user', from, to);
  state.set('history', { user: true, from, to });

  if (state.machine.length === 0) {
    console.log(`Hey ${this.name}, you won!!!!`);
  }
};

User.prototype.resetUser = function() {
  document
    .querySelectorAll('.piece-next')
    .forEach(item => document.querySelector('.board').removeChild(item));

  this.elem.user.forEach(item => item.html.classList.remove('active'));
  this.clicked = false;
};

export default User;
