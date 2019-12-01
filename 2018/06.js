const example1 = `1, 1
1, 6
8, 3
3, 4
5, 5
8, 9`;
const exampleOutput = `aaaaa.cccc
aAaaa.cccc
aaaddecccc
aadddeccCc
..dDdeeccc
bb.deEeecc
bBb.eeee..
bbb.eeefff
bbb.eeffff
bbb.ffffFf`;
const separator = "  .  ";
const points = Array(26).fill(97).map((n, i) => String.fromCharCode(n + i));
const parseInput = (input) => {
    let arr = input.split("\n");
    return arr.map(coord => {
        const split = coord.split(", ");
        return split.map(num => parseInt(num));
    });
};
function answer(input) {
    const coords = parseInput(input);
    // make a bounding box so any points that are next to the edge don't keep counting forever
    let minX;
    let minY;
    let maxX;
    let maxY;
    for (const pair of coords) {
        if (!minX || pair[0] < minX)
            minX = pair[0];
        if (!minY || pair[1] < minY)
            minY = pair[1];
        if (!maxX || pair[0] > maxX)
            maxX = pair[0];
        if (!maxY || pair[1] > maxY)
            maxY = pair[1];
    }
    // const emptyMap = [];
    // for (let y = 0, i = 0; y <= maxY; y++) {
    //   emptyMap[i] = [];
    //   for (let x = 0, j = 0; x <= maxX + 1; x++) {
    //     let minDist;
    //     coords.forEach(( pair, index ) => {
    //       if (pair[0] === x && pair[1] === y) {
    //         // console.log(pair, "at", x, y, "index", index);
    //         // console.log("letter at", index, "is", points[index]);
    //         emptyMap[i][j] = points[index].toUpperCase();
    //       }
    //     })
    //     if (!emptyMap[i][j]) {
    //       emptyMap[i][j] = separator;
    //     }
    //     j++;
    //   }
    //   ++i;
    // }
    const pointMap = [];
    for (let y = minY, i = 0; y <= maxY; y++) {
        pointMap[i] = [];
        for (let x = minX, j = 0; x <= maxX; x++) {
            let minDist;
            coords.forEach((pair, index) => {
                const dist = Math.abs(pair[0] - x) + Math.abs(pair[1] - y);
                if (pair[0] === x && pair[1] === y) {
                    pointMap[i][j] = stringCoord(pair);
                    // pointMap[i][j] = points[index].toUpperCase();
                    minDist = 0;
                }
                else if (minDist === undefined || dist < minDist) {
                    minDist = dist;
                    pointMap[i][j] = stringCoord(pair);
                    // pointMap[i][j] = points[index];
                }
                else if (dist === minDist) {
                    pointMap[i][j] = separator;
                }
            });
            j++;
        }
        ++i;
    }
    const infinitePoints = {};
    for (let y = 0; y < pointMap.length; y++) {
        for (let x = 0; x < pointMap[y].length; x++) {
            if (y !== 0 && y !== pointMap.length - 1 && x !== 0 && x !== pointMap[y].length - 1) {
                continue;
            }
            const point = pointMap[y][x];
            if (point !== separator && !infinitePoints[point]) {
                infinitePoints[point] = true;
            }
        }
    }
    // console.log(infinitePoints);
    const remainingPoints = coords.filter(c => !infinitePoints[stringCoord(c)]).map(c => stringCoord(c));
    // console.log("remaining", remainingPoints);
    const totals = pointMap.flat().reduce((counts, point) => {
        if (!remainingPoints.includes(point)) {
            return counts;
        }
        if (!counts[point])
            counts[point] = 1;
        else
            counts[point]++;
        return counts;
    }, {});
    let max = 0;
    for (const total of Object.values(totals)) {
        max = Math.max(total, max);
    }
    return max;
    // console.log(minX, minY, maxX, maxY);
    // for (const line of emptyMap) {
    //   console.log(line.join(""));
    // }
    // console.log();
    // for (const line of pointMap) {
    //   console.log(line.join(" "));
    // }
    // console.log();
    // console.log(exampleOutput);
}
const answer2 = (input, maxDist) => {
    const coords = parseInput(input);
    // make a bounding box so any points that are next to the edge don't keep counting forever
    let minX;
    let minY;
    let maxX;
    let maxY;
    for (const pair of coords) {
        if (!minX || pair[0] < minX)
            minX = pair[0];
        if (!minY || pair[1] < minY)
            minY = pair[1];
        if (!maxX || pair[0] > maxX)
            maxX = pair[0];
        if (!maxY || pair[1] > maxY)
            maxY = pair[1];
    }
    const pointMap = [];
    for (let y = minY, i = 0; y <= maxY; y++) {
        pointMap[i] = [];
        for (let x = minX, j = 0; x <= maxX; x++) {
            pointMap[i][j] = coords.reduce((sum, pair) => {
                const dist = Math.abs(pair[0] - x) + Math.abs(pair[1] - y);
                return sum + dist;
            }, 0);
            // let minDist;
            // coords.forEach(( pair, index ) => {
            //   const dist = Math.abs(pair[0] - x) + Math.abs(pair[1] - y);
            //   if (pair[0] === x && pair[1] === y) {
            //     pointMap[i][j] = stringCoord(pair);
            //     // pointMap[i][j] = points[index].toUpperCase();
            //     minDist = 0;
            //   } else if (minDist === undefined || dist < minDist) {
            //     minDist = dist;
            //     pointMap[i][j] = stringCoord(pair);
            //     // pointMap[i][j] = points[index];
            //   } else if (dist === minDist) {
            //     pointMap[i][j] = separator;
            //   }
            // })
            j++;
        }
        ++i;
    }
    return pointMap.flat().filter(p => p < maxDist).length;
};
const stringCoord = ([x, y]) => `(${x},${y})`;
console.log(answer(example1));
console.log(answer2(example1, 32));
const input = `137, 282
229, 214
289, 292
249, 305
90, 289
259, 316
134, 103
96, 219
92, 308
269, 59
141, 132
71, 200
337, 350
40, 256
236, 105
314, 219
295, 332
114, 217
43, 202
160, 164
245, 303
339, 277
310, 316
164, 44
196, 335
228, 345
41, 49
84, 298
43, 51
158, 347
121, 51
176, 187
213, 120
174, 133
259, 263
210, 205
303, 233
265, 98
359, 332
186, 340
132, 99
174, 153
206, 142
341, 162
180, 166
152, 249
221, 118
95, 227
152, 186
72, 330`;
console.log(answer(input));
console.log(answer2(input, 10000));
