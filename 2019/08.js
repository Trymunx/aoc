const input = require('fs').readFileSync('08.txt', 'utf8');
const example1 = "123456789012";
const example2 = "0222112222120000";

const count = (digit, array) => array.reduce((c, el) => el === digit ? c + 1 : c, 0);

const part1 = (input, width, height) => {
  const inputString = input.trim();
  const layerSize = width * height;
  const nLayers = inputString.length / layerSize;

  const layers = [];
  for (let i = 0; i < inputString.length; i += layerSize) {
    layers.push(inputString.slice(i, i + layerSize).split("").map(Number));
  }

  const min = {
    count: Infinity,
    chksum: 0,
  };
  layers.forEach(layer => {
    const numZeros = count(0, layer);
    if (min.count > numZeros) {
      min.count = numZeros;
      const ones = count(1, layer);
      const twos = count(2, layer);
      min.chksum = ones * twos;
    }
  });

  console.log("Part 1:", min.chksum);
}

const getTransIdx = a => a.reduce((a, el, i) => el === 2 ? [...a, i] : a, []);

const part2 = (input, width, height) => {
  const inputString = input.trim();
  const layerSize = width * height;
  const nLayers = inputString.length / layerSize;

  const layers = [];
  for (let i = 0; i < inputString.length; i += layerSize) {
    layers.push(inputString.slice(i, i + layerSize).split("").map(Number));
  }

  const white = "█";
  const black = " ";

  const final = layers[0];
  for (let layer = 1; layer < layers.length; layer++) {
    const trans = getTransIdx(final);
    trans.forEach(i => final[i] = layers[layer][i]);
  }

  const output = final.map(n => n === 0 ? black : n === 1 ? white : 2);

  console.log("Part 2:");
  for (let i = 0; i < layerSize; i += width) {
    console.log(output.slice(i, i + width).join(""));
  }
}


// part1(example1, 3, 2);
part1(input, 25, 6)
// part2(example2, 2, 2);
part2(input, 25, 6);
