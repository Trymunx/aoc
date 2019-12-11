const input = require("fs").readFileSync("10.txt", "utf8");

const part1 = (inputString) => {
  const split = inputString.split("\n");

  const coords = split.reduce((acc, line, i) => {
    const asts = line.matchAll(/#/g);
    for (const {index} of asts) {
      acc.push([index, i]);
    }
    return acc;
  }, [])

  const numGrads = [];

  for (const coord of coords) {
    const grads = {};
    for (const c of coords) {
      if (coord[0] === c[0] && coord[1] === c[1]) {
        continue;
      } else {
        let dir = "";
        if (c[0] >= coord[0] && c[1] >= coord[1] ) {
          dir = "a";
        } else if (c[0] >= coord[0] && c[1] <= coord[1] ) {
          dir = "b";
        } else if (c[0] <= coord[0] && c[1] <= coord[1] ) {
          dir = "c";
        } else if (c[0] <= coord[0] && c[1] >= coord[1] ) {
          dir = "d";
        }

        const g = dir + ((c[1] - coord[1]) / (c[0] - coord[0]));
        if (grads[g]) {
          grads[g].push(c);
        } else {
          grads[g] = [c];
        }
      }
    }

    numGrads.push({
      coord: coord,
      num: Object.keys(grads).length
    });
  }

  const maxLinesOfSight = Math.max(...numGrads.map(n => n.num));
  console.log(numGrads.find(n => n.num === maxLinesOfSight))
}

part1(input);
