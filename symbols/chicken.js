class Chicken extends Symbol {
    constructor({ position, size }) {
        super({ position, size })
        this.position = position;
        this.size = size;

        this.name = "chicken";
        this.minConnect = 3;
        this.payTable = { am3: 35, am4: 80, am5: 400 }

        this.img = new Image()
        this.img.src = "img/symbols/chicken/chicken2.svg"
    }

    static payTable = { am3: 35, am4: 80, am5: 400 }
    static img = "img/symbols/chicken/chicken2.svg"
}