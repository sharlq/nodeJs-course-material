function pyramidOfDoom() {
  let x = 1;
  let y = 2;
  let m = 6;
  setTimeout(() => {
    x = x + 1;
    m = m * 2;
    y = x + y + m;
    setTimeout(() => {
      console.log(x + y); // the first console.log
      x = x * 2;
      setTimeout(() => {
        console.log(x / 3); // the second console.log
      }, 1000);
    }, 1000);
  }, 1000);
  console.log(m); // the third console.log
}
pyramidOfDoom();
// in the example above we have a number of nested setTimeouts
// this has alot of problems, the first being that it is hard to read
// which means its hard to debug specially if you have alot of line of code in the nesting
// and when ever you need to add another level of call back you have to add another level of nesting which is not good

// now your job is to refactor the pyramidOfDoom function twice using promises and async/await
// in both case you should get rid of all of the nesting and you should be able to have the same results
// note all the console.log should be in the same order as the pyramidOfDoom function and they should give the same results and you should keep the same logic
