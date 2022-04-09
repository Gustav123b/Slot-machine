class SlotMachine {
    constructor({ reelsAm, reelSymbolAm, symbolsAm, symbolSize, c, payLines, isBonus = false, freeSpins = 0, bonusCompleted = false, coinValue }) {
        this.reelsAm = reelsAm;
        this.reelSymbolAm = reelSymbolAm;
        this.symbolsAm = symbolsAm
        this.c = c
        this.payLines = payLines

        this.isBonus = isBonus
        this.startFreeSpins = freeSpins
        this.freeSpins = freeSpins
        this.bonusCompleted = bonusCompleted
        this.bonusBuy = false
        this.bonusWinnings = 0

        this.fakeSpins = 2
        this.symbolSize = symbolSize

        this.coinValue = coinValue
        this.betSize = this.coinValue * this.payLines.length

        this.unlockedBonus = false

        this.reelStyle = {
            start: { x: 0, y: 0 },
            margin: { x: 0, y: 0 },
            size: { width: 110, height: this.reelSymbolAm * this.symbolSize + 40 }
        }

        this.size = {
            width: (this.reelStyle.size.width * this.reelsAm) + (this.reelStyle.margin.x * this.reelsAm),
            height: this.reelStyle.size.height
        }

        this.totalSpins = 0
        this.lastWin = 0
        this.biggestWin = 0
        this.totalWager = 0
        this.totalWin = 0
        this.winPayLines = []

        this.isSpinning = false
        this.spinCompleted = false
        this.winningsCalculated = false

        this.stickyWildPositions = {}
        for (let i = 0; i < reelsAm; i++)
            this.stickyWildPositions[i] = []

        this.stickyWildsObjects = []

        this.reels = this.generateReels()
        this.assignNumbersToAllReels("current")

        if (this.isBonus) {
            freeSpinsTotal = this.startFreeSpins
            bonusTotalWin = 0
            this.bonusWinnings = 0
            this.spin()
        }
    }

    update() {
        this.updateReels()
        this.draw()
    }

    updateCoinValue(newValue) {
        this.coinValue = newValue
        this.betSize = newValue * this.payLines.length
    }

    draw() {
        /* if (this.isBonus) */
        this.drawStickies()

        this.drawPayLines()
    }

    drawStickies() {
        this.stickyWildsObjects.forEach((symbol, i) => {
            symbol.update(this.c);

            if (symbol.multiplier > 0) {
                this.c.beginPath()
                c.font = '35px Sans-serif';
                let text = `${symbol.multiplier}x`
                let textSize = c.measureText(text)
                let x = symbol.position.x + symbol.size.width / 2 - textSize.width / 2
                let y = symbol.position.y + symbol.size.height / 2 + textSize.fontBoundingBoxAscent / 3

                // actualBoundingBoxAscent
                // fontBoundingBoxAscent

                this.drawStroked(this.c, text, x, y)
                this.c.closePath()
            }
        })
    }

    drawStroked(c, text, x, y) {
        c.font = '35px Sans-serif';
        c.strokeStyle = '#121217';
        c.lineWidth = 8;
        c.strokeText(text, x, y);
        c.fillStyle = '#f9c83a';
        c.fillText(text, x, y);
    }

    drawPayLines() {
        let startX = 0;
        let startY = 0;

        let palette = { red: "#FF0E0A", blue: "#0078FF", green: "#01FF1F", yellow: "#e3ff00", orange: "#FF9A00", purple: "#bd00ff", pink: "#ff007f", white: "#ffffff", black: "#000000" }
        let colors = [palette.red, palette.blue, palette.green, palette.yellow, palette.orange, palette.purple, palette.pink, palette.white, palette.pink]

        this.winPayLines.forEach((payline, i) => {
            let color = colors[i % colors.length]

            this.c.beginPath()
            this.c.lineCap = 'round';

            // Add white border to lines
            /*             payline.forEach((row, col) => {
                            let x = startX + (col * (this.symbolSize + this.reelStyle.margin.x)) + (this.symbolSize / 2)
                            let y = startY + (row * this.symbolSize) + (this.symbolSize / 2)
            
                            if (col > 0) {
                                this.c.lineTo(x, y);
                                this.c.lineWidth = 10;
                                this.c.strokeStyle = "#ffffff"
                                this.c.stroke()
                            }
            
                            this.c.moveTo(x, y);
                        }) */


            let rowHeight = this.reelStyle.size.height / this.reelSymbolAm

            // Add black border to lines
            payline.forEach((row, col) => {
                let x = startX + (col * (this.reelStyle.size.width + this.reelStyle.margin.x)) + (this.reelStyle.size.width / 2)
                let y = startY + (row * rowHeight) + (rowHeight / 2)

                if (col > 0) {
                    this.c.lineTo(x, y);
                    this.c.lineWidth = 7;
                    this.c.strokeStyle = "#111a24" // 121217
                    this.c.stroke()
                }

                this.c.moveTo(x, y);
            })

            // Line color
            payline.forEach((row, col) => {
                let x = startX + (col * (this.reelStyle.size.width + this.reelStyle.margin.x)) + (this.reelStyle.size.width / 2)
                let y = startY + (row * rowHeight) + (rowHeight / 2)

                if (col > 0) {
                    this.c.lineTo(x, y);
                    this.c.lineWidth = 2;
                    this.c.strokeStyle = color
                    this.c.stroke()
                }

                this.c.moveTo(x, y);

            })
            this.c.closePath()
        })
    }

    isEven(num) {
        return num % 2 == 0
    }

    spin() {
        if (this.isBonus)
            /* console.log(`freespins: ${this.freeSpins}/${this.startFreeSpins}`) */

            if (this.isSpinning) return

        // Bonus over
        if (this.isBonus && this.freeSpins <= 0) {
            this.bonusCompleted = true
            this.bonusBuy = false
            this.isBonus = false
            return
        }
        else if (this.isBonus) {
            this.freeSpins--
            freeSpinsLeft = this.freeSpins
        }
        else if (this.bonusBuy == false) {
            balance -= this.betSize
            this.totalWager += this.betSize
            this.totalSpins++;
        }

        updateHtml()

        this.isSpinning = true
        this.spinCompleted = false
        this.winningsCalculated = false;
        this.winPayLines = []

        this.reels.forEach(reel => {
            if (reel.currentSymbols.length == 0)
                reel.currentSymbols = reel.resultSymbols
            reel.currentRotation = 0
        })

        let customResult = [[2, 102, 3], [102, 4, 1], [1, 2, 1], [1, 2, 3], [1, 2, 3]]

        this.assignNumbersToAllReels("next")
        this.assignNumbersToAllReels("result")
    }

    updateReels() {
        this.reels.forEach((reel, i) => {
            if (this.isSpinning == false) reel.isMoving = false
            else reel.isMoving = true
            reel.update(this.c)
            if (reel.isMoving == false) return

            // See if current symbols are outside reel
            let lastIndex = reel.currentSymbols.length - 1
            let firstSymbol = reel.currentSymbols[0]
            let lastSymbol = reel.currentSymbols[lastIndex]

            // If first symbol is outside all symbols are outside
            if (firstSymbol.position.y >= reel.position.y + reel.size.height) {
                // Next symbols are the result symbols
                if (reel.currentRotation == fakeSpins) {
                    reel.currentSymbols = reel.nextSymbols
                    reel.nextSymbols = reel.resultSymbols
                    reel.currentRotation++
                }
                else if (reel.currentRotation < fakeSpins) {
                    reel.currentSymbols = reel.nextSymbols
                    this.assignNumbersToReel(reel, "next", i)
                    reel.currentRotation++
                }
                // Result symbols reached
                else {
                    this.spinCompleted = true
                    reel.currentSymbols = []
                }
            }
            else if (lastSymbol.position.y >= reel.position.y + reel.size.height) {
                reel.currentSymbols.splice(lastIndex, 1)
            }
        })

        // Stop spinning when result has been reached
        if (this.spinCompleted) {
            this.isSpinning = false

            if (this.winningsCalculated == false) {
                this.spinCompletedHandler()
            }
        }
    }

    spinCompletedHandler() {
        this.calculateWinnings()
        this.winningsCalculated = true

        // Apply sticky and multiplier to wilds in bonus 
        if (this.isBonus) {
            this.stickyWildsObjects = []
            this.reels.forEach((reel, col) => {
                reel.resultSymbols.forEach((symbol, row) => {
                    if (symbol.name == "wild") {
                        symbol.isSticky = true

                        let position = JSON.parse(JSON.stringify(symbol.position));
                        let size = JSON.parse(JSON.stringify(symbol.size));
                        let multiplier = JSON.parse(JSON.stringify(symbol.multiplier));
                        let symbolNumber

                        let rand = randInt(3)
                        if (rand == 1) rand = 0
                        if (multiplier == "none") multiplier = rand

                        if (multiplier == 0) symbolNumber = 102
                        else if (multiplier == 2) symbolNumber = 103
                        else if (multiplier == 3) symbolNumber = 104

                        let newSticky = new Wild({ position: position, size: size, multiplier: multiplier })
                        this.stickyWildsObjects.push(newSticky)
                    }
                })
            })

            let loseDelay = 650
            let winDelay = { basic: 750, medium: 1150, big: 1750, super: 2350 }
            let multi = lastWin / this.betSize
            let delay = loseDelay

            if (lastWin == 0) delay = loseDelay
            else if (multi < 5) delay = winDelay.basic
            else if (multi < 50) delay = winDelay.medium
            else if (multi < 500) delay = winDelay.big
            else delay = winDelay.super

            setTimeout(() => {
                this.spin()
            }, delay);

        }
    }

    calculateWinnings() {
        let symbols = []
        let totalWinnings = 0
        let winningLines = []
        let bonusAm = 0


        this.reels.forEach(reel => {
            symbols.push(reel.resultSymbols)

            // Check for bonus
            reel.resultSymbols.forEach(symbol => {
                if (symbol.name == "Bonus") bonusAm++
            })
        })


        for (let payline of this.payLines) {
            let connections = []
            let bonusMultiplier = 0

            let col = 0
            for (let row of payline) {
                let symbol = symbols[col][row]

                if (symbol.name == "wild" && symbol.multiplier > 0) bonusMultiplier += symbol.multiplier

                // First symbol in line
                if (connections.length == 0)
                    connections.push(symbol)
                else {
                    if (connections[0].name == "wild") {
                        // Make wild transform/joker
                        connections.push(symbol)
                        connections[0] = symbol
                    }
                    else if (connections[0].name == symbol.name || symbol.name == "wild") {
                        connections.push(symbol)
                    }
                    else
                        break;
                }


                col++
            }
            if (bonusMultiplier == 0) bonusMultiplier = 1
            let connectionMulti = (connections[0].payTable[`am${connections.length}`] == undefined) ? 0 : connections[0].payTable[`am${connections.length}`]
            let payout = connectionMulti * this.coinValue * bonusMultiplier
            /* payout += payout * bonusMultiplier */
            totalWinnings += payout


            if (payout > 0)
                winningLines.push(payline)

        }

        balance += totalWinnings
        lastWin = totalWinnings
        this.totalWin += totalWinnings
        this.winPayLines = winningLines

        if (totalWinnings > biggestWin) biggestWin = totalWinnings
        if (bonusAm == 3) this.unlockedBonus = true

        if (this.isBonus) {
            bonusTotalWin += totalWinnings
            this.bonusWinnings += totalWinnings
        }

        updateHtml()
    }

    assignNumbersToAllReels(type, custom = false) {
        this.reels.forEach((reel, i) => {
            if (custom != false)
                this.assignNumbersToReel(reel, type, i, custom[i])

            else
                this.assignNumbersToReel(reel, type, i)
        })
    }

    assignNumbersToReel(reel, type, reelIndex, custom = false) {
        const numbers = (custom != false) ? custom : this.getRandomNumbers(reelIndex, type)
        reel.updateSymbols(numbers, type)
    }

    getRandomNumbers(reelIndex, type) {
        let result = []

        for (let j = 0; j < this.reelSymbolAm; j++) {
            result.push(randInt(this.symbolsAm - 1))
        }

        /* === EXTRA SYMBOLS === */
        let randMax = 100
        let bonusOdds = (this.bonusBuy) ? 100 : 25
        let bonus = { min: 0, max: bonusOdds, num: 101 }
        let wild = { min: 0, max: 3.4, num: [102, 103, 104] }


        // Chance to get wild during bonus
        if (this.isBonus) {
            result.forEach((symbol, row) => {
                let rand = Math.random() * 100

                if (rand >= wild.min && rand <= wild.max) {
                    let randIndex = randInt(wild.num.length - 1)
                    let num = wild.num[randIndex]
                    if (type == "next") {
                        let rowRand = randInt(this.reelSymbolAm - 1)
                        result[rowRand] = num
                    }


                    // Make sure new wilds does not replace old sticky wilds
                    if (type == "result") {
                        if (this.stickyWildPositions[reelIndex].length == 0) {
                            this.stickyWildPositions[reelIndex].push({ row: row, num: num })
                        }
                        else {
                            let found = false
                            for (let wild of this.stickyWildPositions[reelIndex]) {
                                if (wild.row == row) {
                                    found = true
                                    break
                                }
                            }
                            if (found == false) {
                                this.stickyWildPositions[reelIndex].push({ row: row, num: num })
                            }
                        }
                    }
                }
            })
        }
        // Chance to add bonus symbol 
        else {
            let rand = randInt(randMax)
            if (rand >= bonus.min && rand <= bonus.max) {
                let rowRand = randInt(this.reelSymbolAm - 1)
                result[rowRand] = bonus.num
            }
        }


        if (this.isBonus && type == "result") {
            result.forEach((num, row) => {



                // Make wilds sticky
                let stickies = this.stickyWildPositions[reelIndex]
                stickies.forEach(sticky => {
                    result[sticky.row] = sticky.num
                })
            })
        }

        return result
    }

    generateReels() {
        let result = []

        for (let i = 0; i < this.reelsAm; i++) {
            let x = this.reelStyle.start.x + ((this.reelStyle.size.width + this.reelStyle.margin.x) * i)
            let y = this.reelStyle.start.y
            let w = this.reelStyle.size.width
            let h = this.reelStyle.size.height

            result.push(new Reel({
                position: { x: x, y: y },
                size: { width: w, height: h },
                symbolSize: this.symbolSize,
                isLast: (i == this.reelsAm - 1)
            }))
        }

        return result
    }
}