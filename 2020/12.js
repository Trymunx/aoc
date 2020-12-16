const input = require("fs").readFileSync("input/12.txt", "utf8");

const rad = deg => deg * Math.PI / 180;

const day12 = () => {
  const splitDirs =
    input.trim().split("\n").map(line => [line.slice(0, 1), parseInt(line.slice(1), 10)]);
  const output = [0];
  const pos = {
    bearing: 90,
    x: 0,
    y: 0,
  };
  const ship = {
    x: 0,
    y: 0,
  };
  const waypoint = {
    x: 10,
    y: 1,
  };
  for (const [dir, amount] of splitDirs) {
    switch (dir) {
      case "N":
        pos.y += amount;
        waypoint.y += amount;
        break;
      case "S":
        pos.y -= amount;
        waypoint.y -= amount;
        break;
      case "E":
        pos.x += amount;
        waypoint.x += amount;
        break;
      case "W":
        pos.x -= amount;
        waypoint.x -= amount;
        break;
      case "L": {
        pos.bearing -= amount;
        const x =
          Math.round(waypoint.x * Math.cos(rad(amount)) - waypoint.y * Math.sin(rad(amount)));
        const y =
          Math.round(waypoint.y * Math.cos(rad(amount)) + waypoint.x * Math.sin(rad(amount)));
        waypoint.x = x;
        waypoint.y = y;
        break;
      }
      case "R": {
        pos.bearing += amount;
        const x =
          Math.round(waypoint.x * Math.cos(rad(-amount)) - waypoint.y * Math.sin(rad(-amount)));
        const y =
          Math.round(waypoint.y * Math.cos(rad(-amount)) + waypoint.x * Math.sin(rad(-amount)));
        waypoint.x = x;
        waypoint.y = y;
        break;
      }
      case "F":
        pos.x += amount * Math.round(Math.sin(rad(pos.bearing)));
        pos.y += amount * Math.round(Math.cos(rad(pos.bearing)));

        ship.x += amount * (waypoint.x);
        ship.y += amount * (waypoint.y);
        break;
    }
  }
  output[0] = Math.abs(pos.x) + Math.abs(pos.y);
  output[1] = Math.abs(ship.x) + Math.abs(ship.y);

  return output;
};

console.log(day12());

module.exports = { day12 };
