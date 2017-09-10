/**
 * Creates html elements
 * 
 * @param {string} tag 
 * @param {object} attr 
 */
export const createElement = (tag = 'div', classes = [], attr = {}) => {
  const elem = document.createElement(tag)
  
  if (classes.length > 0) {
     classes.map(item => elem.setAttribute('class', item))
  }

  if (Object.keys(attr).length > 0) {
    for (var i in attr) {
      elem.setAttribute(i, attr[i])
    }
  }

  return elem
}