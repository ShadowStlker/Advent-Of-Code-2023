function pushArrayItems2D(array2d) {
    let arrayItemList = [[]]
    for (let i = 0; i < array2d.length; i++) {
        if (i > 0) {
            arrayItemList.push([])
        }
        for (let k = 0; k < array2d[i].length; k ++) {
            if (k > 0) {
            }
            if (array2d[i][k] != ".") {
                arrayItemList[i][k] = new arryItem(array2d[i][k], k, i)
            }
            else {
                arrayItemList[i][k] = new arryItem("empty", k, i)
            }
        }
    }
    return arrayItemList
}

function checkValidGear(arrayItems) {
    let validGears = []
    let gearOneList = null
    let gearTwoList = null
    for (let i = 0; i < arrayItems.length; i++) {
        for (let k = 0; k < arrayItems.length; k++) {
            if (arrayItems[i][k].item == "*") {
                if (arrayItems[i][k - 1] != null && !isNaN(arrayItems[i][k - 1].item)) {
                    if (gearOneList == null) {
                        gearOneList = gearValidationPro(arrayItems, k - 1, i, null, null)
                    }
                    else {
                        gearTwoList = gearValidationPro(arrayItems, k - 1, i, gearOneList, gearTwoList)
                    }
                }
                if (arrayItems[i][k + 1] != null && !isNaN(arrayItems[i][k + 1].item)) {
                    if (gearOneList == null) {
                        gearOneList = gearValidationPro(arrayItems, k + 1, i, null, null)
                    }
                    else {
                        gearTwoList = gearValidationPro(arrayItems, k + 1, i, gearOneList, gearTwoList)
                    }
                }
                if (arrayItems[i -1][k] != null && !isNaN(arrayItems[i -1][k].item)) {
                    if (gearOneList == null) {
                        gearOneList = gearValidationPro(arrayItems, k, i - 1, null, null)
                    }
                    else {
                        gearTwoList = gearValidationPro(arrayItems, k, i - 1, gearOneList, gearTwoList)
                    }
                }
                if (arrayItems[i + 1][k] != null && !isNaN(arrayItems[i + 1][k].item)) {
                    if (gearOneList == null) {
                        gearOneList = gearValidationPro(arrayItems, k, i + 1, null, null)
                    }
                    else {
                        gearTwoList = gearValidationPro(arrayItems, k, i + 1, gearOneList, gearTwoList)
                    }
                }
                if (arrayItems[i - 1][k - 1] != null && !isNaN(arrayItems[i - 1][k - 1].item)) {
                    if (gearOneList == null) {
                        gearOneList = gearValidationPro(arrayItems, k - 1, i - 1, null, null)
                    }
                    else {
                        gearTwoList = gearValidationPro(arrayItems, k - 1, i - 1, gearOneList, gearTwoList)
                    }
                }
                if (arrayItems[i + 1][k - 1] != null && !isNaN(arrayItems[i + 1][k - 1].item)) {
                    if (gearOneList == null) {
                        gearOneList = gearValidationPro(arrayItems, k - 1, i + 1, null, null)
                    }
                    else {
                        gearTwoList = gearValidationPro(arrayItems, k - 1, i + 1, gearOneList, gearTwoList)
                    }
                }
                if (arrayItems[i - 1][k + 1] != null && !isNaN(arrayItems[i - 1][k + 1].item)) {
                    if (gearOneList == null) {
                        gearOneList = gearValidationPro(arrayItems, k + 1, i - 1, null, null)
                    }
                    else {
                        gearTwoList = gearValidationPro(arrayItems, k + 1, i - 1, gearOneList, gearTwoList)
                    }
                }
                if (arrayItems[i + 1][k + 1] != null && !isNaN(arrayItems[i + 1][k + 1].item)) {
                    if (gearOneList == null) {
                        gearOneList = gearValidationPro(arrayItems, k + 1, i + 1, null, null)
                    }
                    else {
                        gearTwoList = gearValidationPro(arrayItems, k + 1, i + 1, gearOneList, gearTwoList)
                    }
                }
                if (gearOneList != null && gearTwoList != null) {
                    let gearOneNumber = getGearNumber(gearOneList)
                    let gearTwoNumber = getGearNumber(gearTwoList)
                    validGears.push(gearOneNumber * gearTwoNumber);
    
                }
                gearOneList = null
                gearTwoList = null
            }
        }
    }
    return validGears;
}

function getGearNumber(array) {
    let number = ""
    for (let i = 0; i < array.length; i++) {
        number += array[i].item.toString()
    }
    return (parseInt(number))
}

function gearValidationPro(array2d, x, y, firstGear, secondGear) {
    if (firstGear == null) {
        firstGear = findEntireNumber(array2d, array2d[y][x].x, array2d[y][x].y, array2d[y][x])
        return firstGear
    }
    else {
        let trialGear = findEntireNumber(array2d, array2d[y][x].x, array2d[y][x].y, array2d[y][x])
        let sameGear = false
        for (let j = 0; j < firstGear.length; j++) {
            if (firstGear[j] != null && trialGear[j] != null && firstGear[j].x == trialGear[j].x && firstGear[j].y == trialGear[j].y) {
                sameGear = true
            }
        }
        if (sameGear) {
            return secondGear
        }
        else {
            secondGear = trialGear
            return secondGear
        }
    }
}

function findEntireNumber(array2d, x, y, item) {
    let numbersBefore = []
    let numbersAfter = []
    for (let i = x - 1; i >= 0; i--) {
        if (!isNaN(array2d[y][i].item)) {
            numbersBefore.push(array2d[y][i])
        }
        else {
            break;
        }
    }
    for (let i = x + 1; i < array2d[y].length; i++) {
        if (!isNaN(array2d[y][i].item)) {
            numbersAfter.push(array2d[y][i])
        }
        else {
            break;
        }
    }
    let numbersBeforeReversed = numbersBefore.reverse()
    let returnItems = numbersBeforeReversed.concat(item)
    return (returnItems.concat(numbersAfter))
}

function sumGears(array) {
    let total = 0
    for (let i = 0; i < array.length; i++) {
        total += array[i]
    }
    return total
}

function printFileD3P2() {
    let lines = data.split(/\r?\n/);
    let stepOne = setupData(lines);
    let stepTwo = pushArrayItems2D(stepOne);
    let stepThree = checkValidGear(stepTwo);
    console.log(sumGears(stepThree))
}