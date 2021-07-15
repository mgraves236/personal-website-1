let _scl = 40;

class Snake {
    constructor() {
        this.body = [];
        this.body[0] = new Point(80, 80);
        this.length = 1;
        this.xSpeed = 1;
        this.ySpeed = 0;
    }

    direction(x, y) {
        this.xSpeed = x;
        this.ySpeed = y
    }

    eat() {
        let head = new Point(this.body[this.length - 1].x, this.body[this.length - 1].y);
        if (head.x === _food.x && head.y === _food.y) {
            _food.randomPos();
            this.grow();
        }
    }

    grow() {
        let head = new Point(this.body[this.length - 1].x, this.body[this.length - 1].y);
        this.length++;
        this.body.push(head);
    }

    endGame() {
        let head = new Point(this.body[this.length - 1].x, this.body[this.length - 1].y);
        for (let i = 0; i < this.length - 1; i++) {
            if (head.x === this.body[i].x && head.y === this.body[i].y) {
                return true;
            }
        }
        if (head.x > 750 || head.x < 40 || head.y > 790 || head.y < 0) {
            return true;
        }
        return false;
    }

    update() {
        let head = new Point(this.body[this.length - 1].x, this.body[this.length - 1].y);
        let x = head.x + this.xSpeed * _scl;
        let y = head.y + this.ySpeed * _scl;

        this.body.shift();
        head.x = x;
        head.y = y;
        this.body.push(head);
    }

    show() {
        _ctx.save();
        _ctx.clearRect(0, 0, _canvas.width, _canvas.height);
        drawBoard();
        _food.getFood();
        _ctx.restore();
        _ctx.fillStyle = "#880015";
        for (let i = 0; i < this.length; i++) {
            _ctx.fillRect(this.body[i].x, this.body[i].y, 40, 40);
        }
        // tail drawing
        if ((this.length > 1 && this.body[0].x === this.body[1].x) && this.body[0].y > this.body[1].y) {
            _ctx.fillRect(this.body[0].x + 15, this.body[0].y + 40, 10, 40);
        } else if ((this.length > 1 && this.body[0].x === this.body[1].x) && this.body[0].y < this.body[1].y) {
            _ctx.fillRect(this.body[0].x + 15, this.body[0].y - 40, 10, 40);
        } else if ((this.length > 1 && this.body[0].y === this.body[1].y) && this.body[0].x < this.body[1].x) {
            _ctx.fillRect(this.body[0].x - 40, this.body[0].y + 15, 40, 10);
        } else if (this.length > 1) {
            _ctx.fillRect(this.body[0].x + 40, this.body[0].y + 15, 40, 10);
        }

        if (this.xSpeed > 0) {

            /* head */
            _ctx.fillRect(this.body[this.length - 1].x, this.body[this.length - 1].y, 40, 40);
            _ctx.fillRect(this.body[this.length - 1].x, this.body[this.length - 1].y - 10, 20, 10);
            _ctx.fillRect(this.body[this.length - 1].x, this.body[this.length - 1].y + 40, 20, 10);
            _ctx.save();
            _ctx.fillStyle = "#000";
            _ctx.fillRect(this.body[this.length - 1].x + 60, this.body[this.length - 1].y + 15, 10, 10);
            _ctx.fillRect(this.body[this.length - 1].x + 25, this.body[this.length - 1].y + 25, 10, 10);
            _ctx.fillRect(this.body[this.length - 1].x + 25, this.body[this.length - 1].y + 4, 10, 10);
            _ctx.fillStyle = "#f4d39d";
            _ctx.fillRect(this.body[this.length - 1].x + 40, this.body[this.length - 1].y + 8, 20, 25);
            _ctx.fillStyle = "#ffffff";
            _ctx.fillRect(this.body[this.length - 1].x + 25, this.body[this.length - 1].y + 30, 7, 5);
            _ctx.fillRect(this.body[this.length - 1].x + 25, this.body[this.length - 1].y + 3, 7, 5);
            _ctx.restore();
            if (this.length === 1) {
                _ctx.fillRect(this.body[0].x - 40, this.body[0].y + 15, 40, 10);
            }

        } else if (this.xSpeed < 0) {

            /* head */
            _ctx.fillStyle = "#880015";
            _ctx.fillRect(this.body[this.length - 1].x, this.body[this.length - 1].y, 40, 40);
            _ctx.fillRect(this.body[this.length - 1].x + 20, this.body[this.length - 1].y - 10, 20, 10);
            _ctx.fillRect(this.body[this.length - 1].x + 20, this.body[this.length - 1].y + 40, 20, 10);
            _ctx.save();
            _ctx.fillStyle = "#000";
            _ctx.fillRect(this.body[this.length - 1].x - 30, this.body[this.length - 1].y + 15, 10, 10);
            _ctx.fillRect(this.body[this.length - 1].x + 5, this.body[this.length - 1].y + 25, 10, 10);
            _ctx.fillRect(this.body[this.length - 1].x + 5, this.body[this.length - 1].y + 4, 10, 10);
            _ctx.fillStyle = "#f4d39d";
            _ctx.fillRect(this.body[this.length - 1].x - 20, this.body[this.length - 1].y + 8, 20, 25);
            _ctx.fillStyle = "#ffffff";
            _ctx.fillRect(this.body[this.length - 1].x + 5, this.body[this.length - 1].y + 30, 7, 5);
            _ctx.fillRect(this.body[this.length - 1].x + 5, this.body[this.length - 1].y + 3, 7, 5);
            /* tail */
            _ctx.restore();
            if (this.length === 1) {
                _ctx.fillRect(this.body[0].x + 40 * this.length, this.body[0].y + 15, 40, 10);
            }

        } else if (this.ySpeed < 0) {

            /* head */
            _ctx.fillStyle = "#880015";
            _ctx.fillRect(this.body[this.length - 1].x, this.body[this.length - 1].y, 40, 40);
            _ctx.fillRect(this.body[this.length - 1].x - 10, this.body[this.length - 1].y + 20, 10, 20);
            _ctx.fillRect(this.body[this.length - 1].x + 40, this.body[this.length - 1].y + 20, 10, 20);
            _ctx.save();
            _ctx.fillStyle = "#000";
            _ctx.fillRect(this.body[this.length - 1].x + 15, this.body[this.length - 1].y - 30, 10, 10);
            _ctx.fillRect(this.body[this.length - 1].x + 3, this.body[this.length - 1].y + 5, 10, 10);
            _ctx.fillRect(this.body[this.length - 1].x + 27, this.body[this.length - 1].y + 5, 10, 10);
            _ctx.fillStyle = "#f4d39d";
            _ctx.fillRect(this.body[this.length - 1].x + 7, this.body[this.length - 1].y - 20, 25, 20);
            _ctx.fillStyle = "#ffffff";
            _ctx.fillRect(this.body[this.length - 1].x + 3, this.body[this.length - 1].y + 5, 5, 7);
            _ctx.fillRect(this.body[this.length - 1].x + 31, this.body[this.length - 1].y + 5, 5, 7);
            /* tail */
            _ctx.restore();
            if (this.length === 1) {
                _ctx.fillRect(this.body[0].x + 15, this.body[0].y + 40 * this.length, 10, 40);
            }

        } else {

            /* head */
            _ctx.fillStyle = "#880015";
            _ctx.fillRect(this.body[this.length - 1].x, this.body[this.length - 1].y, 40, 40);
            _ctx.fillRect(this.body[this.length - 1].x - 10, this.body[this.length - 1].y, 10, 20);
            _ctx.fillRect(this.body[this.length - 1].x + 40, this.body[this.length - 1].y, 10, 20);
            _ctx.save();
            _ctx.fillStyle = "#000";
            _ctx.fillRect(this.body[this.length - 1].x + 15, this.body[this.length - 1].y + 60, 10, 10);
            _ctx.fillRect(this.body[this.length - 1].x + 3, this.body[this.length - 1].y + 25, 10, 10);
            _ctx.fillRect(this.body[this.length - 1].x + 27, this.body[this.length - 1].y + 25, 10, 10);
            _ctx.fillStyle = "#f4d39d";
            _ctx.fillRect(this.body[this.length - 1].x + 7, this.body[this.length - 1].y + 40, 25, 20);
            _ctx.fillStyle = "#ffffff";
            _ctx.fillRect(this.body[this.length - 1].x + 3, this.body[this.length - 1].y + 25, 5, 7);
            _ctx.fillRect(this.body[this.length - 1].x + 31, this.body[this.length - 1].y + 25, 5, 7);
            /* tail */
            _ctx.restore();
            if (this.length === 1) {
                _ctx.fillRect(this.body[0].x + 15, this.body[0].y - 40 * this.length, 10, 40);
            }
        }
    }
}
