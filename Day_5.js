function printFileD5P1(){
    let lines = data.split(/\r?\n/);
    lines = breakApartGroups(lines);
    let almanac = (fillAlmanac(lines))
    let seedNums = splitSeedNumbers(lines)
    let seeds = []
    for (let i = 0; i < seedNums.length; i++) {
        seeds.push(almanac.lookupSeedInfo(seedNums[i]))
    }
    printToDom("D5P1", findLowestLoc(seeds));
}

function D5P1reloadData() {
    reloadData("D5P1Data")
}

class Almanac {
    constructor(seedToSoil, soilToFert, fertToWater, waterToLight, lightToTemp, tempToHum, humToLoc) {
        this.seedToSoil = seedToSoil
        this.soilToFert = soilToFert
        this.fertToWater = fertToWater
        this.waterToLight = waterToLight
        this.lightToTemp = lightToTemp
        this. tempToHum = tempToHum
        this.humToLoc = humToLoc
    }

    lookupSeedInfo(seedNumber) {
        let seedInfo = new SeedInfo()
        seedInfo.seedNumber = seedNumber
        seedInfo.soilNumber = this.compareLists(seedNumber, this.seedToSoil)
        seedInfo.fertNumber = this.compareLists(seedInfo.soilNumber, this.soilToFert)
        seedInfo.waterNumber = this.compareLists(seedInfo.fertNumber, this.fertToWater)
        seedInfo.lightNumber = this.compareLists(seedInfo.waterNumber, this.waterToLight)
        seedInfo.tempNumber = this.compareLists(seedInfo.lightNumber, this.lightToTemp)
        seedInfo.humNumber = this.compareLists(seedInfo.tempNumber, this.tempToHum)
        seedInfo.locNumber = this.compareLists(seedInfo.humNumber, this.humToLoc)
        return seedInfo
    }

    lookupLocInfo(seedNumber) {
        let number = seedNumber
        number = this.compareLists(number, this.seedToSoil)
        number = this.compareLists(number, this.soilToFert)
        number = this.compareLists(number, this.fertToWater)
        number = this.compareLists(number, this.waterToLight)
        number = this.compareLists(number, this.lightToTemp)
        number = this.compareLists(number, this.tempToHum)
        number = this.compareLists(number, this.humToLoc)
        return number
    }

    compareLists(refNumber, refList) {
        for(let i = 0; i < refList.length; i++) {
            if (refNumber <= refList[i][1] + refList[i][2] - 1 && refNumber >= refList[i][1]) {
                let rangeDiff = refNumber - refList[i][1]
                return (refList[i][0] + rangeDiff)
            }
        }
        return refNumber
    }
}

class SeedInfo {
    constructor(seedNumber, soilNumber, fertNumber, waterNumber, lightNumber, tempNumber, humNumber, locNumber) {
        this.seedNumber = seedNumber
        this.soilNumber = soilNumber
        this.fertNumber = fertNumber
        this.waterNumber = waterNumber
        this. lightNumber = lightNumber
        this.tempNumber = tempNumber
        this.humNumber = humNumber
        this.locNumber = locNumber
    }
}

function fillAlmanac(data) {
    let almanac = new Almanac([], [], [], [], [], [], [])
    for (let i = 1; i < data.length; i++) {
        for (let j = 1; j < data[i].length; j++) {
            let newLine = data[i][j].split(" ")
            let newLineParsed = []
            for (let k = 0; k < newLine.length; k++) {
                newLineParsed.push(parseInt(newLine[k]))
            }
            switch(i) {
                case 1:
                    almanac.seedToSoil.push(newLineParsed);
                    continue;
                case 2:
                    almanac.soilToFert.push(newLineParsed);
                    continue;
                case 3:
                    almanac.fertToWater.push(newLineParsed);
                    continue;
                case 4:
                    almanac.waterToLight.push(newLineParsed);
                    continue;
                case 5:
                    almanac.lightToTemp.push(newLineParsed);
                    continue;
                case 6:
                    almanac.tempToHum.push(newLineParsed);
                    continue;
                case 7:
                    almanac.humToLoc.push(newLineParsed);
                    continue;
            } 
        }
    }
    return almanac
}

function breakApartGroups(data) {
    let newData = []
    let startIndex = 0
    for (let i = 0; i < data.length; i++) {
        if (data[i] == "") {
            newData.push(data.slice(startIndex, i))
            startIndex = i + 1
        }
        else if (i == data.length - 1) {
            newData.push(data.slice(startIndex, i))
        }
    }
    return newData
}
function splitSeedNumbers(data) {
    let colonSplit = data[0][0].split(": ")
    let seedNums = colonSplit[1].split(" ")
    let seedNumsParsed = []
    for(let i = 0; i < seedNums.length; i++) {
        seedNumsParsed.push(parseInt(seedNums[i]))
    }
    return seedNumsParsed
}
function findLowestLoc(seedInfoList) {
    let lowest = seedInfoList[0].locNumber
    for (let i = 1; i < seedInfoList.length; i++) {
        if (seedInfoList[i].locNumber < lowest) {
            lowest = seedInfoList[i].locNumber
        }
    }
    return lowest
}