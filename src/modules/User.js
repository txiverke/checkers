import Pieces from './Pieces';
import Machine from './Machine';
import Result from './Result'
import { boardCoords as board } from '../utils/Constants';
import { createElement } from '../utils/Helpers';
import state from './state';

const User = Object.create(Pieces);

/**
 * Initializes User object properties
 * @param {object} size
 * @param {string} name
 * @param {HTMLElement} output
 */
User.create = function(size, name, output) {
  this.setup(size, name);
  this.build(output);
  this.bind();
  this.clicked = false;
};

/**
 * Binds User pieces to click event
 */
User.bind = function() {
  this.elem.user.forEach(item => {
    state.set('user', item.html.dataset.index);
    item.html.addEventListener('click', this.click.bind(this));
  });
};

/**
 * Creates an array with the potential moves
 * @param {event} e
 */
User.click = function(e) {
  console.log(state.result)
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

User.movesAvailable = function() {
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

User.enemiesAvailable = function() {
  let [char, int] = this.piece.dataset.index.split('');
  let nextEnemies = [];
  let nextChar, nextInt;

  state.machine.forEach(item => {
    if (this.nextMoves.includes(item)) {
      nextEnemies = item.split('');
      nextChar = board[board.findIndex(b => b === nextEnemies[0]) + 1];
      nextInt = Number(nextEnemies[1]);

      if (nextInt > int && !state.machine.includes(nextChar + (nextInt + 1))) {
        this.nextEnemies.push(nextChar + (nextInt + 1));
      } else if (
        nextInt < int &&
        !state.machine.includes(nextChar + (nextInt - 1))
      ) {
        this.nextEnemies.push(nextChar + (nextInt - 1));
      }
    }
  });
};

User.showMoves = function() {
  const board = document.querySelector('.board');
  const moveFrom = this.piece.dataset.index;

  this.nextMoves.forEach(item => {
    let next = createElement('div', {
      classes: ['piece', 'piece-next'],
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

User.kill = function(e) {
  const newPosition = this.nextEnemies[0];
  const target = e.target.dataset.to;
  this.piece.style.left = state.coords[newPosition].x + 'px';
  this.piece.style.top = state.coords[newPosition].y + 'px';
  this.piece.dataset.index = newPosition;

  state.delete('machine', target);

  this.remove('machine', target);
  this.update(target, newPosition);

  Result.increase('user')
};

User.move = function(e) {
  const target = e.target.dataset;
  this.piece.style.left = state.coords[target.to].x + 'px';
  this.piece.style.top = state.coords[target.to].y + 'px';
  this.piece.dataset.index = target.to;
  this.update(target.from, target.to);
};

User.update = function(from, to) {
  this.resetUser();

  state.update('user', from, to);
  state.set('history', { user: true, from, to });

  setTimeout(() => {
    Machine.start();
  }, 500);
};

User.resetUser = function() {
  document
    .querySelectorAll('.piece-next')
    .forEach(item => document.querySelector('.board').removeChild(item));

  this.elem.user.forEach(item => item.html.classList.remove('active'));
  this.clicked = false;
  this.nextMove = [];
};

export default User;
