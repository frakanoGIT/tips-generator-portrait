// IMPORT FUNCTION
import { listKiss, listMega, listPussy, listXe } from "./gameData.js";

// TIPS-GENERATOR ------------------------------------------------------
const kiss = listKiss();
const mega = listMega();
const pussy = listPussy();
const xe = listXe();

// Create box for every agent games
renderBox(kiss, '918KISS');
renderBox(mega, 'MEGA888');
renderBox(pussy, 'PUSSY888');
renderBox(xe, 'XE88');

// function will create a new fieldset box
function renderBox(labels, agentName) {
    const container = document.createElement('fieldset');
    // Create legend element
    let legend = document.createElement('legend');
    legend.setAttribute('class', `legend${agentName}`);
    legend.innerText = `${agentName}`;
    container.appendChild(legend);
    // Create textarea element
    let textArea = document.createElement('textarea');
    textArea.setAttribute('class',`inArea${agentName}`);
    textArea.value = "";
    container.appendChild(textArea);
    // Create div element
    let divBtn = document.createElement('div');
    divBtn.setAttribute('class', 'btn-bottom');
    // Create input element for inside div class btn-bottom
    let inputElement = document.createElement('input');
    inputElement.setAttribute('class', `tipsGame${agentName}`);
    inputElement.setAttribute('type', 'number');
    divBtn.appendChild(inputElement);
    // Create button element for re-rolling
    let reRoll = document.createElement('button');
    reRoll.setAttribute('class', `reroll ${agentName}`);
    reRoll.innerHTML = 'Reroll';
    divBtn.appendChild(reRoll);
    container.appendChild(divBtn);
    // Add renderBox to HTML class container
    document.getElementById('main').appendChild(container);

    //
    reRoll.addEventListener('click', function() {
        let numInput = inputElement.value;
        let numArray = [];
        let tipsRolled = '';
        // Remove Duplicates and prevent crash
        if (numInput > labels.length || numInput < 0) {
            textArea.value = "Please input value between 1 \~ " + labels.length + "!";
        } else {
            for (let n = numInput; n > 0;) {
                let numGen = Math.floor(Math.random() * labels.length);
                if (!numArray.includes(numGen)) {
                    numArray.push(numGen);
                    n--;
                }
            }
            numArray.forEach(el => tipsRolled+= `${labels[el]}\n`);
            textArea.value = tipsRolled;
        };
    });
    legend.addEventListener('click', function() {
        textArea.select();
        textArea.setSelectionRange(0, 99999);
        document.execCommand("copy");
    });
}

export {renderBox};
