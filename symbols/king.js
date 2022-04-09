class King extends Symbol {
    constructor({ position, size }) {
        super({ position, size })
        this.position = position;
        this.size = size;

        this.name = "King";
        this.minConnect = 3;
        this.payTable = { am3: 12, am4: 24, am5: 65 }

        this.img = new Image()
        this.img.src = "img/symbols/king/king.svg"
    }

    static payTable = { am3: 12, am4: 24, am5: 65 }
    static img = "img/symbols/king/king.svg"
}