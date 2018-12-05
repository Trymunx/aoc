const example1 = "dabAcCaBCAcCcaDA";
const example2 = "dabBAcCDaBCAcCcaDA";
const puzzleInput = require("./05.json").input;
// console.log(puzzleInput.input.length);

function polar(x, y) {
  return x === x.toUpperCase()
    ? y === x.toLowerCase()
    : y === x.toUpperCase();
}

function nextLast(out, arr, i) {
      let next = false;
      let last = false;
      let j = out.length;
      let k = i-1;
      while (j <= arr.length && !next) {
        if (arr[j]) {
          next = {
            letter: arr[j],
            index: j,
          };
        }
        j++;
      }
      while (k >= 0 && !last) {
        if (out[k]) {
          last = {
            letter: out[k],
            index: k,
          };
        }
        k--;
      }
  return {next, last};
}

function firstAnswer(input) {
  let arr = input.split("");
  let out = arr.reduce((out, letter, i) => {
    if (out.length > i) return out;
    let matchNext = polar(letter, arr[i+1]);
    if (matchNext) {
      out.push("", "");

      let {next, last} = nextLast(out, arr, i);
      // console.log(next, last);
      while (last && next && polar(last.letter, next.letter)) {
        // console.log(out, example1, arr[i], i);
        if (last && next) {
          // console.log(last, next, polar(last.letter, next.letter));
          if (polar(last.letter, next.letter)) {
            out[last.index] = "";
            out.push("");
          }
        }
        let nl = nextLast(out, arr, i);
        next = nl.next;
        last = nl.last;
        // console.log(last, next);
      }
        // out[i-j] = "";
        // out.push("");
    } else {
      out.push(letter);
    }
    // console.log(out.join(""));
    return out;
  }, []);
  let answerString = out.join("");
  // console.log(answerString.length);
  // if (input !== answerString) firstAnswer(answerString);
  return answerString.length;
}

// firstAnswer(puzzleInput.input);
// firstAnswer(example2); 
console.log(firstAnswer(puzzleInput));

function secondAnswer(input) {
  let min;
  for (let i = 65; i < 91; i++) {
    let re = new RegExp(String.fromCharCode(i), "gi");
    if (min === undefined) {
      min = firstAnswer(input.replace(re, ""));
    } else {
      min = Math.min(min, firstAnswer(input.replace(re, "")));
    }
  }
  // console.log(min);
  return min;
}

console.log(secondAnswer(puzzleInput));
