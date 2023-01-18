function pyramidOfDoom() {
  let x = 1;
  let y = 2;
  let m = 6;
  const delayOneSecond = (callBack) => {
    setTimeout(callBack, 1000);
  };
  const promise = new Promise((resolve, reject) => {
    delayOneSecond(() => {
      x = x + 1;
      m = m * 2;
      y = x + y + m;
      resolve({ x, y, m }); // note here we are passing the values of x, y and m to the next then also note that resolve takes only one argument so we want to pass more than one argument we need to pass an object
    });
  });

  promise
    .then(({ x, y, m }) => {
      return new Promise((resolve, reject) => {
        delayOneSecond(() => {
          console.log(x + y);
          x = x * 2;
          resolve(x);
        });
      });
    })
    .then((x) => {
      return new Promise((resolve, reject) => {
        delayOneSecond(() => {
          console.log(x / 3);
        });
      });
    });
  // note the levels of nesting needed add the nesting
  // try to make it with returning value instead of promises
  console.log(m);
}

pyramidOfDoom();
