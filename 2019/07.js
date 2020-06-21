"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
exports.__esModule = true;
var fs = require('fs');
;
var codes = {
    1: {
        code: 1,
        paramLength: 3,
        immediateWP: false
    },
    2: {
        code: 2,
        paramLength: 3,
        immediateWP: false
    },
    3: {
        code: 3,
        paramLength: 1,
        immediateWP: false
    },
    4: {
        code: 4,
        paramLength: 1,
        immediateWP: true
    },
    5: {
        code: 5,
        paramLength: 2,
        immediateWP: true
    },
    6: {
        code: 6,
        paramLength: 2,
        immediateWP: true
    },
    7: {
        code: 7,
        paramLength: 3,
        immediateWP: false
    },
    8: {
        code: 8,
        paramLength: 3,
        immediateWP: false
    },
    99: {
        code: 99,
        paramLength: 0,
        immediateWP: false
    }
};
function answer(input, phase, inputSignal, debug) {
    if (debug === void 0) { debug = false; }
    var instructions = input.split(",").map(Number);
    var phaseSet = false;
    var output;
    var ptr = 0;
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
            paramModeStr = fullOp.toString().slice(0, -2).padStart(op.immediateWP ? op.paramLength : op.paramLength - 1, "0");
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
        writePointer = writePointer === undefined ? parsedParams[parsedParams.length - 1] : writePointer;
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
                }
                else {
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
var input = require('fs').readFileSync('07.txt', 'utf8');
// const input = "3,26,1001,26,-4,26,3,27,1002,27,2,27,1,27,26,27,4,27,1001,28,-1,28,1005,28,6,99,0,0,5"; 
var f = function (x) { return x > 1 ? x * f(x - 1) : 1; };
var intersect = function (x, y) { return x.filter(function (v) { return y.includes(v); }); };
var positions = [0, 1, 2, 3, 4];
var feedbacks = [5, 6, 7, 8, 9];
var variations = f(positions.length);
var possibilities = [];
var feedbackPos = [];
for (var i = 0; i < 44444; i++) {
    var j = i.toString().padStart(5, "0").split("").map(Number);
    if (intersect(positions, j).length === positions.length) {
        possibilities.push(j);
    }
}
;
for (var i = 55555; i < 99999; i++) {
    var j = i.toString().padStart(5, "0").split("").map(Number);
    if (intersect(feedbacks, j).length === feedbacks.length) {
        feedbackPos.push(j);
    }
}
;
function ans1() {
    var outputs = [];
    possibilities.forEach(function (pos) {
        outputs.push(answer(input, pos[0], answer(input, pos[1], answer(input, pos[2], answer(input, pos[3], answer(input, pos[4], 0))))));
    });
    console.log(outputs.length);
    console.log(Math.max.apply(Math, outputs));
}
ans1();
