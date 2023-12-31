const screen = document.querySelector(".screen");
const clearBtn = document.querySelector(".clear-btn");
const equalBtn = document.querySelector(".equal-btn");
const numberBtns = document.querySelectorAll(".number-btn");
const operationBtns = document.querySelectorAll(".operation");

clearBtn.addEventListener("click", () => {
    firstNumber = 0;
    operator = "";
    secondNumber = 0;
    placeholder = 0;
    operationPressed = false;
    currOperation = "";
    screen.textContent = "";
})

operationBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        operationPressed = true;
        
        if (currOperation != "") {
            placeholder = operate(currOperation, firstNumber, secondNumber);
            firstNumber = isNaN(placeholder) ? firstNumber : placeholder;
            screen.textContent = isNaN(placeholder) ? 0 : placeholder % 1 !== 0 ? placeholder.toFixed(8) : placeholder;
            if (isNaN(placeholder)) {
                placeholder = 0;
            }
        }

        switch(btn.textContent) {
            case "/":
                currOperation = "/";
                secondNumber = 0;
                break;
            case "X":
                currOperation = "*";
                secondNumber = 0;
                break;
            case "-":
                currOperation = "-";
                secondNumber = 0;
                break;
            case "+":
                currOperation = "+";
                secondNumber = 0;
                break;
        }
    })
})

equalBtn.addEventListener("click", () => {
    if (secondNumber === null) {
        secondNumber = firstNumber;
    }
    placeholder = operate(currOperation, firstNumber, secondNumber);
    screen.textContent = isNaN(placeholder) ? placeholder : placeholder % 1 !== 0 ? placeholder.toFixed(8) : placeholder;
    firstNumber = isNaN(placeholder) ? 0 : placeholder;
    if (isNaN(placeholder)) {
        placeholder = 0;
    }
    operationPressed = false;
    secondNumber = currOperation !== "*" ? 0 : 1;
})

const showOnScreen = (e) => {
    const value = e.target.textContent;

    if (!operationPressed) {
        if (screen.textContent == placeholder || isNaN(screen.textContent)) {
            screen.textContent = "";
            firstNumber = 0;
        }

        screen.textContent += value;
        firstNumber = Number(screen.textContent);
    } else {
        if (placeholder !== 0) {
            firstNumber = placeholder;
        };

        if (screen.textContent == firstNumber) {
            screen.textContent = "";
        }

        if (screen.textContent === "0") {
            screen.textContent = value;
        } else {
            screen.textContent += value;
        }

        secondNumber = Number(screen.textContent);
    }
    
}

numberBtns.forEach(button => {
    button.addEventListener("click", (e) => showOnScreen(e));
})

let firstNumber = 0;
let operator = "";
let secondNumber = null;
let placeholder = 0;
let operationPressed = false;
let currOperation = "";

const add = (num1, num2) => num1 + num2;

const subtract = (num1, num2) => num1 - num2;

const multiply = (num1, num2) => num1 * num2;

const divide = (num1, num2) => {
    if (num2 === 0) {
        return "Not a number";
    }
};

const operate = (operator, firstNumber, secondNumber) => {
    switch(operator) {
        case "+":
            return add(firstNumber, secondNumber);
        case "-":
            return subtract(firstNumber, secondNumber);
        case "*":
            return multiply(firstNumber, secondNumber);
        case "/":
            return divide(firstNumber, secondNumber);
    }
}

const allbuttons = document.querySelectorAll("button");
const h1 = document.querySelector("h1")
allbuttons.forEach(button => {
    button.addEventListener("click", () => {
        h1.textContent = `firstNumber: ${firstNumber} | operator: ${operator} | secondNumber: ${secondNumber} | placeholder: ${placeholder} | operation pressed?: ${operationPressed} | currOperation: ${currOperation}`
    })
})