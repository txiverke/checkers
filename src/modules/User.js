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
};

User.bind = function() {
  this.elem.user.forEach(item => {
    state.set('user', item.html.dataset.index);
    item.html.addEventListener('click', this.click.bind(this));
  });
};

User.click = function(e) {
  if (this.history.length % 2 === 0) {
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
  const oldNextMoves = document.querySelectorAll('.piece-next');

  if (oldNextMoves.length > 0) this.hideOptions(oldNextMoves);

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

  state.update('user', target.from, target.to);

  this.hideOptions(document.querySelectorAll('.piece-next'));
  this.history.push({ user: true, from: target.from, to: target.to });

  setTimeout(() => {
    if (this.history.length === 1) {
      Machine.start.call(this);
    } else {
      Machine.move();
    }
  }, 500);
};

User.hideOptions = function(arr) {
  const parent = document.querySelector('.board');
  arr.forEach(item => parent.removeChild(item));
  this.elem.user.forEach(item => item.html.classList.remove('active'));
};

export default User;
