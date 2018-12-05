const input = require("./03.json").input;
// function partOne(arr) {
//   let conflicting = 0;
//   let fabric = new Array(10000).fill(0);
//   fabric.forEach((_, i) => fabric[i] = new Array(10000).fill(0));
//   arr.forEach(row => {
//     let id = parseInt(row.replace(/^#(\d).*/, "$1"));
//     let left = parseInt(row.replace(/.*@ (\d+),.*/, "$1"));
//     let top = parseInt(row.replace(/.*@ \d+,(\d+):.*/, "$1"));
//     let width = parseInt(row.replace(/.*: (\d+)x.*/, "$1"));
//     let height = parseInt(row.replace(/.*x(\d+)$/, "$1"));

//     for (let i = top; i < top + height; i++) {
//       // while (i >= fabric.length) fabric.push(new Array());
//       for (let j = left; j < left + width; j++) {
//         // while (j >= fabric[i].length) fabric[i].push(0);
//         if (fabric[i][j] === "filled") {
//           fabric[i][j] = "conflicting";
//           conflicting++;
//         } else if (fabric[i][j] !== "conflicting") {
//           fabric[i][j] = "filled";
//         }
//       }
//     }
//   });
//   return conflicting;
// }

function partOne(arr) {
  let conflicting = 0;
  let cleanIDs = [];
  let fabric = [new Array()];
  arr.forEach(row => {
    let id = parseInt(row.replace(/^#(\d+).*/, "$1"));
    let left = parseInt(row.replace(/.*@ (\d+),.*/, "$1"));
    let top = parseInt(row.replace(/.*@ \d+,(\d+):.*/, "$1"));
    let width = parseInt(row.replace(/.*: (\d+)x.*/, "$1"));
    let height = parseInt(row.replace(/.*x(\d+)$/, "$1"));
    let intact = true;

    for (let i = top; i < top + height; i++) {
      while (i >= fabric.length) fabric.push(new Array());
      for (let j = left; j < left + width; j++) {
        while (j >= fabric[i].length) fabric[i].push(0);
        if (fabric[i][j] === "X") {
          intact = false;
        } else if (fabric[i][j]) {
          intact = false;
          conflicting++;
          if (cleanIDs.includes(fabric[i][j])) cleanIDs.splice(cleanIDs.indexOf(fabric[i][j]), 1);
          fabric[i][j] = "X";
        } else {
          fabric[i][j] = id;
        }
      }
    }
    if (intact) cleanIDs.push(id);
  });
  console.log(cleanIDs);
  return conflicting;
}

console.log(partOne(input));
