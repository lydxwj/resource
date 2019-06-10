import { resourceType, supportFormat } from './constant';
/**
 * 检测资源类型
 * @param url 资源地址
 */
export function getType(url) {
  let type = 'other';
  for (let [k, v] of Object.entries(supportFormat)) {
    if (checkType(url, v)) {
      return resourceType[k];
    }
  }
  return resourceType[type];
}

/**
 * 正则检测资源类型
 * @param url 资源地址
 */
export function checkType(url = '', formatArr) {
  let regStr = '';
  formatArr.forEach((item, idx) => {
    if (idx < formatArr.length - 1) {
      regStr = regStr + '\.' + item + '$|';
    } else {
      regStr = regStr + '\.' + item + '$';
    }
  });
  if (url) {
    const reg = new RegExp(`${regStr}`, 'i');
    if (reg.test(url)) return true;
  }
  return false;
}
