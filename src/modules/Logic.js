import Game from './Game';
import User from './User';
import Machine from './Machine';

import { createElement as CE } from '../utils/Helpers';
import { DIC } from '../utils/Constants';
import move from '../assets/sounds/kill.mp3';
import state from './state';

Object.setPrototypeOf(Logic.prototype, Game.prototype);
//Logic.prototype = Object.create(Game.prototype)

function Logic(size) {
  Game.call(this, size);
  this.render();
}

Logic.prototype.render = function() {
  this.elem = CE('header', { class: ['header'] });

  const button = CE(
    'button',
    {
      class: ['btn'],
      disabled: [true],
      data: { start: 0 },
    },
    'Start',
  );

  const input = CE('input', {
    class: ['input'],
    id: ['username'],
    name: ['username'],
    type: ['text'],
    placeholder: [DIC.INPUT_PLACEHOLDER],
  });

  const wrapper = CE('div', { class: ['form'] });
  wrapper.appendChild(input);
  wrapper.appendChild(button);

  const htmlElements = [
    CE('h1', { class: ['tit'] }, DIC.TITLE),
    CE('audio', { src: [move], id: ['sound_move'] }),
    CE('h2', { class: ['subtit'] }, DIC.INTRO),
    wrapper,
  ];

  htmlElements.forEach(elem => this.elem.appendChild(elem));
};

Logic.prototype.build = function(output) {
  this.insert(output);
  this.btn = this.elem.querySelector('.btn');
  this.input = this.elem.querySelector('.input');
  this.tit = this.elem.querySelector('.tit');
  this.message = this.elem.querySelector('.subtit');

  this.btn.addEventListener('click', this.click.bind(this));

  this.input.addEventListener('input', () => {
    if (this.input.value.length > 2) {
      this.username = state.username = this.input.value;
      this.btn.disabled = false;
    } else {
      this.btn.disabled = true;
    }
  });
};

Logic.prototype.click = function() {
  if (!Number(this.btn.dataset.start)) {
    this.start();
  } else {
    this.reset();
  }
};

Logic.prototype.start = function() {
  this.btn.dataset.start = 1;
  this.btn.textContent = 'Reset';
  this.input.value = '';
  this.input.style.display = 'none';
  this.tit.textContent = this.tit.textContent + ', ' + this.username;
  this.message.textContent = DIC.STEP_1;

  const boardHtml = document.querySelector('.board');

  const user = new User({ w: 52.5, h: 52.5 });
  user.build(boardHtml)

  const machine = new Machine({ w: 52.5, h: 52.5 });
  machine.build(boardHtml);
};

Logic.prototype.reset = function() {
  const board = document.querySelector('.board');
  const pieces = document.querySelectorAll('.piece');
  pieces.forEach(piece => board.removeChild(piece));

  this.username = state.user = '';
  this.btn.dataset.start = 0;
  this.btn.textContent = 'Start';
  this.input.style.display = 'block';
  this.tit.textContent = DIC.TITLE;
  this.message.textContent = DIC.INTRO;
  document
    .querySelectorAll('.result-box div')
    .forEach(item => (item.textContent = 0));

  state.reset();
};

export default Logic;
