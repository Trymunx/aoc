const input = require("./01.json").input;
let example1 = [+3, +3, +4, -2, -4];
let example2 = [-6, +3, +8, +5, -6];
let example3 = [+7, +7, -2, -7, -4];

function getAnswer(array) {
  let freqs = [];
  let i = 0;
  let answerFound = false;
  let current;
  while(!answerFound) {
    current = freqs.length ? freqs[freqs.length - 1] + array[i] : array[i];
    answerFound = freqs.includes(current);
    freqs.push(current);
    i = (i + 1) % array.length;
  }
  return current;
}

console.log(input.reduce((sum, el) => sum += el));
console.log(getAnswer(input));
