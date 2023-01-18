let x = 1;
let y = 2;
let m = 6;

const delayOneSecond = (callBack) => {
  setTimeout(callBack, 1000);
};

async function pyramidOfDoom() {
  await new Promise((resolve, reject) => {
    delayOneSecond(() => {
      x = x + 1;
      m = m * 2;
      y = x + y + m;
      resolve();
    });
  });
  await new Promise((resolve, reject) => {
    delayOneSecond(() => {
      console.log(x + y);
      x = x * 2;
      resolve();
    });
  });
  await new Promise((resolve, reject) => {
    delayOneSecond(() => {
      console.log(x / 3);
      resolve();
    });
  });
}

// try to pass an argument to resolve and try to store the awaited value in a variable to see what will happen
pyramidOfDoom();
console.log(m);
