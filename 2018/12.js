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
function answer(state, rulesNote, iterations) {
    const rules = rulesNote.split("\n").map(rule => {
        const split = rule.split(" ");
        return [split[0], split[2]];
    });
    state = padState(state);
    console.log(" 00:", state);
    console.log(exampleResults[0]);
    for (let i = 0; i < iterations; ++i) {
        let newstate = ".".repeat(state.length + 2);
        rules.forEach(rule => {
            let strIndex = state.indexOf(rule[0]);
            while (strIndex !== -1) {
                if (~strIndex) {
                    // console.log(rule[0], "at", strIndex, "of", state);
                    newstate = newstate.slice(0, strIndex + 2) + rule[1] + newstate.slice(strIndex + 3);
                }
                strIndex = state.indexOf(rule[0], strIndex + 1);
            }
            // const output = state.matchAll(rule[0])
            // if (i === 1) console.log(...output);
            // for (const {index} of output) {
            // newstate = newstate.slice(0, index + 2) + rule[1] + newstate.slice(index + 3);
            // }
        });
        state = newstate;
        console.log(exampleResults[i + 1]);
        console.log(`${i + 1}`.padStart(3, " ") + ":", state);
    }
    // state.split("").forEach(l => console.log(l));
    // return State.match(/#/g).length;
}
const padState = (state) => '.....' + state + '..';
console.log(answer(exampleState, exampleRules, 20));
