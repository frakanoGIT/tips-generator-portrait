// Import statements remain the same
import { listKiss, listMega, listPussy, listXe } from "./gameData.js";

// Function to create a new fieldset box
function renderBox(labels, agentName) {
    const container = document.createElement('fieldset');
    container.innerHTML = `
        <legend class="legend${agentName}">${agentName}</legend>
        <div class="counter">
            <span id="c2">0</span>
            <span id="c1">0</span>
            <span id="c0">0</span>
        </div>
        <textarea class="inArea${agentName}"></textarea>
        <div class="btn-bottom">
            <input class="tipsGame${agentName}" type="number">
            <button class="reroll ${agentName}">Reroll</button>
        </div>
    `;

    // Append container to main element
    document.getElementById('main').appendChild(container);

    // Event listeners
    const textArea = container.querySelector(`.inArea${agentName}`);
    const inputElement = container.querySelector(`.tipsGame${agentName}`);
    const reRoll = container.querySelector(`.reroll.${agentName}`);
    const countDiv = container.querySelector('.counter');
    let counter = 0;

    reRoll.addEventListener('click', () => {
        const numInput = parseInt(inputElement.value);
        const numArray = [];

        if (numInput > labels.length || numInput <= 0) {
            textArea.value = `Please input value between 1 ~ ${labels.length}!`;
        } else {
            for (let n = numInput; n > 0;) {
                const numGen = Math.floor(Math.random() * labels.length);
                if (!numArray.includes(numGen)) {
                    numArray.push(numGen);
                    n--;
                }
            }
            textArea.value = numArray.map(el => labels[el]).join('\n');
            counter = 0;
            [...countDiv.children].forEach((span, index) => span.innerText = '0');
        }
    });

    textArea.addEventListener('copy', () => {
        if (textArea.value !== "") {
            counter++;
            countToDisplay();
        }
    });

    container.querySelector('legend').addEventListener('click', () => {
        textArea.select();
        textArea.setSelectionRange(0, 99999);
        document.execCommand("copy");
    });

    function countToDisplay() {
        const countStr = counter.toString().padStart(3, '0');
        [...countDiv.children].forEach((span, index) => span.innerText = countStr[index]);
    }
}

// Initialize rendering for each game platform
renderBox(listKiss(), '918KISS');
renderBox(listMega(), 'MEGA888');
renderBox(listPussy(), 'PUSSY888');
renderBox(listXe(), 'XE88');
