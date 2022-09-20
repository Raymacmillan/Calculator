const calculator = document.querySelector(".calculator");
const opDigits = document.querySelector(".operators_digits");
const display = document.querySelector(".inputArea");
const themebtn = document.querySelector(".on-off-btn");
let num1 = null;
let num2 = null;
let operator = null;


opDigits.addEventListener("click", ({ target }) => {
  if(target.tagName !== "BUTTON") return;

  if (target.classList.contains("backspace")) {
    backspace(target);
    return;
  }

  if (target.textContent === "C") {
    display.textContent = "";
    num1 = null;
    num2 = null;
    operator = null;
    return;
  }

  calculate(target);
});

themebtn.addEventListener("click", () => {
  themebtn.classList.toggle("on");
  if (themebtn.classList.contains("on")) {
    calculator.classList.remove("lightTheme");
  } else {
    calculator.classList.add("lightTheme");
  }
});

function backspace(target) {
  if (display.textContent !== 0) {
    const expr = display.textContent.split(" ").filter(e=>e);

    if(expr.length === 1){
      if(expr[0].length - 1 === 0){
        display.textContent = "";
        num1 = null;
        return;
      }

      const n = expr[0].substring(0, expr[0].length - 1)
      num1 = null;
      display.textContent = n;
      return;
    }

    if(expr.length === 2){
      operator = null;
      num1 = null;
      display.textContent = expr[0];
    }

    if(expr.length === 3){
      if(expr[2].length - 1 === 0) {
        display.textContent = expr[0] + " " + expr[1] + " ";
        return;
      }
      const c = expr[2].substring(0, expr[2].length - 1)
      display.textContent = expr[0] + " " + expr[1] + " " + c;
    }
  }
}

function calculate(target) {
  if (isOperator(target)) {
    if(operator === null){
      operator = target.textContent;
    }
    if (num1 === null) {
      num1 = parseFloat(display.textContent);
      
    }else if (num1 !== null && operator !== null && num2 === null) {

      num2 = parseFloat(display.textContent.replace(num1 + " " + operator + " ", ""));
    }
  }
  
  
  
  if (num1 !== null && num2 !== null && operator !== null) {
    let result = Math.round(operate(operator, num1, num2) * 10000000000) / 10000000000;
    num1 = result;
    num2 = null;
    operator = target.textContent;
    display.textContent = result;
    if(target.textContent === "=")
    {
      num1 = null;
      num2 = null;
      operator = null;
      return;
    }
  }

  if(num1 !== null && num2 === null && operator === "="){
    num1 = null;
    operator = null;
    return;
  }

  if(isDigit(target)){
    if(target.textContent === "·") return display.textContent += ".";

    display.textContent += target.textContent;
  }else {
    display.textContent += " " + target.textContent + " ";
  }


}

function isDigit(target) {
  if (
    target.tagName === "BUTTON" &&
    target.parentNode.classList.contains("digits") &&
    target.textContent !== "C" &&
    target.textContent !== "(" &&
    target.textContent !== ")" &&
    target.textContent !== ""
  ) {
    return true;
  }

  return false;
}

function isOperator(target) {
  if (
    target.tagName === "BUTTON" &&
    target.parentNode.classList.contains("operators")
  ) {
    return true;
  } else {
    return false;
  }
}

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  if (num2 != 0) {
    return num1 / num2;
  } else {
    throw new SyntaxError("syntax error");
  }
}

function operate(operate, num1, num2) {
  switch (operate) {
    case "+": {
      return add(num1, num2);
    }
    case "-": {
      return subtract(num1, num2);
    }
    case "*": {
      return multiply(num1, num2);
    }
    case "/": {
      return divide(num1, num2);
    }
  }
}
