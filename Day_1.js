let data
function readFile(input) {
    let file = input.files[0]; 
    let fileReader = new FileReader(); 
    fileReader.readAsText(file); 
    fileReader.onload = function() {
      data = fileReader.result;
    }; 
    fileReader.onerror = function() {
      alert(fileReader.error);
    }; 
  }
function printFileD1P1(){
    let lines = data.split(/\r?\n/);
    console.log(findNumbersD1P1(lines));
}

function findNumbersD1P1(input) {
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

