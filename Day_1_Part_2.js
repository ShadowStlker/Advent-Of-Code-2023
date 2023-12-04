function printFileD1P2(){
    let lines = data.split(/\r?\n/);
    printToDom("D1P2", findNumbersD1P2(lines));
}
function D1P2reloadData() {
    reloadData("D1P2Data")
  }
const textNumber = ["one", "two", "three", "four", "five", "six", "seven", "eight", "nine"]
function findNumbersD1P2(input) {
    let sum = 0
    for (let i = 0; i < input.length; i++){
        let first = false
        let firstNum = null
        let lastNum = null
        for (let l = 0; l < input[i].length; l++) {
            if (!isNaN(input[i][l]) && !first) {
                firstNum = input[i][l];
                first = true;
            }
            else if (!isNaN(input[i][l]) && first) {
                lastNum = input[i][l];
            }
            else {
                let temp = textToNumber(Array.from(input[i].slice(l, input[i].length).toLowerCase() + " "))
                if (temp == null) {
                    continue
                }
                else if (!first) {
                    firstNum = temp;
                    first = true;
                }
                else {
                    lastNum = temp
                }
            }
        }
        if (lastNum == null) {
            number = firstNum.toString() + firstNum.toString();
        }
        else {
            number = firstNum.toString() + lastNum.toString();
        }
        sum += parseInt(number)
    }
    return sum;
}
function textToNumber(input) {
    for (let i = 0; i < textNumber.length; i++) {
        let compareString = ""
        for (let k = 0; k < input.length; k++) {
            if (compareString == textNumber[i]) {
                return i + 1
            }
            else if (compareString.length > 5) {
                continue
            }
            else {
                compareString += input[k];
            }
        }
    }
    return null
}