// pegar os elementos do dom
const previousOperationText = document.querySelector('#previous-operation')
const currentOperationText = document.querySelector('#current-operation')
const buttons = document.querySelectorAll('#buttons-container button')

class Calculator {
  constructor(previousOperationText, currentOperationText) {
    this.previousOperationText = previousOperationText
    this.currentOperationText = currentOperationText
    this.currentOperation = ''
  }

  //adicionando digito para a tela
  addDigit(digit) {
    console.log(digit)
    // Checar se o numero ja tem um ponto
    if (digit === '.' && this.currentOperationText.innerText.includes('.')) {
      return
    }

    this.currentOperation = digit
    this.updateScreen()
  }

  // Processar todas as operacoes
  processOperation(operation) {
    // checar de inicio se o valor estar vazio
    if (this.currentOperationText.innerText === '' && operation !== 'C') {
      // Mudar a operacao
      if (this.previousOperationText.innerText !== '') {
        this.changeOperation(operation)
      }
      return
    }

    // Pegar o valor atual e o anterior
    let operationValue
    let previous = +this.previousOperationText.innerText.split(' ')[0]
    let current = +this.currentOperationText.innerText

    switch (operation) {
      case '+':
        operationValue = previous + current
        this.updateScreen(operationValue, operation, current, previous)
        break
      case '-':
        operationValue = previous - current
        this.updateScreen(operationValue, operation, current, previous)
        break
      case '*':
        operationValue = previous * current
        this.updateScreen(operationValue, operation, current, previous)
        break
      case '/':
        operationValue = previous / current
        this.updateScreen(operationValue, operation, current, previous)
        break
      case 'DEL':
        this.processDelOperator()
        break
      case 'CE':
        this.processClearCurrentOperator()
        break
      case 'C':
        this.processClearOperator()
        break
      case '=':
        this.processEqualOperator()
        break
      default:
        return
    }
  }

  // Atualizar/mudar os valores na tela
  updateScreen(
    operationValue = null,
    operation = null,
    current = null,
    previous = null
  ) {
    if (operationValue === null) {
      // Append number to current value
      this.currentOperationText.innerText += this.currentOperation
    } else {
      // Checar se o value é zero, se for apenas adicionar o current value
      if (previous === 0) {
        operationValue = current
      }
      // Add current value para o previous
      this.previousOperationText.innerText = `${operationValue} ${operation}`
      this.currentOperationText.innerText = ''
    }
  }

  // Mudar a operacao usada
  changeOperation(operation) {
    const mathOperations = ['*', '-', '+', '/']

    if (!mathOperations.includes(operation)) {
      return
    }

    this.previousOperationText.innerText =
      this.previousOperationText.innerText.slice(0, -1) + operation
  }

  processEqualOperator() {}
  // Deleta um Digito
  processDelOperator() {
    this.currentOperationText.innerText =
      this.currentOperationText.innerText.slice(0, -1)
  }

  // Apagar o numero atual
  processClearCurrentOperator() {
    this.currentOperationText.innerText = ''
  }

  // Apagar tudo
  processClearOperator() {
    this.currentOperationText.innerText = ''
    this.previousOperationText.innerText = ''
  }

  // Funçao do igual;dar o resultado
  processEqualOperator() {
    let operation = this.previousOperationText.innerText.split(' ')[1]

    this.processOperation(operation)
  }
}

const calc = new Calculator(previousOperationText, currentOperationText)

buttons.forEach(btn => {
  btn.addEventListener('click', e => {
    const value = e.target.innerText
    let isNumber = false

    if (+value >= 0 || value === '.') {
      console.log(value)
      calc.addDigit(value)
      isNumber = true
    } else {
      calc.processOperation(value)
      isNumber = false
    }
    //console.log(isNumber)
  })
})
