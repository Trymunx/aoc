export {};

const fs = require("fs");

type OpCode = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 99;

interface Instruction {
  code: OpCode;
  paramLength: 0 | 1 | 2 | 3;
  immediateWP: boolean;
}

const codes: {
  [code: number]: Instruction
} = {
  1: {
    code: 1,
    immediateWP: false,
    paramLength: 3,
  },
  2: {
    code: 2,
    immediateWP: false,
    paramLength: 3,
  },
  3: {
    code: 3,
    immediateWP: false,
    paramLength: 1,
  },
  4: {
    code: 4,
    immediateWP: true,
    paramLength: 1,
  },
  5: {
    code: 5,
    immediateWP: true,
    paramLength: 2,
  },
  6: {
    code: 6,
    immediateWP: true,
    paramLength: 2,
  },
  7: {
    code: 7,
    immediateWP: false,
    paramLength: 3,
  },
  8: {
    code: 8,
    immediateWP: false,
    paramLength: 3,
  },
  99: {
    code: 99,
    immediateWP: false,
    paramLength: 0,
  },
};

function answer(input: string, phase: number, inputSignal: number, debug = false) {
  const instructions: number[] = input.split(",").map(Number);
  let phaseSet = false;
  let output: number;

  let ptr = 0;

  if (debug) {
    console.log([
      ...instructions.slice(0, ptr),
      `[${instructions[ptr]}]`,
      ...instructions.slice(ptr + 1),
    ].join(","));
  }

  while (ptr < instructions.length) {
    const fullOp = instructions[ptr];
    let op: Instruction;
    let paramModeStr: string;

    if (Math.log10(fullOp) > 2) {
      op = codes[parseInt(fullOp.toString().slice(-2))];
      paramModeStr = fullOp
        .toString()
        .slice(0, -2)
        .padStart(op.immediateWP ? op.paramLength : op.paramLength - 1, "0");

      if (debug) console.log("  paramModes:", paramModeStr);
    } else {
      op = codes[fullOp];
    }

    if (op === undefined) {
      throw new Error(fullOp + " is not a known operation");
    }
    if (paramModeStr && paramModeStr.length > op.paramLength) {
      throw new Error(paramModeStr + " param modes greater than paramLength of op " + op.code);
    }

    if (op.code === 99) {
      return output;
    }


    const parameters = instructions.slice(ptr + 1, ptr + op.paramLength + 1);
    const parsedParams = [];

    let writePointer;

    if (!op.immediateWP) {
      writePointer = parameters.pop();
    }

    while (parameters.length) {
      const parsed = paramModeStr && paramModeStr[parameters.length - 1] === "1"
        ? parameters.shift()
        : instructions[parameters.shift()];
      parsedParams.push(parsed);
    }

    writePointer =
      writePointer === undefined ? parsedParams[parsedParams.length - 1] : writePointer;

    if (debug) {
      console.log(parsedParams);

      console.log("op", op.code, "params", parsedParams, "writing to", writePointer);
    }

    switch (op.code) {
      case 1:
        instructions[writePointer] = parsedParams[0] + parsedParams[1];
        ptr += op.paramLength + 1;
        break;
      case 2:
        instructions[writePointer] = parsedParams[0] * parsedParams[1];
        ptr += op.paramLength + 1;
        break;
      case 3:
        if (!phaseSet) {
          // console.log(">> writing", phase, "to", writePointer);
          instructions[writePointer] = phase;
          phaseSet = true;
        } else {
          // console.log(">> writing", inputSignal, "to", writePointer);
          instructions[writePointer] = inputSignal;
        }
        ptr += op.paramLength + 1;
        break;
      case 4:
        // console.log(parsedParams[0]);
        output = parsedParams[0];
        ptr += op.paramLength + 1;
        break;
      case 5:
        if (parsedParams[0] !== 0) {
          // console.log("  jump: set ptr to", writePointer, instructions[writePointer]);
          // console.log(5, "jump");
          ptr = writePointer;
        } else {
          ptr += op.paramLength + 1;
        }
        break;
      case 6:
        if (parsedParams[0] === 0) {
          // console.log(6, "jump");
          ptr = writePointer;
        } else {
          ptr += op.paramLength + 1;
        }
        break;
      case 7:
        if (parsedParams[0] < parsedParams[1]) {
          instructions[writePointer] = 1;
        } else {
          instructions[writePointer] = 0;
        }
        ptr += op.paramLength + 1;
        break;
      case 8:
        if (parsedParams[0] === parsedParams[1]) {
          instructions[writePointer] = 1;
        } else {
          instructions[writePointer] = 0;
        }
        ptr += op.paramLength + 1;
        break;
    }

    if (debug) {
      console.log([
        ...instructions.slice(0, ptr),
        `[${instructions[ptr]}]`,
        ...instructions.slice(ptr + 1),
      ].join(","));
    }
  }
}

const input = require("fs").readFileSync("07.txt", "utf8");
// const input = "3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5";

// const f = x => x > 1 ? x * f(x-1) : 1;
const intersect = (x, y) => x.filter(v => y.includes(v));

const positions = [0,1,2,3,4];
const feedbacks = [5,6,7,8,9];
const possibleOrders = [];
const possibleFeedbackOrders = [];

for (let i = 0; i < 44444; i++) {
  let j = i.toString().padStart(5, "0").split("").map(Number);
  if (intersect(positions, j).length === positions.length) {
    possibleOrders.push(j);
  }
}

for (let i = 55555; i < 99999; i++) {
  let j = i.toString().padStart(5, "0").split("").map(Number);
  if (intersect(feedbacks, j).length === feedbacks.length) {
    possibleFeedbackOrders.push(j);
  }
}

function ans1() {
  const outputs = [];
  possibleOrders.forEach(pos => {
    outputs.push(
      answer(input, pos[0],
        answer(input, pos[1],
          answer(input, pos[2],
            answer(input, pos[3],
              answer(input, pos[4], 0),
            ),
          ),
        ),
      ),
    );
  });

  console.log(outputs.length);
  console.log(Math.max(...outputs));
}

ans1();
