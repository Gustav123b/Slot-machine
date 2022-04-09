class Ten extends Symbol {
    constructor({ position, size }) {
        super({ position, size })
        this.position = position;
        this.size = size;

        this.name = "ten";
        this.minConnect = 3;
        this.payTable = { am3: 5, am4: 10, am5: 25 }

        this.img = new Image()
        this.img.src = "img/symbols/ten/ten.svg"
    }

    static payTable = { am3: 5, am4: 10, am5: 25 }
    static img = "img/symbols/ten/ten.svg"
}