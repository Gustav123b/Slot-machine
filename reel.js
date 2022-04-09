class Reel {
    constructor({ position, size, symbolSize, isLast }) {
        this.position = position
        this.size = size;
        this.symbolSize = symbolSize
        this.isLast = isLast

        this.currentSymbols = []
        this.nextSymbols = []
        this.resultSymbols = []

        this.isMoving = true
        this.mspd = 8; // 8
        this.currentRotation = 0
    }

    update(c) {
        if (this.isMoving) this.moveSymbols()
        this.draw(c)
    }

    moveSymbols() {
        this.currentSymbols.forEach(symbol => {
            symbol.position.y += this.mspd
        })

        this.nextSymbols.forEach(symbol => {
            symbol.position.y += this.mspd
        })
    }

    updateSymbols(numbers, type) {
        if (type == "current") this.currentSymbols = []
        else if (type == "next") this.nextSymbols = []
        else if (type == "result") this.resultSymbols = []

        let baseX = this.position.x
        let baseY = (type == "current") ? this.position.y : this.position.y - (this.symbolSize * numbers.length)

        numbers.forEach((num, i) => {
            let symbolName = this.getSymbolFromNumber(num)
            let rowHeight = this.size.height / numbers.length
            let position = { x: baseX + this.size.width / 2 - this.symbolSize / 2, y: baseY + (rowHeight * i) }
            let size = { width: this.symbolSize, height: this.symbolSize }
            let symbol;

            if (symbolName == "ten") symbol = new Ten({ position, size })
            else if (symbolName == "jack") symbol = new Jack({ position, size })
            else if (symbolName == "queen") symbol = new Queen({ position, size })
            else if (symbolName == "king") symbol = new King({ position, size })
            else if (symbolName == "ace") symbol = new Ace({ position, size })
            else if (symbolName == "chicken") symbol = new Chicken({ position, size })
            else if (symbolName == "lamp") symbol = new Lamp({ position, size })
            else if (symbolName == "yinyang") symbol = new Yinyang({ position, size })
            else if (symbolName == "coin") symbol = new Coin({ position, size })
            else if (symbolName == "dragon") symbol = new Dragon({ position, size })
            else if (symbolName == "bonus") symbol = new Bonus({ position, size })
            else if (symbolName == "wild") symbol = new Wild({ position, size, multiplier: 0 })
            else if (symbolName == "wild-2x") symbol = new Wild({ position, size, multiplier: 2 })
            else if (symbolName == "wild-3x") symbol = new Wild({ position, size, multiplier: 3 })

            if (type == "current") this.currentSymbols.push(symbol)
            else if (type == "next") this.nextSymbols.push(symbol)
            else if (type == "result") this.resultSymbols.push(symbol)
        })
    }

    getSymbolFromNumber(num) {
        switch (num) {
            case 0:
                return "jack"
            case 1:
                return "queen"
            case 2:
                return "king"
            case 3:
                return "ace"
            case 4:
                return "dragon"
            case 5:
                return "chicken"
            case 6:
                return "lamp"
            case 7:
                return "ten"
            case 8:
                return "coin"
            case 9:
                return "yinyang"
            case 101:
                return "bonus"
            case 102:
                return "wild"
            case 103:
                return "wild-2x"
            case 104:
                return "wild-3x"

            default:
                break;
        }
    }

    draw(c) {
        /*         // Draw reel
                c.beginPath()
                c.lineWidth = 1;
                c.strokeStyle = "#777882"
                c.lineCap = 'butt';
                c.rect(this.position.x, this.position.y, this.size.width, this.size.height)
                c.closePath() */

        if (this.isLast == false) {
            c.beginPath()
            c.lineWidth = 2
            c.strokeStyle = "#3c2425"
            c.moveTo(this.position.x + this.size.width, this.position.y)
            c.lineTo(this.position.x + this.size.width, this.position.y + this.size.height)
            c.stroke()
            c.closePath()
        }

        this.drawSymbols(c)

    }

    drawSymbols(c) {
        this.currentSymbols.forEach(symbol => {
            symbol.update(c)
        })

        this.nextSymbols.forEach(symbol => {
            symbol.update(c)
        })
    }
}