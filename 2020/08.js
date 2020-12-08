const input = require("fs").readFileSync("input/08.txt", "utf8");

const run = (instructions) => {
  const visisted = new Set();
  let accumulator = 0;
  let ptr = 0;
  while (!visisted.has(ptr) && ptr < instructions.length) {
    visisted.add(ptr);
    const [instr, amount] = instructions[ptr];
    switch (instr) {
      case "acc":
        accumulator += amount;
        ptr++;
        break;
      case "jmp":
        ptr += amount;
        break;
      case "nop":
        ptr++;
        break;
    }
  }
  return [accumulator, ptr];
}

const day08 = () => {
  const instructions = input.trim().split("\n").map(line => {
    const [instruction, value] = line.split(" ");
    return [instruction, parseInt(value, 10)];
  });

  const visisted = new Set();
  const jumps = [];
  const noops = [];

  let accumulator = 0;
  let ptr = 0;
  while (!visisted.has(ptr)) {
    visisted.add(ptr);
    const [instr, amount] = instructions[ptr];
    switch (instr) {
      case "acc":
        accumulator += amount;
        ptr++;
        break;
      case "jmp":
        jumps.push(ptr);
        ptr += amount;
        break;
      case "nop":
        noops.push(ptr);
        ptr++;
        break;
    }
  }
  const output = [accumulator];

  for (const address of noops) {
    const newInstructions = JSON.parse(JSON.stringify(instructions));
    newInstructions[address][0] = "jmp";
    const [acc, ptr] = run(newInstructions);
    if (ptr === newInstructions.length) {
      output[1] = acc;
      return output;
    }
  }
  for (const address of jumps) {
    const newInstructions = JSON.parse(JSON.stringify(instructions));
    newInstructions[address][0] = "nop";
    const [acc, ptr] = run(newInstructions);
    if (ptr === newInstructions.length) {
      output[1] = acc;
      return output;
    }
  }

  return output;
}

console.log(day08());

module.exports = { day08 };
