const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');
const messageDisplay = document.getElementById('message');

const gridSize = 20;
let snake = [{ x: 10 * gridSize, y: 10 * gridSize }];
let food = { x: 15 * gridSize, y: 15 * gridSize };
let dx = 1; // Change in x (1 = right, -1 = left, 0 = no change)
let dy = 0; // Change in y (1 = down, -1 = up, 0 = no change)
let score = 0;
let gameInterval;
const gameSpeed = 150; // milliseconds per frame
const snakeColor = 'lime';
const foodColor = 'red';

function getRandomPosition() {
    return Math.floor(Math.random() * canvas.width / gridSize) * gridSize;
}

function generateFood() {
    food.x = getRandomPosition();
    food.y = getRandomPosition();
    // Ensure food doesn't spawn on the snake
    snake.forEach(segment => {
        if (segment.x === food.x && segment.y === food.y) {
            generateFood();
        }
    });
}

function draw() {
    ctx.fillStyle = '#000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw food
    ctx.fillStyle = foodColor;
    ctx.fillRect(food.x, food.y, gridSize, gridSize);

    // Draw snake
    snake.forEach((segment, index) => {
        ctx.fillStyle = snakeColor;
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
        ctx.strokeStyle = 'black';
        ctx.strokeRect(segment.x, segment.y, gridSize, gridSize);
    });
}

function update() {
    const head = { x: snake[0].x + dx * gridSize, y: snake[0].y + dy * gridSize };
    snake.unshift(head);

    // Eat food
    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreDisplay.textContent = score;
        generateFood();
    } else {
        snake.pop(); // Remove the last segment
    }

    checkCollision();
}

function checkCollision() {
    const head = snake[0];
    // Hit walls
    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
        gameOver();
        return;
    }

    // Hit itself
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            gameOver();
            return;
        }
    }
}

function gameOver() {
    clearInterval(gameInterval);
    messageDisplay.textContent = `Game Over! Your score: ${score}`;
}

function changeDirection(event) {
    if (event.key === 'ArrowUp' && dy === 0) {
        dx = 0;
        dy = -1;
    } else if (event.key === 'ArrowDown' && dy === 0) {
        dx = 0;
        dy = 1;
    } else if (event.key === 'ArrowLeft' && dx === 0) {
        dx = -1;
        dy = 0;
    } else if (event.key === 'ArrowRight' && dx === 0) {
        dx = 1;
        dy = 0;
    }
}

document.addEventListener('keydown', changeDirection);

function startGame() {
    snake = [{ x: 10 * gridSize, y: 10 * gridSize }];
    food = { x: 15 * gridSize, y: 15 * gridSize };
    dx = 1;
    dy = 0;
    score = 0;
    scoreDisplay.textContent = score;
    messageDisplay.textContent = '';
    clearInterval(gameInterval);
    gameInterval = setInterval(() => {
        update();
        draw();
    }, gameSpeed);
}

startGame();