function printFileD7P1(){
    let lines = data.split(/\r?\n/);
    lines = fillHands(lines, null);
    lines.sort((a, b) => {
            if (a.handType > b.handType) {
                return 1
            }
            else if (a.handType < b.handType) {
                return -1
            }
            else if (a.handType == b.handType) {
                for (let i = 0; i < a.originalOrder.length; i++) {
                if (a.originalOrder[i] > b.originalOrder[i]) {
                    return 1
                }
                else if (a.originalOrder[i] < b.originalOrder[i])
                    return -1
                }  
            }
            else {
                console.log("Error")
                return 0
            }
        });
    let total = findTotalValue(lines)
    printToDom("D7P1", total);
}

function D7P1reloadData() {
    reloadData("D7P1Data")
}
function printFileD7P2(){
    let lines = data.split(/\r?\n/);
    lines = fillHands(lines, 11);
    lines.sort((a, b) => {
        if (a.handType > b.handType) {
            return 1
        }
        else if (a.handType < b.handType) {
            return -1
        }
        else if (a.handType == b.handType) {
            for (let i = 0; i < a.originalOrder.length; i++) {
            if (a.originalOrder[i] > b.originalOrder[i]) {
                return 1
            }
            else if (a.originalOrder[i] < b.originalOrder[i])
                return -1
            }  
        }
        else {
            console.log("Error")
            return 0
        }
    });
    let total = findTotalValue(lines)
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].originalOrder[0] == 0) {
            console.log(lines[i])
        }
    }
    printToDom("D7P2", total);
}

function D7P2reloadData() {
    reloadData("D7P2Data")
}
/* 
6 - Five of a kind, where all five cards have the same label: AAAAA
5 - Four of a kind, where four cards have the same label and one card has a different label: AA8AA
4 - Full house, where three cards have the same label, and the remaining two cards share a different label: 23332
3 - Three of a kind, where three cards have the same label, and the remaining two cards are each different from any other card in the hand: TTT98
2 - Two pair, where two cards share one label, two other cards share a second label, and the remaining card has a third label: 23432
1 - One pair, where two cards share one label, and the other three cards have a different label from the pair and each other: A23A4
0 - High card, where all cards' labels are distinct: 23456
*/
class Hand {
    constructor(cards, originalOrder, value, handType, hasWild) {
        this.originalOrder = originalOrder
        this.card = cards
        this.value= value
        this.handType = handType
        this.hasWild = hasWild
    }

    findHandType (wild) {
        this.card.sort((a, b) => { 
            if (a < b) {
                return 1
            }
            else if (a > b) {
                return -1
            }
            else {
                return 0
            }
        })
        let match = 0
        let matches = []
        let numberOfWhilds = 0
        let containsWild = false
        for (let i = 0; i < this.card.length; i++) {
            if(this.card[i] == wild) {
                numberOfWhilds += 1
                containsWild = true
            }
        }
        let lastCard = this.card[0]
        for (let i = 1; i < this.card.length; i++) {
            if (containsWild && numberOfWhilds == 5) {
                match += numberOfWhilds - 1
                containsWild = false
                this.hasWild = numberOfWhilds
            }
            else if (containsWild && numberOfWhilds == 4) {
                match += numberOfWhilds
                containsWild = false
                this.hasWild = numberOfWhilds
            }
            if ((this.card[i] == lastCard && this.card[i] != wild && lastCard != wild) || (containsWild && this.card[i] != wild && lastCard != wild)) {
                if (containsWild) {
                    match += numberOfWhilds
                    containsWild = false
                    this.hasWild = numberOfWhilds
                }
                if (this.card[i] == lastCard && this.card[i] != wild) {
                    match += 1
                }
            }
            if(match > 0 && this.card[i] != lastCard) {
                matches.push(match)
                match = 0
            }
            else if (match > 0 && i == this.card.length - 1) {
                matches.push(match)
                match = 0
            }
            else if (match == 0 && i == this.card.length - 1 && matches.length < 1) {
                matches.push(0)
                match = 0
            }
            if (this.card[i] != wild) {
                lastCard = this.card[i]
            }
        }
        this.handType = matches
        if (this.handType.length > 1) {
            if (this.handType[0] > 1 || this.handType[1] > 1) {
                if ((this.handType[1] == 2 && this.hasWild > 0) || (this.handType[0] == 2 && this.hasWild > 1)) {
                    this.handType = 5
                }
                else {
                    this.handType = 4
                }
            }
            else {
                if (this.hasWild > 0) {
                    this.handType = 3
                }
                else {
                    this.handType = 2
                }
            }
        }
        else {
            switch (this.handType[0]) {
                case 0:
                    this.handType = 0
                    break;
                case 1:
                    this.handType = 1
                    break;
                case 2:
                    this.handType = 3
                    break;
                case 3:
                    this.handType = 5
                    break;
                case 4:
                    this.handType = 6
                    break;
            }
        }
    }
}

function fillHands(data, wild) {
    let hands = []
    for (let i = 0; i < data.length; i++) {
        let hand = new Hand([], [], "", [0], 0)
        let lines = data[i].split(" ")
        for (let k = 0; k < lines[0].length; k++) {
            switch (lines[0][k]) {
                case "A":
                    wild == 14 ? hand.originalOrder.push(0) : hand.originalOrder.push(14)
                    hand.card.push(14)
                    continue;
                case "K":
                    wild == 13 ? hand.originalOrder.push(0) : hand.originalOrder.push(13)
                    hand.card.push(13)
                    continue;
                case "Q":
                    wild == 12 ? hand.originalOrder.push(0) : hand.originalOrder.push(12)
                    hand.card.push(12)
                    continue;
                case "J":
                    wild == 11 ? hand.originalOrder.push(0) : hand.originalOrder.push(11)
                    hand.card.push(11)
                    continue;
                case "T":
                    wild == 10 ? hand.originalOrder.push(0) : hand.originalOrder.push(10)
                    hand.card.push(10)
                    continue;
                case "9":
                    wild == 9 ? hand.originalOrder.push(0) : hand.originalOrder.push(9)
                    hand.card.push(9)
                    continue;
                case "8":
                    wild == 8 ? hand.originalOrder.push(0) : hand.originalOrder.push(8)
                    hand.card.push(8)
                    continue;
                case "7":
                    wild == 7 ? hand.originalOrder.push(0) : hand.originalOrder.push(7)
                    hand.card.push(7)
                    continue;
                case "6":
                    wild == 6 ? hand.originalOrder.push(0) : hand.originalOrder.push(6)
                    hand.card.push(6)
                    continue;
                case "5":
                    wild == 5 ? hand.originalOrder.push(0) : hand.originalOrder.push(5)
                    hand.card.push(5)
                    continue;
                case "4":
                    wild == 4 ? hand.originalOrder.push(0) : hand.originalOrder.push(4)
                    hand.card.push(4)
                    continue;
                case "3":
                    wild == 3 ? hand.originalOrder.push(0) : hand.originalOrder.push(3)
                    hand.card.push(3)
                    continue;
                case "2":
                    wild == 2 ? hand.originalOrder.push(0) : hand.originalOrder.push(2)
                    hand.card.push(2)
                    continue;
            }
        }
        hand.value = parseInt(lines[1])
        hand.findHandType(wild)
        hands.push(hand)

    }
    return hands
}

function findTotalValue(cards) {
    let total = 0
    for (let i = 0; i < cards.length; i++) {
        total += cards[i].value * (i + 1)
    }
    return total
}