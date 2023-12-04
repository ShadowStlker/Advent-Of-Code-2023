function loopOverCardsPartTwo(cards) {
    for (let i = 0; i < cards.length; i++) {
        let points = findWinningNumbers(cards[i])
        if (points > 0) {
            for (let k = 0; k < points; k++) {
                cards[k + i + 1].copies += 1 * cards[i].copies
            } 
        }
    }
    return cards
}
function countNumberOfCards(cards) {
    let total = 0
    for (let i = 0; i < cards.length; i++) {
        total += cards[i].copies
    }
    return total
}

function printFileD4P2() {
    let lines = data.split(/\r?\n/);
    let stepOne = dayFourData(lines);
    let stepTwo = loopOverCardsPartTwo(stepOne)
    console.log(countNumberOfCards(stepTwo))
}