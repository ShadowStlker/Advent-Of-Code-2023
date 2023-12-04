function printFileD2P2(){
    let lines = data.split(/\r?\n/);
    printToDom("D2P2", findNumbersD2P2(lines));
}

function D2P2reloadData() {
    reloadData("D2P2Data")
  }

function getPowerOfSet(data) {
    let power = 0
    for (let i = 0; i < data.length; i++) {
        let r = 0
        let b = 0
        let g = 0
        for (let k = 0; k < data[i].green.length; k++) {
            if (data[i].red[k] > r) {
                r = data[i].red[k]
            }
            if (data[i].blue[k] > b) {
                b = data[i].blue[k]
            }
            if (data[i].green[k] > g) {
                g = data[i].green[k]
            }
        }
        power += r * b * g
    }
    return power
}
function findNumbersD2P2(input) {
    let listOfGames = createData(input, [])
    return (getPowerOfSet(listOfGames))
}