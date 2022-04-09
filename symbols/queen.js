class Queen extends Symbol {
    constructor({ position, size }) {
        super({ position, size })
        this.position = position;
        this.size = size;

        this.name = "Queen";
        this.minConnect = 3;
        this.payTable = { am3: 12, am4: 15, am5: 40 }

        this.img = new Image()
        this.img.src = "img/symbols/queen/queen3.svg"
    }

    static payTable = { am3: 12, am4: 15, am5: 40 }
    static img = "img/symbols/queen/queen3.svg"
}