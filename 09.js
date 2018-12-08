const example1 = `10 players; last marble is worth 1618 points`; // 8317
const example2 = `13 players; last marble is worth 7999 points`; // 146373
const example3 = `17 players; last marble is worth 1104 points`; // 2764
const example4 = `21 players; last marble is worth 6111 points`; // 54718
const example5 = `30 players; last marble is worth 5807 points`; // 37305

function answer(input) {
  let players = input.replace(/^(\d+).*$/, "$1");
  let marbles = input.replace(/^.*worth (\d+) points$/, "$1");
  console.log(players, marbles);
}

answer(example1);
