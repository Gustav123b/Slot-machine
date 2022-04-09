class Yinyang extends Symbol {
    constructor({ position, size }) {
        super({ position, size })
        this.position = position;
        this.size = size;

        this.name = "yinyang";
        this.minConnect = 3;
        this.payTable = { am3: 30, am4: 70, am5: 250 }
        this.img = new Image()
        this.img.src = "img/symbols/yinyang/yinyang2.svg"
    }

    static payTable = { am3: 30, am4: 70, am5: 250 }
    static img = "img/symbols/yinyang/yinyang2.svg"
}