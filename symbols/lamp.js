class Lamp extends Symbol {
    constructor({ position, size }) {
        super({ position, size })
        this.position = position;
        this.size = size;

        this.name = "lamp";
        this.minConnect = 3;
        this.payTable = { am3: 30, am4: 70, am5: 250 }

        this.img = new Image()

        /* this.img.src = "img/symbols/melon/melon2.png" */
        this.img.src = "img/symbols/lamp/lamp8.svg"
    }

    static payTable = { am3: 30, am4: 70, am5: 250 }
    static img = "img/symbols/lamp/lamp8.svg"
}