class Bonus extends Symbol {
    constructor({ position, size }) {
        super({ position, size })
        this.position = position;
        this.size = size;

        this.name = "Bonus";
        this.minConnect = 3;
        this.payTable = {}

        this.img = new Image()
        this.img.src = "img/symbols/bonus/bonus3.svg"
    }

    static img = "img/symbols/bonus/bonus3.svg"
    static description = "3 bonus symbols in base game will unluck bonus mode."
}