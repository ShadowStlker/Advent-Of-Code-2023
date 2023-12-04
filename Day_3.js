function D3P1reloadData() {
    reloadData("D3P1Data")
  }

class arryItem {
    constructor(item, x, y) {
        this.item = item
        this.x = x
        this. y = y
        this.valid = false
    }
}

function setupData(data) {
    let array2d = []
    for (let i = 0; i < data.length; i++) {
        array2d.push(Array.from(data[i]));
    }
    return array2d
}

function pushArrayItems(array2d) {
    let arrayItemList = []
    for (let i = 0; i < array2d.length; i++) {
        for (let k = 0; k < array2d[i].length; k ++) {
            if (array2d[i][k] != ".") {
                arrayItemList.push(new arryItem(array2d[i][k], k, i))
            }
            else {
                arrayItemList.push(new arryItem("empty", k, i))
            }
        }
    }
    return arrayItemList
}

function checkValid(arrayItems, array2d) {
    arrayItems.forEach(element => {
        if (isNaN(element.item) && element.item != "empty") {
            if (element.x - 1 > 0 && array2d[element.y][element.x - 1] != ".") {
                arrayItems.forEach(item => {
                    if (item.x == element.x - 1 && item.y == element.y) {
                        item.valid = true
                    }
                })
            }
            if (element.y - 1 >= 0 && array2d[element.y - 1][element.x] != ".") {
                arrayItems.forEach(item => {
                    if (item.x == element.x && item.y == element.y - 1) {
                        item.valid = true
                    }
                })
            }
            if (element.x + 1 < array2d[0].length && array2d[element.y][element.x + 1] != ".") {
                arrayItems.forEach(item => {
                    if (item.x == element.x + 1 && item.y == element.y) {
                        item.valid = true
                    }
                })
            }
            if (element.y + 1 < array2d.length && array2d[element.y + 1][element.x] != ".") {
                arrayItems.forEach(item => {
                    if (item.x == element.x && item.y == element.y + 1) {
                        item.valid = true
                    }
                })
            }
            if (element.x - 1 >= 0 && element.y - 1 >= 0 && array2d[element.y - 1][element.x - 1] != ".") {
                arrayItems.forEach(item => {
                    if (item.x == element.x - 1 && item.y == element.y - 1) {
                        item.valid = true
                    }
                })
            }
            if (element.x - 1 >= 0 && element.y + 1 < array2d.length && array2d[element.y + 1][element.x - 1] != ".") {
                arrayItems.forEach(item => {
                    if (item.x == element.x - 1 && item.y == element.y + 1) {
                        item.valid = true
                    }
                })
            }
            if (element.y - 1 >= 0 && element.x + 1 < array2d[0].length && array2d[element.y - 1][element.x + 1] != ".") {
                arrayItems.forEach(item => {
                    if (item.x == element.x + 1 && item.y == element.y - 1) {
                        item.valid = true
                    }
                })
            }
            if (element.x + 1 < array2d[0].length && element.y + 1 < array2d.length && array2d[element.y + 1][element.x + 1] != ".") {
                arrayItems.forEach(item => {
                    if (item.x == element.x + 1 && item.y == element.y + 1) {
                        item.valid = true
                    }
                })
            }
        }
    });
    return arrayItems;
}

function sumItems(array) {
    let total = 0
    let newNumber = ""
    let valid = false
    for (let i = 0; i < array.length; i++) {
        if (!isNaN(array[i].item)) {
            newNumber += array[i].item.toString();
            if (array[i].valid == true) {
                valid = true
            }
        }
        else if (isNaN(array[i].item)) {
            if (valid) {
                total += parseInt(newNumber)
            }
            valid = false
            newNumber = ""
        }
        else {
            continue;
        }
    }
    return total;
}

function printFileD3P1() {
    let lines = data.split(/\r?\n/);
    let stepOne = setupData(lines);
    let stepTwo = pushArrayItems(stepOne);
    let stepThree = checkValid(stepTwo, stepOne)
    let stepFour = sumItems(stepThree);
    printToDom("D3P1", stepFour);
}