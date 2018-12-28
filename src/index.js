import Board from './modules/Board';
import Result from './modules/Result';
import Logic from './modules/Logic';

import './css/app.css';
import { boardCoords } from './utils/Constants';
import { createElement as CE } from './utils/Helpers';

window.addEventListener('DOMContentLoaded', () => {
  const body = CE('section', { class: ['content'] });
  const html = document.querySelector('.root');

  const newLogic = Object.create(Logic);
  newLogic.setup({ w: 800, h: 300 });
  newLogic.build(html);

  html.appendChild(body);

  const newBoard = Object.create(Board);
  newBoard.setup({ w: 500, h: 500 }, boardCoords);
  newBoard.build(body);
  newBoard.getCoords();

  const newResult = Object.create(Result);
  newResult.setup({ w: 80, h: 150 });
  newResult.build(body);
});
