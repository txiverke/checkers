/**
 * Creates a new html element
 * @param {string} tag
 * @param {object} attr
 * @param {string} label
 */
export const createElement = (tag = 'div', attr = {}, label = '') => {
  const elem = document.createElement(tag);

  if (Object.keys(attr).length) {
    for (let key in attr) {
      if (Array.isArray(attr[key])) {
        elem.setAttribute(key, attr[key].join(' '))
      } else {
        for (let prop in attr[key]) {
          elem.setAttribute(key + '-' + prop, attr[key][prop])
        }
      }
    }
  }

  if (label.length) elem.textContent = label;

  return elem;
};

/**
 * Returns the element type
 * @param {object} input
 */
export const getType = input => {
  const output = Array.prototype.toString.call(input).split(' ');

  return output[1].slice(0, output[1].length - 1) === 'Object'
    ? 'Object'
    : 'HTMLElement';
};

export const getRandom = (min, max) => Math.floor(Math.random() * max + min);
