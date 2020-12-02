const input = require("fs")
  .readFileSync("input/02.txt", "utf8")
  .split("\n")
  .map(line => line.split(" "))

const day02 = () => {
  const output = [];
  output[0] = 0;
  output[1] = 0;

  for (const line of input) {
    if (line.length !== 3) {
      continue;
    }
    const matchChar = line[1][0];
    const re = new RegExp(matchChar, "g")
    const matches = [...line[2].matchAll(re)].length;
    const [min, max] = line[0].split("-").map(n => parseInt(n, 10));
    if (matches >= min && matches <= max) {
      output[0]++;
    }
    if (line[2][min-1] === matchChar ^ line[2][max-1] === matchChar) {
      output[1]++;
    }
  }

  return output;
}

console.log(day02());

module.exports = { day02 };
