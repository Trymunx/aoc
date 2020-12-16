const input = require("fs").readFileSync("input/14.txt", "utf8");

const day14 = () => {
  const output = [];
  const masks = [...input.trim().matchAll(/^mask = ([X01]+)$/gm)].map(m => m[1]);
  const blocks = input
    .trim()
    .split(/^mask.*$/m)
    .filter(s => s)
    .map(block => block
      .trim()
      .split("\n")
      .map(line => [
        parseInt(line.match(/\[(\d+)\]/)[1], 10),
        parseInt(line.match(/ (\d+)$/), 10).toString(2),
      ])
    );

  if (masks.length !== blocks.length) {
    throw new Error(
      "Day 14 masks length must equal blocks length, difference: " + masks.length - blocks.length
    );
  }

  const memory = new Map();
  const memory2 = new Map();

  for (let i = 0; i < masks.length; i++) {
    const mask = masks[i];
    const block = blocks[i];

    for (let j = 0; j < block.length; j++) {
      const [addr, ins] = block[j];

      let instruction = ins.padStart(mask.length, "0");
      let address = addr.toString(2).padStart(mask.length, "0");
      for (let c = mask.length - 1; c >= 0; c--) {
        if (mask[c] !== "X") {
          instruction = instruction.slice(0, c) + mask[c] + instruction.slice(c + 1);
        }
        if (mask[c] !== "0") {
          address = address.slice(0, c) + mask[c] + address.slice(c + 1);
        }
      }
      memory.set(addr, parseInt(instruction, 2));

      let addresses = [address];
      for (let c = 0; c < address.length; c++) {
        if (address[c] === "X") {
          addresses = addresses
            .map(a => [a.slice(0, c) + "0" + a.slice(c + 1), a.slice(0, c) + "1" + a.slice(c + 1)])
            .flat();
        }
      }
      for (const a of addresses) {
        memory2.set(parseInt(a, 2), parseInt(ins, 2));
      }
    }
  }

  output[0] = [...memory.values()].reduce((sum, val) => sum + val);
  output[1] = [...memory2.values()].reduce((sum, val) => sum + val);

  return output;
};

console.log(day14());

module.exports = { day14 };
