/**
 * CREATES HTML TAGS
 * @param {string} tag 
 * @param {object} attr 
 * @param {string} label 
 */
export const createElement = (tag = 'div', attr = {}, label = '') => {
  const elem = document.createElement(tag)
  
  if (attr.classes && attr.classes.length > 0) {
    attr.classes.map(item => elem.setAttribute('class', item))
  }

  if (attr.data && Object.keys(attr.data).length > 0) {
    for (var key in attr.data) {
      elem.setAttribute(key, attr.data[key])
    }
  }

  if (label.string > 0) elem.textContent = label

  return elem
}

export const getType = (input) => {
  const output = (Array.prototype.toString.call(input)).split(' ')
  
  return output[1].slice(0, output[1].length - 1)
}