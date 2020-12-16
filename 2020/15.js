const input = "1,20,8,12,0,14"; // File IO seems superfluous here...

const test = "0,3,6";

const day15 = () => {
  const recent = new Map();
  const starting = test.trim().split(",").map(Number);

  let last;
  for (let i = 0; i < 10; i++) {
    if (i < starting.length) {
      recent.set(starting[i], i);
      last = starting[i];
    } else if (!recent.has(last)) {
      recent.set(0, i);
      last = 0;
    } else {
      last = i - recent.get(last);
      recent.set(last, i);
    }
    console.log(last);
  }

  console.log(last);
};

console.log(day15());

module.exports = { day15 };
