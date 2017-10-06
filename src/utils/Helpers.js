/**
 * Creates a new html element
 * @param {string} tag 
 * @param {object} attr 
 * @param {string} label 
 */
export const createElement = (tag = 'div', attr = {}, label = '') => {
  const elem = document.createElement(tag)
  
  if (attr.classes && attr.classes.length > 0) {
    attr.classes.map(item => elem.classList.add(item))
  }

  if (attr.data && Object.keys(attr.data).length > 0) {
    for (var key in attr.data) {
      elem.setAttribute(['data-' + key], attr.data[key])
    }
  }

  if (label.length > 0) elem.textContent = label

  return elem
}

/**
 * Returns the element type
 * @param {object} input 
 */
export const getType = (input) => {
  const output = Array.isArray(input)
    ? ["[object", "Array]"]
    : (Array.prototype.toString.call(input)).split(' ')

  return output[1].slice(0, output[1].length - 1)
}

export const getRandom = (min, max) => Math.floor((Math.random() * max) + min)
