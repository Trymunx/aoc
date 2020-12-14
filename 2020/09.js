const input = require("fs").readFileSync("input/09.txt", "utf8");

const day09 = () => {
  const numbers = input.trim().split("\n").map(line => parseInt(line, 10));
  const output = [0];
  const preamble = 25;

  outer:
  for (let i = preamble; i < numbers.length; i++) {
    let valid = false;
    for (let j = i - preamble; j < i; j++) {
      for (let k = i - preamble; k < i; k++) {
        if (k === j) {
          continue;
        }
        if (numbers[k] + numbers[j] === numbers[i]) {
          valid = true;
          continue outer;
        }
      }
    }
    if (!valid) {
      output[0] = numbers[i];
      break;
    }
  }

  for (let i = 0; i < numbers.length; i++) {
    let j = i;
    let sum = 0;
    while (sum < output[0] && j < numbers.length) {
      sum += numbers[j++];
    }
    if (sum === output[0]) {
      const range = numbers.slice(i, j);
      output[1] = Math.min(...range) + Math.max(...range);
      break;
    }
  }

  return output;
};

console.log(day09());

module.exports = { day09 };
