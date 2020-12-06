const input = require("fs").readFileSync("input/06.txt", "utf8").trim().split("\n\n");

const day06 = () => {
  const output = [0, 0];

  for (const group of input) {
    const groupAnswers = group.split("\n").map(member => member.split(""));
    let union = new Set([...groupAnswers[0]]);
    let intersection = new Set([...groupAnswers[0]]);
    for (const answer of groupAnswers.slice(1)) {
      union = new Set([...union, ...answer]);
      intersection = new Set([...answer].filter(x => intersection.has(x)));
    }

    output[0] += union.size;
    output[1] += intersection.size;
  }
  return output;
};

console.log(day06());

module.exports = { day06 };
