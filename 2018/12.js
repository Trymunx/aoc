const exampleState = "#..#.#..##......###...###";
const exampleRules = `...## => #
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
const exampleResults = `xx0: .....#..#.#..##......###...###...........
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
function answer(stateString, rulesNote, iterations) {
    const rules = rulesNote.split("\n").map(rule => {
        const split = rule.split(" ");
        return [split[0], split[2]];
    });
    let state = makeState(stateString);
    // console.log(" 00:", state.state)
    // console.log(exampleResults[0]);
    for (let i = 0; i < iterations; ++i) {
        const newState = {
            state: ".".repeat(state.state.length),
            startIndex: state.startIndex,
        };
        rules.forEach(rule => {
            let strIndex = state.state.indexOf(rule[0]);
            while (strIndex !== -1) {
                // console.log(rule[0], "at", strIndex, "of", state);
                newState.state = newState.state.slice(0, strIndex + 2) + rule[1] + newState.state.slice(strIndex + 3);
                strIndex = state.state.indexOf(rule[0], strIndex + 1);
            }
        });
        state = padState(newState);
        // console.log(exampleResults[i + 1]);
        // console.log(`${i + 1}`.padStart(3, " ") + ":", state.state)
    }
    // state.split("").forEach(l => console.log(l));
    const plants = state.state.matchAll(/#/g);
    let total = 0;
    for (const plant of plants) {
        total += plant.index + state.startIndex;
    }
    return total;
}
// const emptyPot = (index): Pot => ({index, value: "."});
const makeState = (stateString) => {
    return padState({
        state: stateString,
        startIndex: 0,
    });
};
const padState = (state) => {
    const firstPlant = state.state.indexOf("#");
    if (firstPlant < 4) {
        state.state = ".".repeat(4 - firstPlant) + state.state;
        state.startIndex -= (4 - firstPlant);
    }
    while (state.state.slice(-4).indexOf("#") !== -1) {
        state.state += ".";
    }
    return state;
};
// console.log(answer(exampleState, exampleRules, 20));
const initialState = `##...#...###.#.#..#...##.###..###....#.#.###.#..#....#..#......##..###.##..#.##..##..#..#.##.####.##`;
const rules = `.###. => #
###.# => #
#.... => .
..#.. => .
##.#. => .
...#. => .
.#... => #
.##.. => .
..#.# => .
#..#. => .
....# => .
##..# => #
..##. => #
.##.# => #
.#.#. => .
..... => .
##### => .
.#### => #
###.. => .
.#..# => #
#.#.# => #
#..## => #
#...# => #
.#.## => #
##.## => .
..### => .
#.### => .
####. => #
#.##. => #
##... => #
#.#.. => .
...## => #`;
// console.log(answer(initialState, rules, 20));
// let prev = 0;
// for (let i = 0; i < 150; i++) {
//   const ans = answer(initialState, rules, i);
//   console.log(i, ans - prev);
//   prev = ans;
// }
console.log(answer(initialState, rules, 105) + 67 * (50000000000 - 105));
