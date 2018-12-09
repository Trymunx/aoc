const example0 = `9 players; last marble is worth 25 points`; // 32
const example01 = `9 players; last marble is worth 250 points`; // 32
const example02 = `9 players; last marble is worth 2500 points`; // 32
const example03 = `9 players; last marble is worth 25000 points`; // 32
const example1 = `10 players; last marble is worth 1618 points`; // 8317
const example2 = `13 players; last marble is worth 7999 points`; // 146373
const example3 = `17 players; last marble is worth 1104 points`; // 2764
const example4 = `21 players; last marble is worth 6111 points`; // 54718
const example5 = `30 players; last marble is worth 5807 points`; // 37305
const puzzleInput = `419 players; last marble is worth 71052 points`;
const puzzleInput2 = `419 players; last marble is worth 7105200 points`;

function answer(input) {
  let numPlayers = input.replace(/^(\d+).*$/, "$1");
  let marbles = input.replace(/^.*worth (\d+) points$/, "$1");
  // console.log(numPlayers, marbles);

  let circle = [0];
  let player = 0;
  let scores = {};
  let currentIndex = 0;
  let nextIndex; 
  let value = 0;

  let counter = 0;

  while (value++ < marbles) {
    player = (player % numPlayers) + 1;

    if (value % 23 === 0) {
      if (scores[player]) {
        scores[player] += value;
      } else {
        scores[player] = value;
      }
      scores[player] += circle.splice(currentIndex - 7, 1)[0];
      currentIndex = currentIndex - 7;
      if (currentIndex < 0) {
        currentIndex = circle.length + currentIndex + 1;
      }
    } else {
      nextIndex = (currentIndex + 1) % circle.length + 1;
      circle.splice(nextIndex, 0, value);
      currentIndex = nextIndex;
    }

    counter++;
  }
  // console.log(scores);
  let max = 0;
  Object.keys(scores).forEach(player => max = Math.max(max, scores[player]));
  console.log(max);
}

class circularLinkedList {
  constructor(value) {
    this.val = value;
    this.pre = null;
    this.next = null;
  }

  addNode(value) {
    
  }
}
function linkedListAnswer(input) {
  let numPlayers = input.replace(/^(\d+).*$/, "$1");
  let marbles = input.replace(/^.*worth (\d+) points$/, "$1");

}

// answer(example0);
// answer(example01);
// answer(example02);
// answer(example03);
// answer(example1);
// answer(example2);
// answer(example3);
// answer(example4);
// answer(example5);
answer(puzzleInput);
// answer(puzzleInput2);

