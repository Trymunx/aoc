const input = require("fs")
  .readFileSync("input/03.txt", "utf8")
  .split("\n")

const day03 = () => {
  const output = [0];

  // Array of down -> across values
  const slopes = [
    [],           // down 0 rows
    [1, 3, 5, 7], // down 1 row
    [1],          // down 2 rows
  ];

  // Object keyed by slope ("<down>,<across>") to:
  //  col: current column index when travelling down grid by that slope
  //  trees: count of trees hit
  const slopeToHitObj = slopes.reduce((treeCounts, slopes, down) => {
    for (const across of slopes) {
      treeCounts[[down, across].toString()] = { col: 0, trees: 0 };
    }
    return treeCounts;
  }, {});

  for (let down = 0; down < slopes.length; down++) {
    if (down === 0) continue; // Skip going down 0 rows
    for (let row = 0; row < input.length; row += down) {
      if (!input[row]) continue; // Skip row with no values
      for (const across of slopes[down]) {
        const col = slopeToHitObj[[down, across].toString()].col;
        if (input[row][col] === "#") {
          slopeToHitObj[[down, across].toString()].trees++;
        }
        // Increment col index for each slope in slopeToHitObj
        slopeToHitObj[[down, across].toString()].col = (col + across) % input[row].length;
      }
    }
  }

  output[0] = slopeToHitObj["1,3"].trees;
  output[1] = Object.values(slopeToHitObj).reduce((product, hitObj) => product * hitObj.trees, 1);
  return output;
}

console.log(day03());

module.exports = { day03 };
