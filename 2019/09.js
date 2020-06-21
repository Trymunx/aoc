"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
// const input = require("fs").readFileSync("09.txt", "utf8");
var example1 = "109,1,204,-1,1001,100,1,100,1008,100,16,101,1006,101,0,99";
var example2 = "1102,34915192,34915192,7,4,7,99,0";
var example3 = "104,1125899906842624,99";
var codes = {
    1: {
        code: 1,
        immediateWP: false,
        paramLength: 3
    },
    2: {
        code: 2,
        immediateWP: false,
        paramLength: 3
    },
    3: {
        code: 3,
        immediateWP: false,
        paramLength: 1
    },
    4: {
        code: 4,
        immediateWP: true,
        paramLength: 1
    },
    5: {
        code: 5,
        immediateWP: true,
        paramLength: 2
    },
    6: {
        code: 6,
        immediateWP: true,
        paramLength: 2
    },
    7: {
        code: 7,
        immediateWP: false,
        paramLength: 3
    },
    8: {
        code: 8,
        immediateWP: false,
        paramLength: 3
    },
    99: {
        code: 99,
        immediateWP: false,
        paramLength: 0
    }
};
function intcode(input, inputValue, debug) {
    if (debug === void 0) { debug = false; }
    var instructions = input.split(",").map(Number);
    var output;
    var ptr = 0;
    // let relativeBase = 0;
    if (debug) {
        console.log(__spreadArrays(instructions.slice(0, ptr), [
            "[" + instructions[ptr] + "]"
        ], instructions.slice(ptr + 1)).join(","));
    }
    while (ptr < instructions.length) {
        var fullOp = instructions[ptr];
        var op = void 0;
        var paramModeStr = void 0;
        if (Math.log10(fullOp) > 2) {
            op = codes[parseInt(fullOp.toString().slice(-2))];
            paramModeStr = fullOp
                .toString()
                .slice(0, -2)
                .padStart(op.immediateWP ? op.paramLength : op.paramLength - 1, "0");
            if (debug)
                console.log("  paramModes:", paramModeStr);
        }
        else {
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
        var parameters = instructions.slice(ptr + 1, ptr + op.paramLength + 1);
        var parsedParams = [];
        var writePointer = void 0;
        if (!op.immediateWP) {
            writePointer = parameters.pop();
        }
        while (parameters.length) {
            var parsed = paramModeStr && paramModeStr[parameters.length - 1] === "1"
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
                // if (!phaseSet) {
                //   // console.log(">> writing", phase, "to", writePointer);
                //   instructions[writePointer] = phase;
                //   phaseSet = true;
                // } else {
                //   // console.log(">> writing", inputSignal, "to", writePointer);
                instructions[writePointer] = inputValue;
                // }
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
                }
                else {
                    ptr += op.paramLength + 1;
                }
                break;
            case 6:
                if (parsedParams[0] === 0) {
                    // console.log(6, "jump");
                    ptr = writePointer;
                }
                else {
                    ptr += op.paramLength + 1;
                }
                break;
            case 7:
                if (parsedParams[0] < parsedParams[1]) {
                    instructions[writePointer] = 1;
                }
                else {
                    instructions[writePointer] = 0;
                }
                ptr += op.paramLength + 1;
                break;
            case 8:
                if (parsedParams[0] === parsedParams[1]) {
                    instructions[writePointer] = 1;
                }
                else {
                    instructions[writePointer] = 0;
                }
                ptr += op.paramLength + 1;
                break;
        }
        if (debug) {
            console.log(__spreadArrays(instructions.slice(0, ptr), [
                "[" + instructions[ptr] + "]"
            ], instructions.slice(ptr + 1)).join(","));
        }
    }
}
function part1(input) {
    var split = input.split(",").map(Number);
    intcode(input, 0);
    console.log(split);
}
part1(example1);
part1(example2);
part1(example3);
// part1(input);
