class Jack extends Symbol {
    constructor({ position, size }) {
        super({ position, size })
        this.position = position;
        this.size = size;

        this.name = "Jack";
        this.minConnect = 3;
        this.payTable = { am3: 8, am4: 10, am5: 30 }

        this.img = new Image()
        this.img.src = "img/symbols/jack/jack.svg"
    }

    static payTable = { am3: 8, am4: 10, am5: 30 }
    static img = "img/symbols/jack/jack.svg"
}