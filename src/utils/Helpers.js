/**
 * Creates html elements
 * 
 * @param {string} tag 
 * @param {object} attr 
 */
export const createElement = (tag = 'div', attr = {}) => {
  const elem = document.createElement(tag)

  if (Object.keys(attr).length > 0) {
    for (var i in attr) {
      elem.setAttribute(i, attr[i])
    }
  }

  return elem
}