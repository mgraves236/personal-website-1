class Food {
    constructor() {
        this.x = 0;
        this.y = 0;
    }

    randomPos() {
        let cols = Math.floor(_canvas.width / _scl);
        let rows = Math.floor(_canvas.height / _scl);
        this.x = Math.floor(Math.random() * (cols - 2) + 1);
        this.y = Math.floor(Math.random() * (rows - 2) + 1);
        this.x = this.x * _scl;
        this.y = this.y * _scl
    }

    getFood() {
        _ctx.fillStyle = "#d08111";
        _ctx.fillRect(this.x, this.y, 40, 40);
        _ctx.fillStyle = "#e8a160";
        _ctx.beginPath();
        _ctx.ellipse(this.x + 7, this.y + 20, 3, 15, 0, 0, 2 * Math.PI);
        _ctx.fill();
    }
}