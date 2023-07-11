/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {Boolean}
 */
// 用户名
export function validUsername(str) {
  const valid_map = ['admin', 'editor', 'guantong']
  return valid_map.indexOf(str.trim()) >= 0
}
