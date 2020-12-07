const input = require("fs").readFileSync("input/07.txt", "utf8");

const keyRegex = /^(\w+ \w+) bags contain/
const valueRegex = /(\d+) (\w+ \w+) bag/g

const countBagsContainingColour = (bagToParents, searchColour) => {
  const toSearch = bagToParents[searchColour] || [];
  const bags = new Set(toSearch);
  while (toSearch.length) {
    const search = toSearch.pop()
    if (bagToParents[search]) {
      for (const bag of bagToParents[search]) {
        bags.add(bag);
      }
      toSearch.push(...bagToParents[search]);
    }
  }
  return bags.size;
}

const countChildBags = (parentToBags, searchColour) => {
  let count = 1;
  for (const [colour, multiple] of Object.entries(parentToBags[searchColour])) {
    const number = countChildBags(parentToBags, colour);
    count += number * multiple; 
  }
  return count
}

const day07 = () => {
  const myBag = "shiny gold";
  const parentToBags = {};
  const bagToParents = {};

  for (const line of input.trim().split("\n")) {
    const keyMatch = line.match(keyRegex)
    if (!keyMatch) {
      console.log("no match", line);
      continue;
    }
    const k = keyMatch[1];
    parentToBags[k] = {};

    const vals = line.matchAll(valueRegex);
    for (const match of vals) {
      if (!bagToParents[match[2]]) {
        bagToParents[match[2]] = [];
      }
      bagToParents[match[2]].push(k);
      parentToBags[k][match[2]] = parseInt(match[1], 10);
    }
  }

  return [countBagsContainingColour(bagToParents, myBag), countChildBags(parentToBags, myBag) - 1];
}

console.log(day07());

module.exports = { day07 };
