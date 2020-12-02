const input = require('fs')
  .readFileSync('input/01.txt', 'utf8')
  .split('\n')
  .map(v => parseInt(v, 10))
  .filter(v => !isNaN(v));

const day01 = () => {
  const output = [];
  for (const v of input) {
    if (input.includes(2020 - v)) {
      output[0] = v * (2020 - v);
    }
    for (const val of input) {
      if (input.includes(2020 - v - val)) {
        output[1] = v * val * (2020 - v - val);
      }
    }
  }
  return output;
}

console.log(day01());

module.exports = { day01 };
