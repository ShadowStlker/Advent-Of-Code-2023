function printFileD6P1(){
    let lines = data.split(/\r?\n/);
    lines = splitDataBySpace(lines);
    lines = fillBoatRaces(lines);
    let wins = lines.waysToWin();
    printToDom("D6P1", wins);
}

function D6P1reloadData() {
    reloadData("D6P1Data")
}

function printFileD6P2(){
    let lines = data.split(/\r?\n/);
    lines = splitDataBySpacePartTwo(lines);
    lines = fillBoatRaces(lines);
    let wins = lines.waysToWin();
    printToDom("D6P2", wins);
}

function D6P2reloadData() {
    reloadData("D6P2Data")
}

class BoatRace {
    constructor(time, distance) {
        this.time = time
        this.distance = distance
    }

    waysToWin() {
        let wins = []
        for (let i = 0; i < this.time.length; i++) {
            let numberOfWins = 0
            for (let j = 0; j < this.time[i]; j++) {
                if (j * (this.time[i] - j) > this.distance[i]) {
                    numberOfWins += 1
                }
            }
            wins.push(numberOfWins)
        }
        let waysToWin = wins[0]
        for (let i = 1; i < wins.length; i++) {
            waysToWin *= wins[i]
        }
        return waysToWin
    }
}

function splitDataBySpace(data) {
    let newData = []
    for (let i = 0; i < data.length; i++) {
        newData.push(data[i].split(" "))
    }
    let procesedData = []
    for (let i = 0; i < newData.length; i++) {
        procesedData.push([])
        for(let j = 0; j < newData[i].length; j++) {
            if (newData[i][j] != "") {
                procesedData[i].push(newData[i][j])
            }
        }
    }
    return procesedData
}

function splitDataBySpacePartTwo(data) {
    let newData = []
    for (let i = 0; i < data.length; i++) {
        newData.push(data[i].split(":"))
    }
    let procesedData = []
    for (let i = 0; i < newData.length; i++) {
        procesedData.push([])
        for(let j = 0; j < newData[i].length; j++) {
            let newSring = ""
            for(let k = 0; k < newData[i][j].length; k++) {
                if (newData[i][j][k] != " ") {
                    newSring += newData[i][j][k].toString();
                }
            }
            procesedData[i].push(newSring)
        }
    }
    return procesedData
}

function fillBoatRaces(data) {
    let list = new BoatRace([], [])
    for (let i = 0; i < data.length; i++) {
        for(let j = 1; j < data[i].length; j++) {
            if (i == 0) {
                list.time.push(parseInt(data[i][j]));
            }
            else if (i == 1) {
                list.distance.push(parseInt(data[i][j]))
            }

        }
    }
    return list
}

