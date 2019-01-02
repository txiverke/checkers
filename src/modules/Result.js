import Game from './Game';
import state from './state';

import { createElement } from '../utils/Helpers';

Object.setPrototypeOf(Result.prototype, Game.prototype);

function Result(size) {
  Game.call(this, size);
  this.elem = createElement('aside', { class: ['result'] });

  let resultMachine = createElement('div', {
    class: ['result-box', 'black'],
  });
  resultMachine.appendChild(createElement('div'));

  let resultUser = createElement('div', { class: ['result-box', 'red'] });
  resultUser.appendChild(createElement('div'));

  this.elem.appendChild(resultMachine);
  this.elem.appendChild(resultUser);
}

Result.prototype.build = function(output) {
  this.insert(output);
  this.setDefault();

  state.registerListener('result', () => {
    this.update();
  });
};

Result.prototype.setDefault = function() {
  document.querySelector('.result-box.black div').textContent = 0;
  document.querySelector('.result-box.red div').textContent = 0;
};

Result.prototype.update = function() {
  document.querySelector('.result-box.black div').textContent =
    state.result.machine;
  document.querySelector('.result-box.red div').textContent = state.result.user;
};

export default Result;
