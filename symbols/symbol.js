class Symbol {
    constructor({ position, size, value, name, img, multiplier = "none" }) {
        this.position = position;
        this.size = size;
        this.value = value;
        this.name = name;
        this.img = img;
        this.isSticky = false
        this.multiplier = multiplier
        this.payTable
    }

    update(c) {
        this.draw(c)
    }

    draw(c) {
        c.beginPath()
        c.drawImage(this.img, this.position.x, this.position.y, this.size.width, this.size.height)
        c.closePath()
    }

    getPayTable() {
        return this.payTable
    }
}