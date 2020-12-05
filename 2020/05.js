const input = require("fs")
  .readFileSync("input/05.txt", "utf8")
  .split("\n")

const findID = (r, c) => r * 8 + c;

const bisect = ( input, lowChar ) => {
  const poss = [0, 2 ** input.length - 1];
  for (const dir of input) {
    const mid = (poss[1] + 1 - poss[0]) / 2;
    if (dir === lowChar) {
      poss[1] = poss[1] - mid;
    } else {
      poss[0] = poss[0] + mid;
    }
  }
  if (poss[0] !== poss[1]) {
    console.error("Could not bisect", input, poss);
  }
  return poss[0];
}

const day05 = () => {
  const output = [0, 0];
  const seats = [];
  const idToSeat = {};
  for (const line of input) {
    const row = bisect(line.slice(0, 7), "F");
    const col = bisect(line.slice(7), "L");
    const id = findID(row, col);
    if (id > output[0]) {
      output[0] = id;
    }
    if (!seats[row]) {
      seats[row] = [];
    }
    seats[row][col] = id;
    idToSeat[id] = [row, col];
  }

  for (let row = 0; row < seats.length; row++) {
    for (let col = 0; col < 8; col++) {
      if ((!seats[row] || !seats[row][col])) {
        const id = findID(row, col);
        if (idToSeat[id-1] && idToSeat[id+1]) {
          output[1] = id;
        }
      }
    }
  }

  return output;
};

console.log(day05());

module.exports = { day05 };
