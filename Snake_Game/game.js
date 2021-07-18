let _canvas;
let _ctx;
let _snake;
let _food;

let _touchStartX = 0;
let _touchEndX = 0;
let _touchStartY = 0;
let _touchEndY = 0;


let _playButton = {
    x: 300,
    y: 360,
    width: 200,
    height: 80
};

function drawButton() {
    _ctx.fillStyle = "rgb(255,20,147)";
    _ctx.fillRect(_playButton.x, _playButton.y, _playButton.width, _playButton.height);
    _ctx.fillStyle = "#ffffff";
    _ctx.font = "60px Arial";
    _ctx.fillText("PLAY", _playButton.x + 25, _playButton.y + 60);
}

setUp();

function clickBtn(e) {
    let mousePos = getMousePos(e);
    if (isInside(mousePos, _playButton)) {
        startGame();
    }
}

function setUp() {
    _canvas = document.getElementById("canvas");
    _ctx = _canvas.getContext("2d");
    _canvas.width = 800;
    _canvas.height = 800;
    drawBoard();
   _canvas.addEventListener('click', clickBtn);
   drawButton();
}

function startGame() {
    _canvas.removeEventListener('click', clickBtn);
    _food = new Food();
    _food.randomPos();
    _snake = new Snake();
    _snake.show();
    window.requestAnimationFrame(mainGame);
}

function drawBoard() {
    _ctx.fillStyle = "rgba(255,20,147,0.45)";
    for (let j = 0; j < 40; j++) {
        for (let i = 0; i < 40; i++) {
            if (j%2 === 0) {
                _ctx.fillRect(80 * i, 40 * j, 40, 40);
            } else {
                _ctx.fillRect(40 + 80 * i, 40 * j, 40, 40);
            }
        }
    }
}

const snakeSpeed = 3;
let lastRenderTime = 0;

function mainGame(currentTime) {

   window.requestAnimationFrame(mainGame);
   const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;
    if (secondsSinceLastRender < 1 / snakeSpeed) return;
   lastRenderTime = currentTime;

    window.addEventListener('keydown', function (e) {
        if (e.key === 'ArrowUp') {
            _snake.direction(0, -1);
        } else if (e.key === 'ArrowDown') {
            _snake.direction(0, 1);
        } else if (e.key === 'ArrowLeft') {
            _snake.direction(-1, 0);
        } else if (e.key === 'ArrowRight') {
            _snake.direction(1, 0);
        }
    });

    window.addEventListener('touchstart', function (e) {
        _touchStartX = e.changedTouches[0].screenX;
        _touchStartY = e.changedTouches[0].screenY;
    });

    window.addEventListener('touchend', function (e) {
        _touchEndX = e.changedTouches[0].screenX;
        _touchEndY = e.changedTouches[0].screenY;
        handleMove();
    });


    if (_snake.endGame()) {
        _ctx.clearRect(0, 0, _canvas.width, _canvas.height);
        drawBoard();
        _canvas.addEventListener('click', clickBtn);
        drawButton();
        return;
    }
    _snake.eat();
    _snake.update();
    _snake.show();
}

function getMousePos(event) {
    let rect = _canvas.getBoundingClientRect();
    let scaleX = _canvas.width / rect.width;
    let scaleY = _canvas.height / rect.height;

    return {
        x: (event.clientX - rect.left) * scaleX,
        y: (event.clientY - rect.top) * scaleY
    };
}

function isInside(pos, button) {
    return pos.x > button.x && pos.x < button.x + button.width
        && pos.y < button.y + button.height && pos.y > button.y;
}

function handleMove() {

    if (abs(_touchEndX - _touchStartX) > 50) {
        if (_touchEndX < _touchStartX) {
            _snake.direction(-1, 0);
        } else {
            _snake.direction(1, 0);
        }
    }

    if (abs(_touchEndY - _touchStartY) > 50) {
        if (_touchEndY < _touchStartY) {
            _snake.direction(0, -1);
        } else {
            _snake.direction(0, 1);
        }
    }
}

function abs(number) {
    if (number < 0) {
        return -number;
    } else {
        return number;
    }
}
