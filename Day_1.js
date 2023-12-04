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
  function reloadData(tag) {
    let file = document.getElementById(tag).files[0]
    let fileReader = new FileReader(); 
    fileReader.readAsText(file); 
    fileReader.onload = function() {
      data = fileReader.result;
    }; 
    fileReader.onerror = function() {
      alert(fileReader.error);
    }; 
  }
  function D1P1reloadData() {
    reloadData("D1P1Data")
  }

function printToDom(id, message) {
    let win = window.document.getElementById(id)
    win.innerText = message
}

function printFileD1P1(){
    let lines = data.split(/\r?\n/);
    printToDom("D1P1", findNumbersD1P1(lines));
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

