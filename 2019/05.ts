export {} // Module thing

const example1 = "1,9,10,3,2,3,11,0,99,30,40,50";
const example2 = "3,21,1008,21,8,20,1005,20,22,107,8,21,20,1006,20,31,1106,0,36,98,0,0,1002,21,125,20,4,20,1105,1,46,104,999,1105,1,46,1101,1000,1,20,4,20,1105,1,46,98,99";

const example3 = "3,9,8,9,10,9,4,9,99,-1,8";
const example4 = "3,9,7,9,10,9,4,9,99,-1,8";
const example5 = "3,3,1108,-1,8,3,4,3,99";
const example6 = "3,3,1107,-1,8,3,4,3,99";

const isNonZero1 = "3,12,6,12,15,1,13,14,13,4,13,99,-1,0,1,9";
const isNonZero2 = "3,3,1105,-1,9,1101,0,0,12,4,12,99,1";
// const input = "1,0,0,3,1,1,2,3,1,3,4,3,1,5,0,3,2,1,10,19,1,19,6,23,2,23,13,27,1,27,5,31,2,31,10,35,1,9,35,39,1,39,9,43,2,9,43,47,1,5,47,51,2,13,51,55,1,55,9,59,2,6,59,63,1,63,5,67,1,10,67,71,1,71,10,75,2,75,13,79,2,79,13,83,1,5,83,87,1,87,6,91,2,91,13,95,1,5,95,99,1,99,2,103,1,103,6,0,99,2,14,0,0";
const input = "3,225,1,225,6,6,1100,1,238,225,104,0,1102,59,58,224,1001,224,-3422,224,4,224,102,8,223,223,101,3,224,224,1,224,223,223,1101,59,30,225,1101,53,84,224,101,-137,224,224,4,224,1002,223,8,223,101,3,224,224,1,223,224,223,1102,42,83,225,2,140,88,224,1001,224,-4891,224,4,224,1002,223,8,223,1001,224,5,224,1,223,224,223,1101,61,67,225,101,46,62,224,1001,224,-129,224,4,224,1002,223,8,223,101,5,224,224,1,223,224,223,1102,53,40,225,1001,35,35,224,1001,224,-94,224,4,224,102,8,223,223,101,6,224,224,1,223,224,223,1101,5,73,225,1002,191,52,224,1001,224,-1872,224,4,224,1002,223,8,223,1001,224,5,224,1,223,224,223,102,82,195,224,101,-738,224,224,4,224,1002,223,8,223,1001,224,2,224,1,224,223,223,1101,83,52,225,1101,36,77,225,1101,9,10,225,1,113,187,224,1001,224,-136,224,4,224,1002,223,8,223,101,2,224,224,1,224,223,223,4,223,99,0,0,0,677,0,0,0,0,0,0,0,0,0,0,0,1105,0,99999,1105,227,247,1105,1,99999,1005,227,99999,1005,0,256,1105,1,99999,1106,227,99999,1106,0,265,1105,1,99999,1006,0,99999,1006,227,274,1105,1,99999,1105,1,280,1105,1,99999,1,225,225,225,1101,294,0,0,105,1,0,1105,1,99999,1106,0,300,1105,1,99999,1,225,225,225,1101,314,0,0,106,0,0,1105,1,99999,1007,226,226,224,1002,223,2,223,1006,224,329,1001,223,1,223,1108,226,226,224,102,2,223,223,1006,224,344,101,1,223,223,1007,677,677,224,102,2,223,223,1006,224,359,101,1,223,223,1108,677,226,224,1002,223,2,223,1005,224,374,1001,223,1,223,7,677,226,224,102,2,223,223,1005,224,389,1001,223,1,223,1008,677,677,224,1002,223,2,223,1005,224,404,101,1,223,223,108,226,226,224,1002,223,2,223,1006,224,419,101,1,223,223,1008,226,677,224,1002,223,2,223,1006,224,434,1001,223,1,223,1107,677,226,224,1002,223,2,223,1005,224,449,101,1,223,223,1008,226,226,224,102,2,223,223,1005,224,464,1001,223,1,223,8,226,226,224,1002,223,2,223,1006,224,479,1001,223,1,223,107,226,677,224,102,2,223,223,1005,224,494,1001,223,1,223,7,226,226,224,102,2,223,223,1005,224,509,1001,223,1,223,107,226,226,224,102,2,223,223,1005,224,524,101,1,223,223,107,677,677,224,1002,223,2,223,1006,224,539,101,1,223,223,8,677,226,224,1002,223,2,223,1006,224,554,101,1,223,223,1107,677,677,224,1002,223,2,223,1005,224,569,101,1,223,223,108,226,677,224,1002,223,2,223,1006,224,584,101,1,223,223,7,226,677,224,1002,223,2,223,1005,224,599,1001,223,1,223,8,226,677,224,102,2,223,223,1006,224,614,1001,223,1,223,108,677,677,224,1002,223,2,223,1006,224,629,1001,223,1,223,1007,226,677,224,1002,223,2,223,1006,224,644,101,1,223,223,1108,226,677,224,102,2,223,223,1005,224,659,1001,223,1,223,1107,226,677,224,102,2,223,223,1006,224,674,1001,223,1,223,4,223,99,226";

const addrHelper = (arr: number[]) => (address: number) => arr[arr[address]];

type OpCode = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 99;

interface Instruction {
  code: OpCode;
  paramLength: 0 | 1 | 2 | 3;
  immediateWP: boolean;
};

const codes: {
  [code: number]: Instruction
} = {
  1: {
    code: 1,
    paramLength: 3,
    immediateWP: false,
  },
  2: {
    code: 2,
    paramLength: 3,
    immediateWP: false,
  },
  3: {
    code: 3,
    paramLength: 1,
    immediateWP: false,
  },
  4: {
    code: 4,
    paramLength: 1,
    immediateWP: false,
  },
  5: {
    code: 5,
    paramLength: 2,
    immediateWP: true,
  },
  6: {
    code: 6,
    paramLength: 2,
    immediateWP: true,
  },
  7: {
    code: 7,
    paramLength: 3,
    immediateWP: false,
  },
  8: {
    code: 8,
    paramLength: 3,
    immediateWP: false,
  },
  99: {
    code: 99,
    paramLength: 0,
    immediateWP: false,
  },
};

function answer(input: string, val: number) {
  const instructions: number[] = input.split(",").map(Number);
  const addr = addrHelper(instructions);

  let ptr = 0;
  while (ptr < instructions.length) {
    const fullOp = instructions[ptr];
    let op: Instruction;
    let paramModeStr: string;

    if (Math.log10(fullOp) > 2) {
      op = codes[parseInt(fullOp.toString().slice(-2))];
      paramModeStr = fullOp.toString().slice(0, -2).padStart(op.paramLength, "0");
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
      return;
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
        : instructions[parameters.shift()]
      parsedParams.push(parsed);
    }

    writePointer = writePointer === undefined ? parsedParams[parsedParams.length - 1] : writePointer;

    console.log(parsedParams);

    console.log("op", op.code, "params", parsedParams.slice(0, -1), "writing to", writePointer);

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
        console.log("   writing", val, "to", writePointer);
        instructions[writePointer] = val;
        ptr += op.paramLength + 1;
        break;
      case 4:
        console.log(instructions[writePointer]);
        ptr += op.paramLength + 1;
        break;
      case 5:
        if (parsedParams[0] === 1) {
          // console.log("  jump: set ptr to", writePointer, instructions[writePointer]);
          console.log(5, "jump");
          ptr = writePointer;
        } else {
          ptr += op.paramLength + 1;
        }
        break;
      case 6:
        if (parsedParams[0] === 0) {
          console.log(6, "jump");
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
        if (parsedParams[0] > parsedParams[1]) {
          instructions[writePointer] = 0;
        } else {
          instructions[writePointer] = 1;
        }
        ptr += op.paramLength + 1;
        break;
    }

    // console.log([...instructions.slice(0, ptr), `[${instructions[ptr]}]`, ...instructions.slice(ptr + 1)].join(","))
  }
}

// console.log(answer(example1));
console.log(answer(input, 1));
// answer(example2);
// answer(example6, 10);
// answer(isNonZero1, 1);
// answer(isNonZero2, 0);
