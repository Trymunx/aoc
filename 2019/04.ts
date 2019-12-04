export {};

const example1 = '111111';
const example2 = '223450';
const example3 = '123789';

const checkPass = {
  part1: (pass: number): number => {
    const digits = pass.toString().split("").map(Number);
    let dup = 0;

    for (let i = 1; i < digits.length; i++) {
      if (digits[i] < digits[i-1]) {
        return 0;
      }
      if (!dup && digits[i] === digits[i-1]) {
        dup = 1;
      }
    }
    return dup;
  },

  part2: (pass: number): number => {
    const str = pass.toString();
    let pair = 0;

    const match = str['matchAll'](/0+|1+|2+|3+|4+|5+|6+|7+|8+|9+/g);
    for (const pattern of match) {
      if (Array.isArray(pattern) && pattern[0].length === 2) {
        pair = 1;
      }
    }

    const digits = str.split("").map(Number);

    for (let i = 1; i < digits.length; i++) {
      if (digits[i] < digits[i-1]) {
        return 0;
      }
    }

    return pair;
  },
}

function answer(part: string): number {
  let count = 0;
  for (let i = 136818; i <= 685979; i++) {
    count += checkPass[part](i);
  }
  return count;
}


console.log(answer("part1"));
console.log(answer("part2"));
