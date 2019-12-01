const exampleState = "#..#.#..##......###...###";

const exampleRules =
`...## => #
..#.. => #
.#... => #
.#.#. => #
.#.## => #
.##.. => #
.#### => #
#.#.# => #
#.### => #
##.#. => #
##.## => #
###.. => #
###.# => #
####. => #`;

const exampleResults =
`xx0: .....#..#.#..##......###...###...........
xx1: .....#...#....#.....#..#..#..#...........
xx2: .....##..##...##....#..#..#..##..........
xx3: ....#.#...#..#.#....#..#..#...#..........
xx4: .....#.#..#...#.#...#..#..##..##.........
xx5: ......#...##...#.#..#..#...#...#.........
xx6: ......##.#.#....#...#..##..##..##........
xx7: .....#..###.#...##..#...#...#...#........
xx8: .....#....##.#.#.#..##..##..##..##.......
xx9: .....##..#..#####....#...#...#...#.......
x10: ....#.#..#...#.##....##..##..##..##......
x11: .....#...##...#.#...#.#...#...#...#......
x12: .....##.#.#....#.#...#.#..##..##..##.....
x13: ....#..###.#....#.#...#....#...#...#.....
x14: ....#....##.#....#.#..##...##..##..##....
x15: ....##..#..#.#....#....#..#.#...#...#....
x16: ...#.#..#...#.#...##...#...#.#..##..##...
x17: ....#...##...#.#.#.#...##...#....#...#...
x18: ....##.#.#....#####.#.#.#...##...##..##..
x19: ...#..###.#..#.#.#######.#.#.#..#.#...#..
x20: ...#....##....#####...#######....#.#..##.`.split("\n");

interface Pot {
  index: number;
  value: "." | "#";
}

type State = Pot[];

function answer(stateString: string, rulesNote: string, iterations: number) {
  const rules: Array<[string, string]> = rulesNote.split("\n").map(rule => {
    const split = rule.split(" ");
    return [split[0], split[2]];
  });

  let state: State = makeState(stateString);

  console.log(" 00:", state)
  console.log(exampleResults[0]);

  for (let i = 0; i < iterations; ++i) {
    let newstate: State = new Array(state.length + 2).fill(i => emptyPot(i));
    rules.forEach(rule => {
      let strIndex = state.indexOf(rule[0]);
      while (strIndex !== -1) {
        if (~strIndex) {
          // console.log(rule[0], "at", strIndex, "of", state);
          newstate = newstate.slice(0, strIndex + 2) + rule[1] + newstate.slice(strIndex + 3);
        }
        strIndex = state.indexOf(rule[0], strIndex + 1);
      }
    })
    state = newstate;
    console.log(exampleResults[i + 1]);
    console.log(`${i + 1}`.padStart(3, " ") + ":", state)
  }
  // state.split("").forEach(l => console.log(l));

  // return State.match(/#/g).length;
}

const emptyPot = (index): Pot => ({index, value: "."});

const makeState = (stateString: string): State => {
  const split = stateString.split("");
  const state = [];
  for (const i of [-2, -1]) state.push(emptyPot(i));
  return state.concat(split.map((value, index) => ({index, value})));
}

console.log(answer(exampleState, exampleRules, 20));

