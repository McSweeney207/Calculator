const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const prevNumberTextElement = document.querySelector('[data-prev-number]') 
const currentNumberTextElement = document.querySelector('[data-current-number]') 

var one = ''
var two = ''
var sum = ''
var answer = ''
var done = false

function updateDisplay(topDisplay, bottomDisplay){
  
  document.getElementById("top").innerHTML = topDisplay
  document.getElementById("bottom").innerHTML = bottomDisplay
}

function calculate(){
  one = parseFloat(one)
  two = parseFloat(two)
  switch(sum) {
      case '+':
        answer = two + one
        break
      case '-':
        answer = two - one
        break
      case '*':
        answer = two * one
        break
      case '÷':
        answer = two / one
        break
    }
    var calculation = two + ' ' + sum + ' ' + one + ' ='
    updateDisplay(calculation, answer)
    equalsAgain = one
    one = answer
    done = true
    sumActive = false
}    

function allClear() {
  one = ''
  two = ''
  sum = ''
  answer = ''
  done = false
  updateDisplay('', '')
}

function chooseOperation() {
  if (sum === '') return
  if (sum !== '') {
  calculate()
  }
}
    
numberButtons.forEach(button => [
  button.addEventListener('click', () => {
  if (done == true) {
      allClear()
      done = false
    }  
    let entry = button.innerText
    one = one + entry
    updateDisplay(two + ' ' + sum, one) 
  })
])

operationButtons.forEach(button => [
  button.addEventListener('click', () => {
    if (one === '') {
      one = '0'  
    }
    chooseOperation()
    sum = button.innerText
    if (done == true) {
      two = answer
      done = false
    } else {
        two = one
      }
    updateDisplay(one + ' ' + sum, '')
    one = ''
  })
])

equalsButton.addEventListener('click', button => { 
    if (done == true) {
      two = answer
      one = equalsAgain
      done = false
      calculate()
    } else if (two === '') {
        return
    } else if (one === '') {
        one = two
        calculate()
    } else {
        calculate()
    }
    //calculate()
  }) 

allClearButton.addEventListener('click', button => {
  allClear()
})

deleteButton.addEventListener('click', button => {
  one = one.slice(0, -1)
  updateDisplay('',one)
})
