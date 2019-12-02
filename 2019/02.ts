export {} // Module thing

const example1 = "1,9,10,3,2,3,11,0,99,30,40,50";
const input = "1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,1,10,19,1,19,6,23,2,23,13,27,1,27,5,31,2,31,10,35,1,9,35,39,1,39,9,43,2,9,43,47,1,5,47,51,2,13,51,55,1,55,9,59,2,6,59,63,1,63,5,67,1,10,67,71,1,71,10,75,2,75,13,79,2,79,13,83,1,5,83,87,1,87,6,91,2,91,13,95,1,5,95,99,1,99,2,103,1,103,6,0,99,2,14,0,0";

const addrHelper = (arr: number[]) => (address: number) => arr[arr[address]];

function answer(input, noun?: number, verb?: number) {
  const instructions = input.split(",").map(s => parseInt(s));
  const addr = addrHelper(instructions);

  if (noun !== undefined && verb !== undefined) {
    instructions[1] = noun;
    instructions[2] = verb;
  }

  for (let ptr = 0; ptr < instructions.length; ptr += 4) {
    const instruction = instructions[ptr];
    switch (instruction) {
      case 1:
        instructions[instructions[ptr + 3]] = addr(ptr + 1) + addr(ptr + 2);
        break;
      case 2:
        instructions[instructions[ptr + 3]] = addr(ptr + 1) * addr(ptr + 2);
        break;
      case 99:
        return instructions[0];
      default:
        console.error("Received unknown instruction:", instruction);
    }
  }
}

// console.log(answer(example1));
console.log(answer(input, 12, 2));

function part2(target: number) {
  for (let n = 0; n < 100; n++) {
    for (let v = 0; v < 100; v++) {
      if (answer(input, n, v) === target) {
        return 100 * n + v;
      }
    }
  }
}

console.log(part2(19690720));
