const example = `/->-\\        
|   |  /----\\
| /-+--+-\\  |
| | |  | v  |
\\-+-/  \\-+--/
  \\------/   `;
const example2 = `/>-<\\  
|   |  
| /<+-\\
| | | v
\\>+</ |
  |   ^
  \\<->/`;
const puzzleInput = require("./13input.js");

const cartIcons = ["<", "^", ">", "v"];

class Cart {
  constructor(name, dir, x, y, grid) {
    this.name = name;
    this.dir = dir;
    this.pos = {x, y};
    this.turns = ["left", "straight", "right"];
    this.turn = 0;
    this.prev;
    this.hasCollided = false;

    switch (this.dir) {
      case "<":
      case ">":
        this.prev = "-";
        break;
      case "^":
      case "v":
        this.prev = "|";
        break;
    }
  }

  update(grid) {
    // console.log("Updating cart", this.name, "at:", this.pos.x, this.pos.y, this.dir);
    grid[this.pos.y][this.pos.x] = this.prev;
    switch (this.dir) {
      case "<":
        switch (grid[this.pos.y][this.pos.x - 1]) {
          case ">":
          case "v":
          case "^":
            console.log("COLLISION! At:", this.pos.x - 1, this.pos.y);
            this.hasCollided = true;
            break;
          case "+":
            switch (this.turns[this.turn]) {
              case "left":
                this.dir = "v";
                break;
              case "right":
                this.dir = "^";
                break;
            }
            this.turn = (this.turn + 1) % this.turns.length;
            break;
          case "\\":
            this.dir = "^";
            break;
          case "/":
            this.dir = "v";
            break;
        }
        this.pos.x--;
        break;
      case "^":
        switch (grid[this.pos.y - 1][this.pos.x]) {
          case ">":
          case "v":
          case "<":
            console.log("COLLISION! At:", this.pos.x, this.pos.y + 1);
            this.hasCollided = true;
            break;
          case "+":
            switch (this.turns[this.turn]) {
              case "left":
                this.dir = "<";
                break;
              case "right":
                this.dir = ">";
                break;
            }
            this.turn = (this.turn + 1) % this.turns.length;
            break;
          case "\\":
            this.dir = "<";
            break;
          case "/":
            this.dir = ">";
            break;
        }
        this.pos.y--;
        break;
      case ">":
        switch (grid[this.pos.y][this.pos.x + 1]) {
          case "^":
          case "v":
          case "<":
            console.log("COLLISION! At:", this.pos.x + 1, this.pos.y);
            this.hasCollided = true;
            break;
          case "+":
            switch (this.turns[this.turn]) {
              case "left":
                this.dir = "^";
                break;
              case "right":
                this.dir = "v";
                break;
            }
            this.turn = (this.turn + 1) % this.turns.length;
            break;
          case "\\":
            this.dir = "v";
            break;
          case "/":
            this.dir = "^";
            break;
        }
        this.pos.x++;
        break;
      case "v":
        switch (grid[this.pos.y + 1][this.pos.x]) {
          case "^":
          case ">":
          case "<":
            console.log("COLLISION! At:", this.pos.x, this.pos.y - 1);
            this.hasCollided = true;
            break;
          case "+":
            switch (this.turns[this.turn]) {
              case "left":
                this.dir = ">";
                break;
              case "right":
                this.dir = "<";
                break;
            }
            this.turn = (this.turn + 1) % this.turns.length;
            break;
          case "\\":
            this.dir = ">";
            break;
          case "/":
            this.dir = "<";
            break;
        }
        this.pos.y++;
        break;
      default:
        console.error("No dir:", this.dir);
        break;
    }
    // console.log("  updated cart now:", this.pos.x, this.pos.y, this.dir);
    this.prev = grid[this.pos.y][this.pos.x];
    if (!this.hasCollided) {
      grid[this.pos.y][this.pos.x] = this.dir;
    }
    return {newGrid: grid, pos: this.pos, collision: this.hasCollided};
  }
}

function answer(input) {
  const rows = input.split("\n");
  let grid = rows.map(row => row.split(""));
  let newCarts;

  let carts = grid.reduce((carts, row, i, grid) => {
    let cartsInRow = row.reduce((arr, cell, j) => {
      if (/[\<\^v\>]/.test(cell)) {
        arr.push(new Cart(`${j}${i}`, cell, j, i));
      }
      return arr;
    }, []);
    if (cartsInRow.length) {
      carts.push(cartsInRow);
    }
    return carts;
  }, []);

  let counter = 0;
  while ((carts.length > 1 || carts[0].length > 1) && counter++ < 800) {
    // console.log("");
    newCarts = [];
    carts.forEach(row => row.forEach(cart => {
      let {newGrid, pos, collision} = cart.update(grid);
      if (collision) {
        let colPrev;
        // Find collided cart and mark as hasCollided
        newCarts = newCarts.map(row => row.map(cart => {
          if (cart.pos.x === pos.x && cart.pos.y === pos.y) {
            cart.hasCollided = true;
            colPrev = cart.prev;
          }
          return cart;
        }));
        carts = carts.map(row => row.map(cart => {
          if (cart.pos.x === pos.x && cart.pos.y === pos.y) {
            cart.hasCollided = true;
            if (colPrev === undefined) {
              colPrev = cart.prev;
            }
          }
          return cart;
        }));
        // Find cart pos and change to cart.pos
        newGrid[pos.y][pos.x] = colPrev;
      }
      if (newCarts[pos.y] === undefined) {
        newCarts[pos.y] = [cart];
      } else {
        newCarts[pos.y].push(cart);
      }
      grid = newGrid;
    }));

    // grid.forEach(row => console.log(row.join("")));

    newCarts = newCarts.map(row => row.filter(cart => !cart.hasCollided));
    newCarts = newCarts.filter(row => row);
    newCarts = newCarts.map(row => row.sort((a, b) => a.pos.x - b.pos.x));

    carts = newCarts.slice();
    // console.log(carts);
    // console.log(carts.length, counter);
  }
  console.log(carts[0][0].pos);
}

// answer(example);
answer(example2);
answer(puzzleInput);
