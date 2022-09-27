const {sin , cos , PI , tan , sqrt , log10:log , log:ln, exp, E} = Math;

// Dom elements
const btnsControl = document.querySelectorAll('.b-control');
const toggleSciBtn = document.querySelector('.up-bar .selection-item');
const numBtns = document.querySelectorAll('.num-btn');
const sciBtns = document.querySelectorAll('.adv-btn');
const input = document.getElementById('input');
const backBtn = document.getElementById('back-btn');
const equalBtn = document.getElementById('equal-btn');
const output = document.getElementById('output');
const toggleDarkBtn = document.getElementById('toggle-dark');
const copyBtn = document.getElementById('copy-result');

// Initial variables
let operators = ['-', '×', '+', '÷', '%'];
let symbols = {
    '-': '-',
    '×': '*',
    '+': '+',
    '÷': '/',
    '^': '**',
    'π': 'PI',
    e: 'E',
    '√(': 'sqrt('
}

// Btns functions object
const btnsFunctions = {
    insertSymbol,toggleScientific,getResult,back,copyResult,toggleDarkMode
}

// Add event click to all of the btns controls
btnsControl.forEach(btn => {
    btn.addEventListener('click', function() {
        btnsFunctions.insertSymbol(this.dataset.func);
    });
});
toggleSciBtn.addEventListener('click', btnsFunctions.toggleScientific);
backBtn.addEventListener('click', btnsFunctions.back);
equalBtn.addEventListener('click', btnsFunctions.getResult);
toggleDarkBtn.addEventListener('click', btnsFunctions.toggleDarkMode);
copyBtn.addEventListener('click', btnsFunctions.copyResult);

// Functions

// Insert Symbol function
function insertSymbol(symb) {
    let span = document.createElement('span');
    if(operators.includes(symb)) {
        span.innerText += ` ${symb} `;
    }else span.innerText += symb;
    input.appendChild(span);
}

// Toggle Scientific function
function toggleScientific() {
    let cond = this.classList.contains('active');
    cond ? this.classList.remove('active') : this.classList.add('active');
    numBtns.forEach(e => e.style.display = cond ? 'block': 'none');
    sciBtns.forEach(e => e.style.display = !cond ? 'block': 'none');
}

// Back Btn functionality
function back() {
    let inputElements = document.querySelectorAll('#input span');
    if(inputElements.length) {
        let last = inputElements[inputElements.length - 1];
        input.removeChild(last);
    }
}

// Get result function
function getResult() {
    let inputElements = [...document.querySelectorAll('#input span')];
    let inpVal = inputElements.map(e => {
       return symbols[e.innerText.trim()] || e.innerText;
    }).join('');
    try {
        // Don't make things more complicated just be simple
        output.innerText = eval(inpVal);
    }catch(e) {
        output.innerHTML = 'Error';
    }
}

// Toggle dark mode
function toggleDarkMode() {
    document.body.classList.toggle('dark-theme');
}

// Copy to clipboard
function copyResult() {
    let val = output.innerText;
    if(Number(val)) {
        this.innerText = 'check';
        setTimeout(() => this.innerText = 'content_copy' ,1000 )
        let inp = document.createElement('input');
        inp.value = val;
        document.body.appendChild(inp);
        inp.select();
        document.execCommand('copy');
        inp.remove();
    }
}