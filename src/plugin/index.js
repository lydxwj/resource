import { getType } from './util';
const Load = function() {
  const out = {};
  const loadedRes = {};
  let loadTimer = null;
  out.load = function load({ srcList = [], percentCb = () => {}, completeCb = () => {}, failCb = () => {}, time }) {
    const state = new State(srcList, time);
    loadRes(srcList, state, failCb, completeCb);
    startLoading(state, completeCb, percentCb);
  }
  function State(srcList, time) {
    const length = srcList.length;
    this.length = length;
    this.waitNum = length;
    this.time = time;
    this.percent = 0;
    this.factPercent = 0;
  }
  function loadRes(srcList, state, failCb, completeCb) {
    srcList.forEach((src, idx) => {
      let res = loadedRes[src];
      if (res) {
        updateWaitNum(state);
        return; 
      }
      const type = getType(src);
      switch (type) {
        case 'IMAGE':
          res = creatImg();
          break;
        case 'CSS':
          res = creatLink(src);
          break;
        case 'JS':
          res = creatScript();
          break;
        default:
          res = failFn({
            e: {
              msg: '不支持的格式'
            },
            src,
            idx,
            failCb,
            completeCb
          });
          break;
      }
      if (type == 'OTHER') return;
      res.onload = updateWaitNum(state, res, src);
      res.onerror = e => failFn({
        e,
        src,
        idx,
        failCb,
        completeCb
      });
      if (type !== 'CSS') {
        res.src = src;
      }
    });
  }
  function failFn({
    e,
    src,
    idx,
    failCb,
    completeCb
  }) {
    failCb(e, src, idx);
    end(completeCb);
  }
  function creatImg() {
    return new Image();
  }
  function creatLink(src) {
    const res = document.createElement('link');
    res.rel = 'stylesheet';
    res.type = 'text/css';
    res.href = src;
    window.document.getElementsByTagName('head')[0].appendChild(res);
    return res;
  }
  function creatScript() {
    const res = document.createElement('script');
    window.document.body.appendChild(res);
    return res;
  }
  function updateWaitNum(state, res, src) {
    --state.waitNum;
    if (res) {
      loadedRes[src] = res;
    }
  }
  function startLoading(state, completeCb, percentCb) {
    let percent = 0;
    if (state.time) {
      const time = state.time >= 1500 ? state.time : 1500;
      state.factPercent = 100;
      loadTimer = setInterval(function() {
        percent = getPercent(state, true);
        percentCb(percent);
        if (percent === 100) {
          end(completeCb);
        }
      }, time / 100);
    } else {
      if (state.length == 0) {
        state.factPercent = 100;
      }
      loadTimer = setInterval(function() {
        if (state.length == 0) {
          percent = getPercent(state, true);
        } else {
          percent = getPercent(state);
        }
        percentCb(percent);
        if (percent === 100) {
          end(completeCb);
        }
      }, 20);
    }
  }
  function end(completeCb) {
    clearInterval(loadTimer);
    loadTimer = null;
    completeCb(loadedRes);
  }
  function getPercent(state, isFactPercent) {
    if (!isFactPercent) {
      state.factPercent = Math.floor((state.length - state.waitNum) / state.length * 100);
    } 
    if (state.percent + 1 < state.factPercent) {
      return state.percent += 1;
    } else {
      state.percent = state.factPercent;
      return state.percent;
    }
  }
  out.loadedRes = loadedRes;
  return out;
}
export default Load();