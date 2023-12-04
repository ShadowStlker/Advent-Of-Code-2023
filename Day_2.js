function printFileD2P1(){
    let lines = data.split(/\r?\n/);
    printToDom("D2P1", findNumbersD2P1(lines));
}

function D2P1reloadData() {
    reloadData("D2P1Data")
  }

class ball_game {
constructor (gameNumber, red, blue, green) {
    this.gameNumber = gameNumber
    this.red = red
    this.blue = blue
    this.green = green
}

}
function createData(input, listOfGames) {
    for (let i = 0; i < input.length; i++) {
    let game = input[i].split(":")
    let draw = game[1].split(";")
    listOfGames.push(new ball_game)
    listOfGames[i].gameNumber = i + 1
    listOfGames[i].red = []
    listOfGames[i].blue = []
    listOfGames[i].green = []
    for (let k = 0; k < draw.length; k ++) {
            let noSpaceDraw = draw[k].replace(/\s+/g, '')
            let r = null
            let b = null
            let g = null
            let number = ""
            for (let j = 0; j < noSpaceDraw.length; j++) {
                if (!isNaN(noSpaceDraw[j])) {
                    number += noSpaceDraw[j].toString()
                }
                else if(noSpaceDraw[j] == "r" && number != "") {
                    r = number
                    number = ""
                }
                else if(noSpaceDraw[j] == "b" && number != "") {
                    b = number
                    number = ""
                }
                else if(noSpaceDraw[j] == "g" && number != "") {
                    g = number
                    number = ""
                }
            }
            listOfGames[i].red.push(r ? parseInt(r) : 0)
            listOfGames[i].blue.push(b ? parseInt(b) : 0)
            listOfGames[i].green.push(g ? parseInt(g) : 0)
        }
    }
    return listOfGames
}
function checkValidGame(data, r, b, g) {
    let sum = 0
    for (let i = 0; i < data.length; i++) {
        let valid = true
        for (let k = 0; k < data[i].green.length; k++) {
            if (data[i].red[k] > r || data[i].blue[k] > b || data[i].green[k] > g) {
                valid = false
            }
        }
        if (valid) {
            sum += data[i].gameNumber
        }
    }
    return sum
}
function findNumbersD2P1(input) {
    let listOfGames = createData(input, [])
    return checkValidGame(listOfGames, 12, 14, 13)
}