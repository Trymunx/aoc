var input11 = require("fs").readFileSync("input/11.txt", "utf8");
var test = "L.LL.LL.LL\nLLLLLLL.LL\nL.L.L..L..\nLLLL.LL.LL\nL.LL.LL.LL\nL.LLLLL.LL\n..L.L.....\nLLLLLLLLLL\nL.LLLLLL.L\nL.LLLLL.LL";
var display = function (grid, row, col) {
    var c = col * 2 + 1;
    var lines = grid.map(function (line) { return " " + line.join(" ") + " "; });
    lines[row] =
        lines[row].slice(0, c - 1)
            + "[" + lines[row][c] + "]" +
            lines[row].slice(c + 2);
    return lines.join("\n");
};
var simulate = function (grid) {
    var newGrid = [];
    var totalSeats = 0;
    for (var row = 0; row < grid.length; row++) {
        newGrid[row] = [];
        for (var col = 0; col < grid[row].length; col++) {
            var occupiedSurrounding = 0;
            for (var i = -1; i <= 1; i++) {
                for (var j = -1; j <= 1; j++) {
                    if (row + i < 0 || row + i >= grid.length ||
                        col + j < 0 || col + j >= grid[row].length ||
                        i === 0 && j === 0) {
                        continue;
                    }
                    occupiedSurrounding += grid[row + i][col + j] === "#" ? 1 : 0;
                }
            }
            switch (grid[row][col]) {
                case "L":
                    newGrid[row][col] = occupiedSurrounding === 0 ? "#" : "L";
                    break;
                case "#":
                    newGrid[row][col] = occupiedSurrounding > 3 ? "L" : "#";
                    break;
                case ".":
                    newGrid[row][col] = ".";
                    break;
            }
            totalSeats += newGrid[row][col] === "#" ? 1 : 0;
        }
    }
    return { grid: newGrid, totalSeats: totalSeats };
};
var part1 = function () {
    var lastTotal = 0;
    var newTotal;
    // let grid = test.split("\n").map(line => line.split(""));
    var grid = input11.split("\n").map(function (line) { return line.split(""); });
    while (lastTotal !== newTotal) {
        lastTotal = newTotal;
        // console.log("simulating...", lastTotal, newTotal);
        var results = simulate(grid);
        grid = results.grid;
        // let results = simulate(test.split("\n").map(line => line.split("")));
        // console.log(results.grid.map(line => line.join("")).join("\n"), "\n", results.totalSeats);
        // results = simulate(results.grid);
        // console.log(results.grid.map(line => line.join("")).join("\n"), "\n", results.totalSeats);
        // results = simulate(results.grid);
        // console.log(results.grid.map(line => line.join("")).join("\n"), "\n", results.totalSeats);
        // results = simulate(results.grid);
        // console.log(results.grid.map(line => line.join("")).join("\n"), "\n", results.totalSeats);
        // results = simulate(results.grid);
        // console.log(results.grid.map(line => line.join("")).join("\n"), "\n", results.totalSeats);
        // results = simulate(results.grid);
        // console.log(results.grid.map(line => line.join("")).join("\n"), "\n", results.totalSeats);
        newTotal = results.totalSeats;
    }
    return newTotal;
};
var simulate2 = function (grid) {
    var newGrid = [];
    var totalSeats = 0;
    for (var row = 0; row < grid.length; row++) {
        newGrid[row] = [];
        for (var col = 0; col < grid[row].length; col++) {
            var occupiedSurrounding = 0;
            for (var i = -1; i <= 1; i++) {
                for (var j = -1; j <= 1; j++) {
                    var hitSeatOrEdge = false;
                    var cell = [row, col];
                    while (!hitSeatOrEdge && i !== 0 && j !== 0) {
                        cell = [cell[0] + i, cell[1] + j];
                        hitSeatOrEdge =
                            (cell[0] === 0 && cell[1] === 0) ||
                                (cell[0] < 0 || cell[0] > grid.length) ||
                                (cell[1] < 0 || cell[1] > grid[row].length) ||
                                (grid[cell[0]][cell[1]] === "#") ||
                                (grid[cell[0]][cell[1]] === "L");
                    }
                    if (cell[0] >= 0 && cell[0] < grid.length && cell[1] >= 0 && cell[1] < grid[row].length) {
                        console.log(cell);
                        occupiedSurrounding += grid[cell[0]][cell[1]] === "#" ? 1 : 0;
                    }
                }
            }
            switch (grid[row][col]) {
                case "L":
                    newGrid[row][col] = occupiedSurrounding === 0 ? "#" : "L";
                    break;
                case "#":
                    newGrid[row][col] = occupiedSurrounding > 3 ? "L" : "#";
                    break;
                case ".":
                    newGrid[row][col] = ".";
                    break;
            }
            totalSeats += newGrid[row][col] === "#" ? 1 : 0;
        }
    }
    return { grid: newGrid, totalSeats: totalSeats };
};
var part2 = function () {
    var lastTotal = 0;
    var newTotal;
    var grid = test.split("\n").map(function (line) { return line.split(""); });
    // let grid = input11.split("\n").map((line: string) => line.split(""));
    while (lastTotal !== newTotal) {
        lastTotal = newTotal;
        // console.log("simulating...", lastTotal, newTotal);
        var results = simulate2(grid);
        grid = results.grid;
        // let results = simulate(test.split("\n").map(line => line.split("")));
        // console.log(results.grid.map(line => line.join("")).join("\n"), "\n", results.totalSeats);
        // results = simulate(results.grid);
        // console.log(results.grid.map(line => line.join("")).join("\n"), "\n", results.totalSeats);
        // results = simulate(results.grid);
        // console.log(results.grid.map(line => line.join("")).join("\n"), "\n", results.totalSeats);
        // results = simulate(results.grid);
        // console.log(results.grid.map(line => line.join("")).join("\n"), "\n", results.totalSeats);
        // results = simulate(results.grid);
        // console.log(results.grid.map(line => line.join("")).join("\n"), "\n", results.totalSeats);
        // results = simulate(results.grid);
        // console.log(results.grid.map(line => line.join("")).join("\n"), "\n", results.totalSeats);
        newTotal = results.totalSeats;
    }
    return newTotal;
};
var day11 = function () {
    return [part1(), part2()];
};
console.log(day11());
module.exports = { day11: day11 };
