function printFileD5P2(){
    let lines = data.split(/\r?\n/);
    lines = breakApartGroups(lines);
    let almanac = (fillAlmanac(lines))
    let seedNums = splitSeedNumbers(lines)
    let lowest = null
    for (let i = 0; i < seedNums.length; i+= 2) {
        for (let j = seedNums[i]; j < seedNums[i] + seedNums[i + 1]; j++) {
            let locNum = almanac.lookupLocInfo(j)
            if (lowest == null) {
                lowest = locNum
            }
            else if (locNum < lowest) {
                lowest = locNum
            }
        }
    }
    printToDom("D5P2", lowest);
}

function D5P2reloadData() {
    reloadData("D5P2Data")
}