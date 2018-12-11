import Board from './modules/Board';
import User from './modules/User';
import Machine from './modules/Machine';
import Result from './modules/Result';

import './css/main.css';

import { boardCoords } from './utils/Constants';

window.addEventListener('DOMContentLoaded', () => {
  const html = document.querySelector('.root');

  const newBoard = Object.create(Board);
  newBoard.setup({ w: 500, h: 500 }, boardCoords);
  newBoard.build(html);
  newBoard.getCoords();

  const boardHtml = document.querySelector('.board');

  const user = Object.create(User);
  user.create({ w: 52.5, h: 52.5 }, 'user', boardHtml);

  const machine = Object.create(Machine);
  machine.create({ w: 52.5, h: 52.5 }, 'machine', boardHtml);

  const newResult = Object.create(Result);
  newResult.setup({ w: 80, h: 150 });
  newResult.build(html);
});
