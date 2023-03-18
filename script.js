//HTML Query Selectors.
const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const prevNumberTextElement = document.querySelector('[data-prev-number]');
const currentNumberTextElement = document.querySelector('[data-current-number]'); 

//Global Varibles.
let one = ''; //Stores the first operand.
let two = ''; //Stores the second operand.
let sum = ''; //Stores the operation symbol.
let answer = ''; //Stores the result of the calculation.
let done = false; //This used tis variable to check if a calculation has been done.


//Updates Display with current numbers.
function updateDisplay(topDisplay, bottomDisplay){
  document.getElementById("top").textContent = topDisplay;
  document.getElementById("bottom").textContent = bottomDisplay;
};

//Calculates the result of the expression stored in two and one using the operation stored in sum.
function calculate(){
  one = parseFloat(one);
  two = parseFloat(two);
  switch(sum) {
      case '+':
        answer = two + one;
        break;
      case '-':
        answer = two - one;
        break;
      case '*':
        answer = two * one;
        break;
      case '÷':
        answer = two / one;
        break;
    };
    //Stores the calculation expression as a string in the calculation variable.
    var calculation = two + ' ' + sum + ' ' + one + ' =';
    updateDisplay(calculation, answer);  //Calls the updateDisplay function and passes in calculation and answer.
    equalsAgain = one;
    one = answer;
    done = true;
    sumActive = false;
};

//Sets all global variables to their default values.
function allClear() {
  one = '';
  two = '';
  sum = '';
  answer = '';
  done = false;
  updateDisplay('', '');
};

//Calls the calculate function if the sum variable is not an empty string
function chooseOperation() {
  if (sum === '') {
    return;
  } else if (done === true){
    two = one;
    one = '';
    updateDisplay(two + ' ' + sum, one)
  } else {
  calculate();
  };
};

//Adds an event listener to each number button element and sets the value of one when a number is clicked.
numberButtons.forEach(button => [
  button.addEventListener('click', () => {
  if (done == true) {     //If done is true, allClear function is called to reset all variables
      allClear();
      done = false;
    }; 
    let entry = button.innerText;
    one = one + entry;
    updateDisplay(two + ' ' + sum, one); 
  })
]);


//This loop adds an event listener to each operation button element and sets the value of sum when
operationButtons.forEach(button => [
  //Adds click event listener to each operation button.
  button.addEventListener('click', () => {
    // If one is empty, set it to 0
    if (one === '') {
      one = '0' ; 
    };
    // If a previous operation exists, perform calculation.
    chooseOperation();
    // Set the operation to the current button's inner text.
    sum = button.innerText;
    //If a previous calculation has been done, use the result as two.
    //otherwise, use one as two.
    if (done == true) {
      two = answer;
      done = false;
    } else {
        two = one;
      }
    //Update display with the operation and clear one
    updateDisplay(one + ' ' + sum, '');
    one = '';
  })
]);

// event listener for the "equals" button
equalsButton.addEventListener('click', button => { 
  // check if the calculation is already done
  if (done == true) {
    // if so, set the second value to the answer and set the first value to the previous second value
    two = answer;
    one = equalsAgain;
    // reset the flag for done calculation
    done = false;
    // perform the calculation
    calculate();
  } else if (two === '') {
      // if second value is not entered, do nothing
      return;
  } else if (one === '') {
      // if first value is not entered, set the first value to the second value
      one = two;
      // perform the calculation
      calculate();
  } else {
      // if both values are entered, perform the calculation
      calculate();
  };
}); 

// event listener for the "all clear" button
allClearButton.addEventListener('click', button => {
// call the function to clear all values and reset the display
allClear();
});

// event listener for the "delete" button
deleteButton.addEventListener('click', button => {
// remove the last character from the first value string
one = one.slice(0, -1);
// update the display with the new first value
updateDisplay('',one);
});
