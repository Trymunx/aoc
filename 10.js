const example = `position=< 9,  1> velocity=< 0,  2>
position=< 7,  0> velocity=<-1,  0>
position=< 3, -2> velocity=<-1,  1>
position=< 6, 10> velocity=<-2, -1>
position=< 2, -4> velocity=< 2,  2>
position=<-6, 10> velocity=< 2, -2>
position=< 1,  8> velocity=< 1, -1>
position=< 1,  7> velocity=< 1,  0>
position=<-3, 11> velocity=< 1, -2>
position=< 7,  6> velocity=<-1, -1>
position=<-2,  3> velocity=< 1,  0>
position=<-4,  3> velocity=< 2,  0>
position=<10, -3> velocity=<-1,  1>
position=< 5, 11> velocity=< 1, -2>
position=< 4,  7> velocity=< 0, -1>
position=< 8, -2> velocity=< 0,  1>
position=<15,  0> velocity=<-2,  0>
position=< 1,  6> velocity=< 1,  0>
position=< 8,  9> velocity=< 0, -1>
position=< 3,  3> velocity=<-1,  1>
position=< 0,  5> velocity=< 0, -1>
position=<-2,  2> velocity=< 2,  0>
position=< 5, -2> velocity=< 1,  2>
position=< 1,  4> velocity=< 2,  1>
position=<-2,  7> velocity=< 2, -2>
position=< 3,  6> velocity=<-1, -1>
position=< 5,  0> velocity=< 1,  0>
position=<-6,  0> velocity=< 2,  0>
position=< 5,  9> velocity=< 1, -2>
position=<14,  7> velocity=<-2,  0>
position=<-3,  6> velocity=< 2, -1>`;
const puzzleInput = require("./10input.js");

function getArea(pointsArray) {
  let minx, miny, maxx, maxy, area;
  pointsArray.forEach(point => {
    if (!minx) minx = point[0][0];
    else minx = Math.min(minx, point[0][0]);
    if (!maxx) maxx = point[0][0];
    else maxx = Math.max(maxx, point[0][0]);
    if (!miny) miny = point[0][1];
    else miny = Math.min(miny, point[0][1]);
    if (!maxy) maxy = point[0][1];
    else maxy = Math.max(maxy, point[0][1]);
  });
  return (maxx - minx) * (maxy - miny);
}

function update(pointsArray) {
  return pointsArray.map(point => {
    return [[point[0][0] + point[1][0], point[0][1] + point[1][1]], [point[1][0], point[1][1]]];
  });
}


function answer(input) {
  let pairs = input.split("\n");
  let points = pairs.reduce((points, row) => {
    let arr = row.match(/-*\d+/g);
    points.push([[parseInt(arr[0]), parseInt(arr[1])], [parseInt(arr[2]), parseInt(arr[3])]]);
    return points;
  }, []);


  let lastArea;
  let s = 0;
  let area = getArea(points);
  do {
    s++;
    lastArea = area;
    lastPoints = points;
    points = update(points);
    area = getArea(points);
  } while (area < lastArea);
  console.log(s - 1);
  let finalPoints = lastPoints.map(pnt => pnt[0]);
  let drawable = normalise(finalPoints);
  draw(drawable);
}

function normalise(pointArray) {
  let offset = {x: 0, y: 0};
  let minimum = {x: null, y: null};
  pointArray.forEach(point => {
    if (point[0] + offset.x < 0) {
      offset.x = (0 - point[0]);
    }
    if (point[1] + offset.y < 0) {
      offset.y = (0 - point[1]);
    }
    minimum.x = (minimum.x !== null)
      ? minimum.x = Math.min(point[0] + offset.x, minimum.x)
      : minimum.x = point[0] + offset.x;

    minimum.y = (minimum.y !== null)
      ? minimum.y = Math.min(point[0] + offset.y, minimum.y)
      : minimum.y = point[0] + offset.y;
  });
  return pointArray.map(point => [point[0] + offset.x - minimum.x, point[1] + offset.y - minimum.y]);
}

function draw(points) {
  let drawing = points.reduce((arr, point) => {
    while (arr.length <= point[1]) {
      arr.push([]);
    }
    while (arr[point[1]].length < point[0]) {
      arr[point[1]].push(" ");
    }
    if (arr[point[1]].length === point[0]) {
      arr[point[1]].push("#");
    } else {
      arr[point[1]][point[0]] = "#";
    }
    return arr;
  }, [])
  drawing.forEach(row => {
    let str = row.join("");
    if (!/^\s*$/.test(str)) {
      console.log(str);
    }
  });
}

answer(example);
answer(puzzleInput);
