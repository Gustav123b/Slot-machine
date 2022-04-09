class Wild extends Symbol {
    constructor({ position, size, multiplier = "none" }) {
        super({ position, size, multiplier })
        this.position = position;
        this.size = size;
        this.multiplier = multiplier

        this.name = "wild";
        this.minConnect = 3;
        this.payTable = { am5: 500 }

        this.isSticky = false;

        this.img = new Image()
        this.img.src = "img/symbols/wild/wild5.svg"
    }

    static img = "img/symbols/wild/wild5.svg"
    static description = "In bonus mode sticky wilds with random multipliers from 1-3x will drop."
}