const screen = document.querySelector(".screen");
const clearBtn = document.querySelector(".clear-btn");
const equalBtn = document.querySelector(".equal-btn");
const numberBtns = document.querySelectorAll(".number-btn");
const operationBtns = document.querySelectorAll(".operation");
const decimalBtn = document.querySelector(".decimal-btn");
const deleteBtn = document.querySelector(".delete-btn");

let fontSize = 40;

screen.style.fontSize = `${fontSize}px`;

deleteBtn.addEventListener("click", () => {
    const firstNumberToDelete = screen.textContent == firstNumber;

    if (screen.textContent !== "0" && currOperation !== "" && secondNumber !== 0 || !operationPressed) {
        if (fontSize < 40) {
            fontSize += 2;
        }
        
        screen.style.fontSize = `${fontSize}px`;
        screen.textContent = screen.textContent.slice(0, screen.textContent.length - 1);
        if (screen.textContent === "") {
            screen.textContent = "0";
        }
        
        if (firstNumberToDelete) {
            firstNumber = Number(screen.textContent);
        } else {
            secondNumber = Number(screen.textContent);
        }
    }
})

decimalBtn.addEventListener("click", () => {
    if (!screen.textContent.includes(".")) {
        screen.textContent += ".";
    }
})

clearBtn.addEventListener("click", () => {
    firstNumber = 0;
    operator = "";
    secondNumber = 0;
    placeholder = 0;
    operationPressed = false;
    currOperation = "";
    screen.textContent = "0";
})

operationBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        operationPressed = true;
        
        if (currOperation != "") {
            placeholder = operate(currOperation, firstNumber, secondNumber);
            firstNumber = isNaN(placeholder) ? firstNumber : placeholder;
            screen.textContent = isNaN(placeholder) ? 0 : Math.floor(placeholder % 1) !== 0 ? placeholder.toFixed(8) : placeholder;
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
    screen.textContent = isNaN(placeholder) ? placeholder : Math.floor(placeholder % 1) !== 0 ? placeholder.toFixed(8) : placeholder;
    firstNumber = isNaN(placeholder) ? 0 : placeholder;

    if (isNaN(placeholder)) {
        placeholder = 0;
    }

    operationPressed = false;
    secondNumber = currOperation !== "*" ? 0 : 1;
})

const showOnScreen = (e) => {
    if (screen.textContent.length > 13 && fontSize > 10) {
        screen.style.fontSize = `${fontSize}px`;
        fontSize -= 2;
    }
    const value = e.target.textContent;

    if (!operationPressed) {
        if (screen.textContent == placeholder && !screen.textContent.includes(".") || isNaN(screen.textContent)) {
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
    } else {
        return num1 / num2;
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
        default:
            return firstNumber;
    }
}

document.addEventListener("keypress", (e) => {
    const numbers = {
        7: "seven",
        8: "eight",
        9: "nine",
        4: "four",
        5: "five",
        6: "six",
        1: "one",
        2: "two",
        3: "three",
        0: "zero"
    }
    
    const key = e.key;

    if (!isNaN(key)) {
        document.querySelector(`#${numbers[key]}`).click();
    }

    switch(key) {
        case "/":
            document.querySelector("#divide").click();
            break;
        case "*":
            document.querySelector("#multiply").click();
            break;
        case "-":
            document.querySelector("#subtract").click();
            break;
        case "+":
            document.querySelector("#add").click();
            break;
        case "Enter":
            equalBtn.click();
            break;
        case "c":
            clearBtn.click();
            break;
        case ".":
            decimalBtn.click();
            break;
        case "d":
            deleteBtn.click();
            break;
    }
})