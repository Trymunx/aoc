const input = require("fs")
  .readFileSync("input/04.txt", "utf8")
  .split("\n\n")
  .map(line => line.split(/\s/))

const day04 = () => {
  const output = [0, 0];
  for (const pass of input) {
    const passport = pass.filter(field => field);
    if (passport.length < 7 || passport.length > 8) {
      continue; // Passport invalid
    }
    if (passport.length === 7 && passport.some(field => field.startsWith("cid"))) {
      continue; // Passport missing field other than cid
    }

    const keySet = new Set();
    let invalid = false;
    for (const field of passport) {
      const [key, value] = field.split(":");
      numeric = parseInt(value, 10);
      keySet.add(key);
      switch (key) {
        case "byr":
          if (numeric < 1920 || numeric > 2002) invalid = true;
          break;
        case "iyr":
          if (numeric < 2010 || numeric > 2020) invalid = true;
          break;
        case "eyr":
          if (numeric < 2020 || numeric > 2030) invalid = true;
          break;
        case "hgt":
          if (
            !(value.slice(-2) === "cm" && (numeric >= 150 && numeric <= 193)) &&
            !(value.slice(-2) === "in" && (numeric >= 59 && numeric <= 76))
          ) {
            invalid = true;
          }
          break;
        case "hcl":
          if (!value.startsWith("#") || !/^[0-9a-f]{6}$/.test(value.slice(1))) invalid = true;
          break;
        case "ecl":
          if (!["amb","blu","brn","gry","grn","hzl","oth"].includes(value)) invalid = true;
          break;
        case "pid":
          if (value.length !== 9 || numeric !== Number(value)) invalid = true;
          break;
      }
      if (invalid) continue;
    }

    output[0]++;
    if (!invalid && (!(keySet.size === 7 && keySet.has("cid")) || keySet.size === 8)) {
      output[1]++;
    }
  }

  return output;
}

console.log(day04());

module.exports = { day04 };
