const input = require("fs").readFileSync("input/10.txt", "utf8");

const test = `16
10
15
5
1
11
7
19
6
12
4`;
const test2 = `28
33
18
42
31
14
46
20
48
47
24
23
49
45
19
38
39
11
1
32
25
35
8
17
7
9
4
2
34
10
3`;

const day10 = () => {
  const output = [0, 0n];

  const sorted = input.trim().split("\n").map(line => parseInt(line, 10)).sort((a, b) => a - b);
  sorted.unshift(0); // charging outlet has joltage of 0
  sorted.push(sorted[sorted.length - 1] + 3); // device has joltage of highest + 3

  const counts = {
    one: 0,
    three: 0,
  };

  for (let i = 0; i < sorted.length; i++) {
    const joltage = sorted[i];
    if (i && joltage - 3 > sorted[i - 1]) {
      console.log(
        `Adapter at ${i} with joltage ${joltage} is too high for previous max ${sorted[i - 1]}`
      );
    }
    const diff = i > 0 ? sorted[i] - sorted[i - 1] : 0;
    if (diff === 1) counts.one++;
    if (diff === 3) counts.three++;
  }
  output[0] = counts.one * counts.three;

  // for (let i = 0; i < sorted.length; i++) {
  //   if (sorted[i + 3] - sorted[i] <= 3) {
  //     output[1] *= 2;
  //   }
  //   if (sorted[i + 2] - sorted[i] <= 3) {
  //     output[1]++;
  //   }
  //   // let j = 1;
  //   // while (sorted[i + j++] - sorted[i] < 3 && j < 4) {
  //   // output[1]++;
  //   // }
  //   // if (sorted[i + 1] - sorted[i] < 3) {
  //   //   output[1] += 1;
  //   // }
  // }

  return output;
};

console.log(day10());

module.exports = { day10 };
