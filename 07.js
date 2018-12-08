const example = `Step C must be finished before step A can begin.
Step C must be finished before step F can begin.
Step A must be finished before step B can begin.
Step A must be finished before step D can begin.
Step B must be finished before step E can begin.
Step D must be finished before step E can begin.
Step F must be finished before step E can begin.`;
const puzzleInput = require("./07input.js");

const isExample = false;
// const isExample = true;
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

function removeNode(node, graph) {
  let keys = Object.keys(graph);
  return keys.reduce((g, key) => {
    if (key === node) return g;
    g[key] = graph[key].filter(i => i !== node);
    return g;
  }, {});
}

function answer1(input) {
  let out = "";
  let graph = createGraph(input);

  let keys = Object.keys(graph);
  while (keys.length > 0) {
    let emptyNodes = keys.filter(key => !graph[key].length).sort();
    out += emptyNodes[0];
    graph = removeNode(emptyNodes[0], graph);
    keys = Object.keys(graph);
  }
  console.log(out);
}

const names = [
  "Alice",
  "Brian",
  "Charlie",
  "Dave",
  "Ernest",
];

class Worker {
  constructor(name) {
    this.name = name;
    this.workingOn;
    this.idle = true;
    this.timeLeft = 0;
  }

  start(task) {
    this.idle = false;
    this.workingOn = task;
    this.timeLeft = times[task];
  }

  update() {
    if (!--this.timeLeft) {
      let done = this.workingOn;
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
  let idleWorkers = Array(numWorkers).fill(0).map((_, i) => new Worker(names[i]));
  let workingWorkers = [];
  let inProgress = [];
  let complete = [];

  let keys = Object.keys(graph);


  while (keys.length > 0) {

    // Update working workers and find out if any are done
    workingWorkers.forEach(worker => {
      let done = worker.update();
      if (done) {
        // remove task from in progress
        inProgress.splice(inProgress.indexOf(done), 1);
        complete.push(done);
        workingWorkers = workingWorkers.filter(w => w.name !== worker.name);
        // remove node from graph
        graph = removeNode(done, graph);
        keys = Object.keys(graph);
        // move worker back into idle pool
        idleWorkers.push(worker);
      }
    });

    // Find tasks that can be started
    let readyTasks = keys.filter(key => !graph[key].length && !inProgress.includes(key)).sort();
    while (readyTasks.length > 0 && idleWorkers.length > 0) {
      let worker = idleWorkers.pop();
      let task = readyTasks.shift();
      worker.start(task);
      workingWorkers.push(worker);
      inProgress.push(task);
    }

    timeTaken++;
  }
    console.log(timeTaken - 1);
}

answer1(example);
answer1(puzzleInput);
if (isExample) {
  console.log("Example running with 2 workers taking 1 second for A.");
  answer2(example);
} else {
  answer2(puzzleInput);
}
