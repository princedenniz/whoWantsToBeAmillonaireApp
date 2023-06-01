const delay = (duration, callback) => {
  setTimeout(() => {
    callback();
  }, duration);
};

export default delay;
