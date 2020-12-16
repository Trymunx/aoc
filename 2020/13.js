const input = require("fs").readFileSync("input/13.txt", "utf8");

const test1 = "10\n7,13,x,x,59,x,31,19";
const test2 = "10\n17,x,13,19";
const test3 = "10\n67,7,59,61";
const test4 = "10\n1789,37,47,1889";

const day13 = () => {
  const output = [];
  const lines = input.trim().split("\n");
  const time = parseInt(lines[0], 10);
  const busses = lines[1].split(",");

  let earliest = Number.MAX_SAFE_INTEGER;
  for (const busString of busses) {
    if (busString === "x") continue;
    const bus = parseInt(busString, 10);
    const previous = Math.floor(time / bus);
    if (previous * bus + bus < earliest) {
      earliest = previous * bus + bus;
      output[0] = bus * (earliest - time);
    }
  }

  const busTimes = busses.reduce((map, bus, i) => {
    if (bus !== "x") {
      map.set(i, parseInt(bus, 10));
    }
    return map;
  }, new Map());

  let maxOffset, maxBusTime;
  for (const [i, t] of busTimes.entries()) {
    if (!maxOffset || !maxBusTime || maxBusTime < t) {
      maxOffset = i;
      maxBusTime = t;
    }
  }

  // let i = Math.floor(100000000000000 / maxBusTime);
  // outer:
  // while (output[1] === undefined) {
  //   const max = maxBusTime * i++;
  //   console.log(max - maxOffset);
  //   for (const [index, t] of busTimes.entries()) {
  //     const val = max - (maxOffset - index);
  //     if (val / t !== Math.floor(val / t)) {
  //       continue outer;
  //     }
  //   }
  //   output[1] = max - maxOffset;
  // }

  return output;
};

console.log(day13());

module.exports = { day13 };
