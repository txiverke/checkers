import Game from './Game';
import state from './state';

import { createElement } from '../utils/Helpers';

const Result = Object.create(Game);

Result.setup = function(size) {
  this.init(size);
  this.elem = createElement('aside', { class: ['result'] });

  let resultMachine = createElement('div', {
    class: ['result-box', 'black'],
  });
  resultMachine.appendChild(createElement('div'));

  let resultUser = createElement('div', { class: ['result-box', 'red'] });
  resultUser.appendChild(createElement('div'));

  this.elem.appendChild(resultMachine);
  this.elem.appendChild(resultUser);
};

Result.build = function(output) {
  this.insert(output);
  this.setDefault();
};

Result.setDefault = function() {
  document.querySelector('.result-box.black').querySelector('div').textContent =
    state.result.machine;
  document.querySelector('.result-box.red').querySelector('div').textContent =
    state.result.user;
};

Result.increase = function() {
  const _this = this.name ? this.name : 'machine'
  state.result[_this]++;

  document.querySelector('.result-box.black').querySelector('div').textContent =
    state.result.machine;

  document.querySelector('.result-box.red').querySelector('div').textContent =
    state.result.user;
};

export default Result;
