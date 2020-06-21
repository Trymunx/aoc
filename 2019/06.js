// Orbits
const input = require('fs').readFileSync('./06.txt', 'utf8');
const example1 = `COM)B
B)C
C)D
D)E
E)F
B)G
G)H
D)I
E)J
J)K
K)L`;
const answer = (puzzleInput) => {
    const input = puzzleInput.split("\n").map(o => o.split(")"));
    const objects = {};
    input.forEach(o => {
        if (objects.hasOwnProperty(o[0])) {
            objects[o[0]].children.push(o[1]);
        }
        else {
            objects[o[0]] = {
                name: o[0],
                children: [o[1]],
            };
        }
    });
    console.log(objects);
    const nodes = [...new Set(input.flat())];
    // console.log(nodes);
    // const com = input.filter(o => o[0] === "COM").map(o => ([o[0], input.filter(b => b[0] === o[1])]));
    return input.length;
};
// console.log(answer(input));
console.log(answer(example1));
