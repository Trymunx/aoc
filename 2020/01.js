const input = require('fs').readFileSync('input/01.txt', 'utf8').split('\n').map(v => parseInt(v, 10));

for (const v of input) {
  if (input.includes(2020 - v)) {
    console.log(v * (2020 - v));
    break;
  }
}

for (const v of input) {
  const remaining = input.filter(val => val <= 2020-v);
  for (const val of remaining) {
    if (input.includes(2020-v-val)) {
      console.log(v * val * (2020-v-val));
      return;
    }
  }
}
