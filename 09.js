const example0 = `9 players; last marble is worth 25 points`; // 32
const example1 = `10 players; last marble is worth 1618 points`; // 8317
const example2 = `13 players; last marble is worth 7999 points`; // 146373
const example3 = `17 players; last marble is worth 1104 points`; // 2764
const example4 = `21 players; last marble is worth 6111 points`; // 54718
const example5 = `30 players; last marble is worth 5807 points`; // 37305

function answer(input) {
  let numPlayers = input.replace(/^(\d+).*$/, "$1");
  let marbles = input.replace(/^.*worth (\d+) points$/, "$1");
  // console.log(players, marbles);

  let circle = [0];
  let player = 0;
  let scores = {};
  let currentIndex = 0;
  let nextIndex; 
  let value = 0;

  while (value++ < marbles) {
    player = (player % numPlayers) + 1;
    if (value % 23 === 0) {
      scores[player] += value;
      scores[player] += circle.splice(currentIndex - 7, 1)[0];
      // do something with 23
      nextIndex = false;
    } else {
      nextIndex = (currentIndex + 1) % circle.length + 1;
      circle.splice(nextIndex, 0, value);
    }
    console.log(player, circle);
    // console.log(player, value);
  }
}

answer(example0);
