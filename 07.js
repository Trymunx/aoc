const example = `Step C must be finished before step A can begin.
Step C must be finished before step F can begin.
Step A must be finished before step B can begin.
Step A must be finished before step D can begin.
Step B must be finished before step E can begin.
Step D must be finished before step E can begin.
Step F must be finished before step E can begin.`;
const puzzleInput = require("./07input.js");

const isExample = true;
const numWorkers = isExample ? 2 : 5;
let times = {};
for (let i = 1; i <= 26; i++) {
  if (isExample) {
    times[String.fromCharCode(i+64)] = i;
  } else {
    times[String.fromCharCode(i+64)] = i + 60;
  }
}

function createGraph(input) {
  let regex = /^Step (.).*step (.).*$/;
  let deps = input.split("\n").map(row => [row.match(regex)[1], row.match(regex)[2]]);

  let graph = {};
  deps.forEach(row => {
    if (!graph[row[0]]) graph[row[0]] = [];
    if (graph[row[1]]) graph[row[1]].push(row[0]);
    else graph[row[1]] = [row[0]];
  });

  return graph;
}

function answer1(input) {
  let out = "";
  let graph = createGraph(input);

  let keys = Object.keys(graph);
  while (keys.length > 0) {
    let emptyNodes = keys.filter(key => !graph[key].length).sort();
    out += emptyNodes[0];
    graph = keys.reduce((g, key) => {
      if (key === emptyNodes[0]) return g;
      g[key] = graph[key].filter(i => i !== emptyNodes[0]);
      return g;
    }, {});
    keys = Object.keys(graph);
  }
  console.log(out);
}

class Worker {
  constructor(name) {
    this.name = name;
    this.workingOn;
    this.idle = true;
    this.timeLeft = 0;
  }

  start(task) {
    console.log("worker:", this.name, "starting", task);
    this.idle = false;
    this.workingOn = task;
    this.timeLeft = times[task] - 1;
  }

  update() {
    console.log(this.name, this.workingOn, this.timeLeft);
    if (!this.timeLeft--) {
      let done = this.workingOn;
      console.log(done, "complete");
      this.workingOn = null;
      this.idle = true;
      return done;
    } else {
      return false;
    }
  }
}

function answer2(input) {
  let timeTaken = 0;
  let graph = createGraph(input);
  let idleWorkers = Array(numWorkers).fill(0).map((_, i) => new Worker(i));
  let complete = [];
  // console.log(idleWorkers);

  let keys = Object.keys(graph);
  while (keys.length > 0) {
    idleWorkers.forEach(worker => {
      if (worker.idle) {
        // at this point the nodes' dependencies must have been finished
        let emptyNodes = keys.filter(key => !graph[key].length).sort();
        // console.log(emptyNodes);
        if (emptyNodes.length > 0) {
          worker.start(emptyNodes[0]);


          // console.log("graph before", graph);
          graph = keys.reduce((g, key) => {
            if (key === emptyNodes[0]) return g;
            g[key] = graph[key];
            return g;
          }, {});
          // console.log("graph here is", graph);
          keys = Object.keys(graph);
        }
      } else {
        console.log("Timer:", timeTaken - 1);
        let done = worker.update();
        if (done) {
          complete.push(done);
          // console.log("complete", complete);
          graph = keys.reduce((g, key) => {
            if (key === done) return g;
            g[key] = graph[key].filter(i => i !== done);
            return g;
          }, {});
          // keys = Object.keys(graph);
          //
          // at this point the nodes' dependencies must have been finished
          let emptyNodes = keys.filter(key => !graph[key].length).sort();
          // console.log(emptyNodes);
          if (emptyNodes.length > 0) {
            worker.start(emptyNodes[0]);


            // console.log("graph before", graph);
            graph = keys.reduce((g, key) => {
              if (key === emptyNodes[0]) return g;
              g[key] = graph[key];
              return g;
            }, {});
            // console.log("graph here is", graph);
            keys = Object.keys(graph);
          }
        }
      }
    });

    // keys = [];
    // console.log("incrementing timer:", timeTaken + 1);
    timeTaken++;
  }
  console.log(timeTaken);
}

// answer1(example);
answer1(puzzleInput);
if (isExample) console.log("Example running with 2 workers taking 1 second for A.");
answer2(example);
// answer2(puzzleInput);
