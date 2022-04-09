class Coin extends Symbol {
    constructor({ position, size }) {
        super({ position, size })
        this.position = position;
        this.size = size;

        this.name = "coin";
        this.minConnect = 3;
        this.payTable = { am3: 20, am4: 35, am5: 150 }

        this.img = new Image()

        this.img.src = "img/symbols/coin/coin5.svg"
    }

    static payTable = { am3: 20, am4: 35, am5: 150 }
    static img = "img/symbols/coin/coin5.svg"
}