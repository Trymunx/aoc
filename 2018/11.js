function powerLevel(x, y, s) {
  return ~~((x*x*y + 20*x*y + 100*y + s*x + 10*s) / 100) % 10 - 5;
}

function plSquare(x, y, s, size) {
  let pl = 0;
  for (let i = y; i < y + size; i++) {
    for (let j = x; j < x + size; j++) {
      pl += powerLevel(j, i, s);
    }
  }
  return pl;
}

function setUpScores(s) {
  let scores = [];
  for (let i = 1; i <= 300; i++) {
    scores[i-1] = [];
    for (let j = 1; j <= 300; j++) {
      scores[i-1].push(powerLevel(j, i, s));
    }
  }
  return scores;
}

function answer1(s) {
  let maxPl;
  for (let i = 1; i + 2 <= 300; i++) {
    for (let j = 1; j + 2 <= 300; j++) {
      let pl = plSquare(j, i, s, 3);
      if (maxPl === undefined) maxPl = {power: pl, cell: `${j}, ${i}`};
      else maxPl = pl > maxPl.power ? {power: pl, cell: `${j}, ${i}`} : maxPl;
    }
  }

  console.log(maxPl);
}

function squareLookup(x, y, size, scores) {
  let pl = 0;
  for (let i = y; i < y + size; i++) {
    for (let j = x; j < x + size; j++) {
      pl += scores[i][j];
    }
  }
  return pl;
}

function answer2(s) {
  let scores = setUpScores(s);
  let maxPl;
  for (let i = 1; i <= 300; i++) {
    for (let j = 1; j <= 300; j++) {
      for (let size = 1; size <= 301 - i && size <= 301 - j; size++) {
        let pl = squareLookup(j-1, i-1, size, scores);
        if (maxPl === undefined) maxPl = {power: pl, cell: `${j}, ${i}`, size: `${size}`};
        else if (pl > maxPl.power) {
          maxPl = {power: pl, cell: `${j}, ${i}`, size: `${size}`};
        }
      }
      // console.log(i, j, maxPl);
    }
  }

  console.log(maxPl);
}

function answer3(s) {
  let maxPl;
  for (let i = 1; i + 2 <= 300; i++) {
    for (let j = 1; j + 2 <= 300; j++) {
      for (let size = 1; size <= 301 - i && size <= 301 - j; size++) {
        let pl = plSquare(j, i, s, size);
        if (maxPl === undefined) maxPl = {power: pl, cell: `${j}, ${i}`, size: `${size}`};
        else if (pl > maxPl.power) {
          maxPl = {power: pl, cell: `${j}, ${i}`, size: `${size}`};
        }
      }
      // console.log(i, j, maxPl);
    }
  }

  console.log(maxPl);
}

// answer1(42);
answer1(7400);
// console.time("Using score matrix");
// answer2(18);
answer2(7400);
// console.timeEnd("Using score matrix");

// console.time("Recalculating each loop");
// answer3(18);
// answer3(7400);
// console.timeEnd("Recalculating each loop");

