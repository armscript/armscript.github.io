import dataReplace from "./dataReplace.js";
const run = document.querySelector("#run");
const inputDash = document.querySelector("#textareaEditor");
const ouputDash = document.querySelector(".output");
function compile(inputCode) {
    let outputCode = inputCode;
    dataReplace.forEach(rule => {
        outputCode = replaceTopLevel(outputCode, rule[0], rule[1]);
    });
    try{
        eval(outputCode);
    }
    catch(e){
        ouputDash.innerHTML = `<div class="error">${e}</div>`;
    }
}

function replaceTopLevel(code, from, to) {
    let result = '';
    let depth = 0;
    let inString = false;
    let i = 0;

    while (i < code.length) {
        if (code[i] === '"' && (i === 0 || code[i - 1] !== '\\')) {
            inString = !inString;
        }

        if (!inString) {
            if (code.substr(i, from.length) === from && (i === 0 || /\s|\(|\)|;/.test(code[i - 1]))) {
                if (depth === 0) {
                    result += to;
                    i += from.length;
                    continue;
                }
            }

        }

        result += code[i];
        i++;
    }

    return result;
}
run.onclick = () => compile(inputDash.value);
