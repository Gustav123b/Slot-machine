class Ace extends Symbol {
    constructor({ position, size }) {
        super({ position, size })
        this.position = position;
        this.size = size;

        this.name = "Ace";
        this.minConnect = 3;
        this.payTable = { am3: 13, am4: 26, am5: 80 }

        this.img = new Image()
        this.img.src = "img/symbols/ace/ace.svg"
    }

    static payTable = { am3: 13, am4: 26, am5: 80 }
    static img = "img/symbols/ace/ace.svg"
}