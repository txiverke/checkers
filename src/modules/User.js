import Pieces from './Pieces';
import Machine from './Machine';
import { boardCoords } from '../utils/Constants';
import { createElement } from '../utils/Helpers';
import state from './state';

const User = Object.create(Pieces);

User.create = function(size, name, output) {
  this.setup(size, name);
  this.build(output);
  this.bind();
  this.nextMove = [];
  this.piece = '';
  this.clicked = false;
};

User.bind = function() {
  this.elem.user.forEach(item => {
    state.set('user', item.html.dataset.index);
    item.html.addEventListener('click', this.click.bind(this));
  });
};

User.click = function(e) {
  if (state.history.length % 2 === 0 && !this.clicked) {
    this.clicked = true;
    this.piece = e.target;
    const piecePosition = this.piece.dataset.index.split('');
    const num = [];
    const board = boardCoords;
    const userCoords = state.get('user');

    switch (piecePosition[1]) {
      case '1':
        num.push(2);
        break;
      case '8':
        num.push(7);
        break;
      default:
        num.push(Number(piecePosition[1]) - 1, Number(piecePosition[1]) + 1);
    }

    num.forEach(item => {
      let temp =
        board[board.findIndex(item => item === piecePosition[0]) + 1] + item;

      if (!userCoords[temp]) {
        this.nextMove.push(temp);
      }
    });

    e.target.classList.add('active');
    this.showOptions();
  }
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
  this.resetOptions(document.querySelectorAll('.piece-next'));

  state.update('user', target.from, target.to);
  state.set('history', { user: true, from: target.from, to: target.to });

  setTimeout(() => {
    if (state.history.length === 1) {
      Machine.start();
    } else {
      Machine.move();
    }
  }, 500);
};

User.resetOptions = function(arr) {
  const parent = document.querySelector('.board');

  arr.forEach(item => {
    parent.removeChild(item);
  });

  this.elem.user.forEach(item => item.html.classList.remove('active'));
  this.clicked = false;
  this.nextMove = [];
};

export default User;
