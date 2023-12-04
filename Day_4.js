class lotterCard {
    constructor(numbers, winningNumbers, copies) {
        this.numbers = numbers
        this.winningNumbers = winningNumbers
        this.copies = copies
    }
}

function dayFourData(data) {
    let splitColon = []
    let splitSpaces = []
    let removedEmpty = []
    let listOfLoto = []
    for (let i = 0; i < data.length; i++){
        let temp = data[i].split(":")
        splitColon.push(temp[1])
    }
    for (let i = 0; i < splitColon.length; i++) {
        let temp = splitColon[i].split(" ")
        splitSpaces.push(temp)
    }
    for (let i = 0; i < splitSpaces.length; i++) {
            removedEmpty.push([])
        for (let j = 0; j < splitSpaces[i].length; j++) {
            if (splitSpaces[i][j] != "") {
                removedEmpty[i][j] = splitSpaces[i][j]
            }
        }
    }
    for (let i = 0; i < removedEmpty.length; i++) {
        listOfLoto.push(new lotterCard([], [], 1))
        let numberSplit = false
        for (let j = 0; j < removedEmpty[i].length; j++) {
            if (removedEmpty[i][j] == "|") {
                numberSplit = true
            }
            else if (!numberSplit && removedEmpty[i][j] != null) {
                listOfLoto[i].numbers.push(removedEmpty[i][j])
            }
            else if (numberSplit && removedEmpty[i][j] != null) {
                listOfLoto[i].winningNumbers.push(removedEmpty[i][j])
            }
        }
    }
    return listOfLoto
}

function findWinningNumbers(card) {
    let matchesFound = 0
    for (let i = 0; i < card.numbers.length; i++) {
        for (let j = 0; j < card.winningNumbers.length; j++) {
            if (card.numbers[i] == card.winningNumbers[j]) {
                matchesFound += 1
            }
        }
    }
    return matchesFound
}

function loopOverCards(cards) {
    let totalPoints = 0
    for (let i = 0; i < cards.length; i++) {
        let points = findWinningNumbers(cards[i])
        if (points > 0) {
        totalPoints += Math.pow(2, points - 1)
        }
    }
    return totalPoints
}


function printFileD4P1() {
    let lines = data.split(/\r?\n/);
    let stepOne = dayFourData(lines);
    let stepTwo = loopOverCards(stepOne)
    console.log(stepTwo)
}