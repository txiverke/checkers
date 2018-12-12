import Pieces from './Pieces';
import Machine from './Machine';
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
  this.nextMove = [];
  this.piece = '';
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
  if (state.history.length % 2 === 0 && !this.clicked) {
    this.piece = e.target;

    let [char, int] = this.piece.dataset.index.split('');
    const num = [];

    switch (int) {
      case '1':
        if (this.moveAvailable(2)) {
          num.push(2);
        }
        break;

      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
        int = Number(int);
        if (this.moveAvailable(int - 1)) {
          num.push(int - 1);
        }
        if (this.moveAvailable(int + 1)) {
          num.push(int + 1);
        }
        break;

      case '8':
        if (this.moveAvailable(7)) {
          num.push(7);
        }
        break;

      default:
        return false;
    }

    if (num.length > 0) {
      this.clicked = true;

      num.forEach(item => {
        let temp = board[board.findIndex(item => item === char) + 1] + item;
        this.nextMove.push(temp);
      });

      e.target.classList.add('active');
      this.showOptions();
    }
  }
};

User.moveAvailable = function(num) {
  let [char, int] = this.piece.dataset.index.split('');
  char = board[board.findIndex(b => b === char) + 1];

  return !state.user.includes(char + num);
};

User.showOptions = function() {
  const board = document.querySelector('.board');
  const moveFrom = this.piece.dataset.index;

  this.nextMove.forEach(item => {
    let next = createElement('div', {
      classes: ['piece', 'piece-next'],
      data: { from: moveFrom, to: item },
    });

    next.style.left = state.coords[item].x + 'px';
    next.style.top = state.coords[item].y + 'px';
    next.addEventListener('click', this.move.bind(this));

    board.appendChild(next);
  });
};

User.move = function(e) {
  const target = e.target.dataset;
  this.piece.style.left = state.coords[target.to].x + 'px';
  this.piece.style.top = state.coords[target.to].y + 'px';
  this.piece.dataset.index = target.to;

  this.resetUser(document.querySelectorAll('.piece-next'));

  state.update('user', target.from, target.to);
  state.set('history', { user: true, from: target.from, to: target.to });

  setTimeout(() => {
    Machine.start();
  }, 500);
};

User.resetUser = function(arr) {
  arr.forEach(item => document.querySelector('.board').removeChild(item));
  this.elem.user.forEach(item => item.html.classList.remove('active'));
  this.clicked = false;
  this.nextMove = [];
};

export default User;
