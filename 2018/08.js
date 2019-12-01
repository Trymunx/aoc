const example1 = `2 3 0 3 10 11 12 1 1 0 1 99 2 1 1 2`;
const puzzleInput = require("./08.json").input;

// Ok so this isn't ideal, I'm just using a global variable for part 1 because it's easy
let metaSum = 0;

class Node {
  constructor(numChildren, numMeta) {
    this.numChildren = numChildren;
    this.numMeta = numMeta;
    this.children = [];
    this.metaData = [];
    this.value = 0;
  }

  makeChild(arr) {
    while(this.numChildren > this.children.length) {
      this.children.push(new Node(parseInt(arr.shift()), parseInt(arr.shift())));
      this.children[this.children.length-1].makeChild(arr);
    }
    while(this.numMeta > this.metaData.length) {
      metaSum += parseInt(arr[0]);
      this.metaData.push(parseInt(arr.shift()));
    }
    if (this.numChildren === 0) {
      this.value = this.metaData.reduce((sum, val) => sum += val);
    } else {
      this.value = this.metaData.reduce((sum, val) => {
        if (val === 0 || val > this.numChildren) return sum;
        return sum += this.children[val - 1].value;
      }, 0);
    }
  }
}

function answer(input) {
  let arr = input.split(" ");
  let head = new Node(parseInt(arr.shift()), parseInt(arr.shift()));
  head.makeChild(arr);

  console.log("Part 1:", metaSum);
  console.log("Part 2:", head.value);
}

answer(puzzleInput);
