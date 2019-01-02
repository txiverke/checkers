import Board from './modules/Board';
import Result from './modules/Result';
import Logic from './modules/Logic';

import './css/app.css';
import { createElement as CE } from './utils/Helpers';

window.addEventListener('DOMContentLoaded', () => {
  const body = CE('section', { class: ['content'] });
  const html = document.querySelector('.root');

  const newLogic = new Logic({ w: 800, h: 300 });
  newLogic.build(html);

  html.appendChild(body);

  const newBoard = new Board({ w: 500, h: 500 });
  newBoard.build(body);

  const newResult = new Result({ w: 80, h: 150 });
  newResult.build(body);
});
