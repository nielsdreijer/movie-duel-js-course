// debounce is used as a timer "guard" and can be used on whatever we need to limit. Delay default is 1 sec but can be set custom as a parameter
const debounce = (func, delay = 1000) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    timeoutId = setTimeout(() => {
      func.apply(null, args);
    }, delay);
  };
};
