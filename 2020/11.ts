const input11 = require("fs").readFileSync("input/11.txt", "utf8");

const test = `L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL`;

const display = (grid: string[][], row: number, col: number): string => {
  const c = col * 2 + 1;
  const lines = grid.map(line => ` ${line.join(" ")} `);
  lines[row] =
    lines[row].slice(0, c - 1)
    + "[" + lines[row][c] + "]" +
    lines[row].slice(c + 2);
  return lines.join("\n");
};

const simulate = (grid: string[][]): {grid: string[][]; totalSeats: number} => {
  const newGrid = [];
  let totalSeats = 0;
  for (let row = 0; row < grid.length; row++) {
    newGrid[row] = [];
    for (let col = 0; col < grid[row].length; col++) {
      let occupiedSurrounding = 0;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          if (
            row + i < 0 || row + i >= grid.length ||
            col + j < 0 || col + j >= grid[row].length ||
            i === 0 && j === 0
          ) {
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

  return { grid: newGrid, totalSeats };
};

const part1 = (): number => {
  let lastTotal = 0;
  let newTotal: number;
  // let grid = test.split("\n").map(line => line.split(""));
  let grid = input11.split("\n").map((line: string) => line.split(""));

  while (lastTotal !== newTotal) {
    lastTotal = newTotal;
    // console.log("simulating...", lastTotal, newTotal);
    const results = simulate(grid);
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

const simulate2 = (grid: string[][]): {grid: string[][]; totalSeats: number} => {
  const newGrid = [];
  let totalSeats = 0;
  for (let row = 0; row < grid.length; row++) {
    newGrid[row] = [];
    for (let col = 0; col < grid[row].length; col++) {
      let occupiedSurrounding = 0;
      for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
          let hitSeatOrEdge = false;
          let cell = [row, col];
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

  return { grid: newGrid, totalSeats };
};

const part2 = (): number => {
  let lastTotal = 0;
  let newTotal: number;
  let grid = test.split("\n").map(line => line.split(""));
  // let grid = input11.split("\n").map((line: string) => line.split(""));

  while (lastTotal !== newTotal) {
    lastTotal = newTotal;
    // console.log("simulating...", lastTotal, newTotal);
    const results = simulate2(grid);
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

const day11 = (): number[] => {
  return [part1(), part2()];
};

console.log(day11());

module.exports = { day11 };
