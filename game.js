const canvas = document.querySelector("#canvas")
const c = canvas.getContext("2d")

const reelsAm = 3;
const reelSymbolHeight = 3;
const symbolSize = 80;
let symbolsAm = 10
const fakeSpins = 2; // 3

let startBalance = 1000
let balance = startBalance
let totalSpins = 0;
let lastWin = 0
let biggestWin = 0
let biggestBonusTotalWin = 0
let coinValue = 0.1
let betSize = coinValue * getSmallLines().length
let totalWager = 0

let bonusCost = betSize * 100
let totalBonusBuys = 0
let freeSpinsLeft = 0
let freeSpinsTotal = 0
let bonusSpinWin = 0
let bonusTotalWin = 0

let spinCompleted = false;
let isSpinning = false;
let winningsCalculated = false;

const slotMachine = new SlotMachine({
    reelsAm: 3, reelSymbolAm: 3, symbolsAm: symbolsAm, c: c,
    payLines: getSmallLines(), coinValue: coinValue, symbolSize: symbolSize
})
canvas.width = slotMachine.size.width
canvas.height = slotMachine.size.height

let slotMachineBonus

let isBonus = false
let canSpin = true

/* === HTML ELEMENTS === */
const elementBalance = document.querySelector("[data-current-balance]")
/* const elementStartBalance = document.querySelector("[data-start-balance]") */
const elementLastWin = document.querySelector("[data-last-win]")
const elementSpins = document.querySelector("[data-spins]")
const elementBiggestWin = document.querySelector("[data-biggest-win]")
const elementTotalWager = document.querySelector("[data-total-wager]")
const elementBonusBuysAmount = document.querySelector("[data-bonus-buys-amount]")
const elementBonusBuysBiggestWin = document.querySelector("[data-bonus-buys-biggest-win]")
const elementBetSize = document.querySelector("[data-bet-size]")

// Bonus related elements
const elementFreespinsLeft = document.querySelector("[data-freespins-left]")
const elementFreespinsTotal = document.querySelector("[data-freespins-total]")
const elementBonusTotalWin = document.querySelector("[data-bonus-total-win]")

updateHtml();

document.addEventListener("keydown", e => {
    if (e.key == " ") {
        e.preventDefault()
        spin(e)
    }
})

function changeBet(dir) {
    let step = 0.1

    if (betSize > 5) step = 0.2
    if (betSize > 15) step = 0.4
    if (betSize > 25) step = 0.6
    if (betSize > 70) step = 1.5
    if (betSize > 80) step = 3
    if (betSize > 90) step = 4

    coinValue = (dir == "up") ? coinValue += step : coinValue -= step
    if (coinValue < 0.1) coinValue = 0.1
    else if (coinValue > 100) coinValue = 100

    betSize = coinValue * getSmallLines().length
    bonusCost = betSize * 100
    slotMachine.updateCoinValue(coinValue)

    updateHtml()
    generatePayTable()
}

function spin() {
    if (isBonus == false && slotMachine.isSpinning == false && canSpin) slotMachine.spin()
}

function animate() {
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)

    if (isBonus) {
        slotMachineBonus.update()
        canSpin = false
        if (slotMachineBonus.bonusCompleted) {
            console.log(`Winnings from bonus: ${slotMachineBonus.totalWin}`)
            if (slotMachineBonus.totalWin > biggestBonusTotalWin) biggestBonusTotalWin = slotMachineBonus.totalWin
            isBonus = false
            canSpin = true
            slotMachine.bonusBuy = false

            bonusHideToggle()
            lastWin = bonusTotalWin
            updateHtml()

            canvas.width = slotMachine.size.width
            canvas.height = slotMachine.size.height
        }
    }
    else {
        slotMachine.update()
        if (slotMachine.unlockedBonus) {
            canSpin = false
            slotMachine.unlockedBonus = false
            let delay = 800

            setTimeout(() => {
                startBonus()
            }, delay);
        }
    }
}

function bonusBuyBtn() {
    if (canSpin == false) return

    balance -= bonusCost
    slotMachine.bonusBuy = true
    slotMachine.spin()
    totalBonusBuys++;

    updateHtml()
}

function startBonus() {
    bonusHideToggle()

    isBonus = true
    let freeSpins = 7

    slotMachineBonus = new SlotMachine({
        reelsAm: 5, reelSymbolAm: 3, symbolsAm: symbolsAm,
        c: c, payLines: getAutoLines(5, 3), isBonus: true, freeSpins: freeSpins,
        coinValue: coinValue, symbolSize: symbolSize
    })
    canvas.width = slotMachineBonus.size.width
    canvas.height = slotMachineBonus.size.height

    updateHtml()
}

function bonusHideToggle() {
    document.querySelector(".bonus-container").classList.toggle("hide")
    document.querySelector(".bet-container").classList.toggle("hide")
}

function updateHtml() {
    elementBalance.innerHTML = balance.toFixed(2)
    /* elementStartBalance.innerHTML = startBalance */
    elementLastWin.innerHTML = lastWin.toFixed(2)
    elementSpins.innerHTML = totalSpins
    elementBiggestWin.innerHTML = biggestWin.toFixed(2)
    elementBonusBuysBiggestWin.innerHTML = biggestBonusTotalWin.toFixed(2)
    elementTotalWager.innerHTML = totalWager.toFixed(2)
    elementBonusBuysAmount.innerHTML = totalBonusBuys
    elementBetSize.innerHTML = betSize.toFixed(2)

    // Bonus
    elementFreespinsLeft.innerHTML = freeSpinsLeft
    elementFreespinsTotal.innerHTML = freeSpinsTotal
    elementBonusTotalWin.innerHTML = bonusTotalWin.toFixed(2)
}

function getSmallLines() {
    const line1 = [0, 0, 0]
    const line2 = [1, 1, 1]
    const line3 = [2, 2, 2]
    const line4 = [0, 1, 2]
    const line5 = [2, 1, 0]
    const line6 = [0, 1, 0]
    const line7 = [2, 1, 2]
    const line8 = [1, 0, 1]
    const line9 = [1, 2, 1]

    return [line1, line2, line3, line4, line5, line6, line7, line8, line9]
}

function getBonusLines() {
    // Horizontal
    const line1 = [0, 0, 0, 0, 0]
    const line2 = [1, 1, 1, 1, 1]
    const line3 = [2, 2, 2, 2, 2]
    const line4 = [3, 3, 3, 3, 3]
    const line5 = [4, 4, 4, 4, 4]

    // Cross
    const line6 = [0, 1, 2, 3, 4]
    const line7 = [4, 3, 2, 1, 0]

    // Triangle, V shape
    const line8 = [0, 1, 2, 1, 0]
    const line9 = [4, 3, 2, 3, 4]

    // U shape
    const line10 = [0, 4, 4, 4, 0]
    const line11 = [4, 0, 0, 0, 4]

    return [line1, line2, line3, line4, line5, line6, line7, line8, line9, line10, line11]
}

// max win atm: (highest paying symbol) * (paylines am) * (max multi=3 * columns=5) 500*11*15 = 82500

function getAutoLines(cols, rows) {
    let result = []

    // Straight lines
    for (let i = 0; i < rows; i++) {
        let line = []

        for (let j = 0; j < cols; j++)
            line.push(i)

        result.push(line)
    }

    // V zig-zag
    for (let i = 0; i < 2; i++) {
        let line = []

        let row = i * (rows - i)
        let direction = (row == 0) ? -1 : 1

        for (let j = 0; j < cols; j++) {
            line.push(row)

            if (row == 0 || row == (rows - 1)) direction *= -1
            row += direction
        }

        result.push(line)
    }

    // Zig-zag start from middle
    for (let i = 0; i < 2; i++) {
        let line = []

        let row = Math.floor(rows / 2)
        let direction = (i == 0) ? -1 : 1

        for (let j = 0; j < cols; j++) {
            line.push(row)

            if (row == 0 || row == (rows - 1)) direction *= -1
            row += direction
        }

        result.push(line)
    }

    // U Shape
    for (let i = 0; i < 2; i++) {
        let line = []

        let row = i * (rows - i)
        let reverse = (rows - 1) - ((rows - i) * i)

        for (let j = 0; j < cols; j++) {
            let currentRow = (j == 0 || j == (cols - 1)) ? row : reverse
            line.push(currentRow)
        }

        result.push(line)
    }

    // W and M Shape
    for (let i = 0; i < 2; i++) {
        let line = []

        let row = i * (rows - i)
        let reverse = (rows - 1) - ((rows - i) * i)

        for (let j = 0; j < cols; j++) {
            let currentRow = (isEven(j)) ? row : reverse
            line.push(currentRow)
        }

        result.push(line)
    }

    // Thunder shape (not in illustrator)


    return result
}


function isEven(num) {
    return num % 2 == 0
}

function generatePayTable() {
    /* const container = document.querySelector(".paytable-container") */
    const container = document.querySelector("[data-paytable='normal']")
    const specialContainer = document.querySelector("[data-paytable='special']")
    container.innerHTML = ""
    specialContainer.innerHTML = ""

    const symbols = ["Bonus", "Wild", "Dragon", "Chicken", "Lamp", "Yinyang", "Coin", "Ace", "King", "Queen", "Jack", "Ten"]

    symbols.forEach(symbolName => {
        let symbol = eval(symbolName)

        if (symbolName == "Bonus" || symbolName == "Wild")
            specialContainer.innerHTML += getPayTableElement(symbol)
        else
            container.innerHTML += getPayTableElement(symbol)
    })

    function getPayTableElement(symbol) {

        let element = `
        <div class="symbol-paytable">
        <img class="symbol-img" src="${symbol.img}" alt="symbol">
        <h3 class="symbol-title">${symbol.name}</h3>
        `

        if (symbol.description != undefined) {
            element += `
            <div>
            <p class="desc">${symbol.description}</p>
            </div>
            `
        }



        if (symbol.payTable != undefined) {
            element += `
            <div>
            <p><span class="bold">5</span> $${(symbol.payTable.am5 * coinValue).toFixed(2)}</p>
            <p><span class="bold">4</span> $${(symbol.payTable.am4 * coinValue).toFixed(2)}</p>
            <p><span class="bold">3</span> $${(symbol.payTable.am3 * coinValue).toFixed(2)}</p>
            </div>
            `
        }

        element += `</div>`
        return element
    }
}

animate()
generatePayTable()
