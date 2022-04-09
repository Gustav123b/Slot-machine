class Dragon extends Symbol {
    constructor({ position, size }) {
        super({ position, size })
        this.position = position;
        this.size = size;

        this.name = "dragon";
        this.minConnect = 3;
        this.payTable = { am3: 35, am4: 70, am5: 700 }

        this.img = new Image()
        this.img.src = "img/symbols/dragon/dragon.svg"
    }

    static payTable = { am3: 35, am4: 70, am5: 700 }
    static img = "img/symbols/dragon/dragon.svg"
}