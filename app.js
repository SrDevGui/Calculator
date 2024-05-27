const previunsOperationsText = document.querySelector("#previus-operation")
const currentOperationText = document.querySelector("#current-operation")
const buttons = document.querySelectorAll("#buttons-containers button")

class Calculator {
    constructor(previunsOperationsText, currentOperationText) {
        this.previunsOperationsText = previunsOperationsText
        this.currentOperationText = currentOperationText
        this.currentOperation = "" //retorna o que o usuário está digitando no momento
    }
    addDigit(digit) {  //add digit do calculator screnn
        //check if current operation already gas a dott
        if (digit === "." && this.currentOperationText.innerText.includes(".")) {
            return;
        }
        this.currentOperation = digit
        this.updateScreen()
    }
    //process all calculator operations
    proccesOperation(operation) {
        //Check if current value is empy
        if (this.currentOperationText.innerText === "" && operation != "C") {
            // Change  operations
            if (this.previunsOperationsText.innerText != "") {
                this.changeOperations(operation)
            } return
        }
        //Get current and previous value
        let operationValue
        const previous = +this.previunsOperationsText.innerText.split(" ")[0]
        const current = +this.currentOperationText.innerText

        switch (operation) {
            case "+":
                operationValue = previous + current
                this.updateScreen(operationValue, operation, current, previous)
                break;
            case "-":
                operationValue = previous - current
                this.updateScreen(operationValue, operation, current, previous)
                break;
            case "/":
                operationValue = previous / current
                this.updateScreen(operationValue, operation, current, previous)
                break;
            case "*":
                operationValue = previous * current
                this.updateScreen(operationValue, operation, current, previous)
                break;
            case "DEL":
                this.processDellOperator()
                break;
            case "CE":
                this.processClearCurrentOperation()
                break;
            case "C":
                this.processCLearAll()
                break;
            case "=":
                this.proccesEqualsOperation()
                break;
            default:
                return;
        }

    }
    //Change values of the calculator screen
    updateScreen(
        operationValue = null,
        operation = null,
        current = null,
        previous = null
    ) {
        if (operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation
        } else {
            //Check if value is zero, if it is just add current value
            if (previous === 0) {
                operationValue = current
            }
            //add current value to previus
            this.previunsOperationsText.innerText = `${operationValue} ${operation}`
            this.currentOperationText.innerText = ""
        }
    }

    //Change math operation
    changeOperations(operation) {
        const mathOperations = ["*", "/", "+", "-"]
        if (!mathOperations.includes(operation)) {
            return
        }
        // 123 operation
        this.previunsOperationsText.innerText =
            this.previunsOperationsText.innerText.slice(0, -1) + operation
    }
    //delet the last digit
    processDellOperator() {
        this.currentOperationText.innerText =
            this.currentOperationText.innerText.slice(0, -1)
    }
    //Clear current operation
    processClearCurrentOperation() {
        this.currentOperationText.innerText = ""
    }
    //Clear all operations
    processCLearAll() {
        this.currentOperationText.innerText = ""
        this.previunsOperationsText.innerText = ""
    }
    //Process an operations
    proccesEqualsOperation() {
        const operation = previunsOperationsText.innerText.split(" ")[1]
        this.proccesOperation(operation)

    }

}

const calc = new Calculator(previunsOperationsText, currentOperationText);

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;
        if (+value >= 0 || value === ".") {
            calc.addDigit(value)
        } else {
            calc.proccesOperation(value)
        }
    })
})