const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const gridSize = 20;  // Size of snake segments and food
const rows = canvas.height / gridSize;
const cols = canvas.width / gridSize;

let snake = [{ x: 10, y: 10 }];  // Snake body (starting point)
let food = { x: 15, y: 15 };     // Food position
let direction = { x: 0, y: 0 };  // Snake movement direction (initially stopped)
let score = 0;
let gameSpeed = 200;  // Speed in milliseconds (higher is slower)

// Game loop: This will update the game every "gameSpeed" milliseconds
function gameLoop() {
    moveSnake();
    checkCollisions();
    drawGame();
    setTimeout(gameLoop, gameSpeed);
}

// Draw the game elements (snake, food, score)
function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);  // Clear the canvas

    // Draw the snake
    snake.forEach(segment => {
        ctx.fillStyle = "green";
        ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
    });

    // Draw the food
    ctx.fillStyle = "red";
    ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);

    // Update the score
    document.getElementById("score").textContent = "Score: " + score;
}

// Move the snake by adding a new head and removing the tail
function moveSnake() {
    const newHead = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

    // Add the new head to the front of the snake
    snake.unshift(newHead);

    // Check if the snake eats the food
    if (newHead.x === food.x && newHead.y === food.y) {
        score++;  // Increase score
        generateFood();  // Generate new food
    } else {
        // Remove the last segment of the snake (to keep the snake length same unless it eats food)
        snake.pop();
    }
}

// Generate new food at a random position
function generateFood() {
    food.x = Math.floor(Math.random() * cols);
    food.y = Math.floor(Math.random() * rows);
}

// Check for collisions with walls or itself
function checkCollisions() {
    const head = snake[0];

    // Check if the snake hits the walls
    if (head.x < 0 || head.x >= cols || head.y < 0 || head.y >= rows) {
        resetGame();  // Game over
    }

    // Check if the snake hits itself
    for (let i = 1; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            resetGame();  // Game over
        }
    }
}

// Reset the game if there's a collision
function resetGame() {
    alert("Game Over! Your score was: " + score);
    snake = [{ x: 10, y: 10 }];
    direction = { x: 0, y: 0 };  // Stop the snake
    score = 0;  // Reset score
    generateFood();
}

// Handle user input to control the snake
document.addEventListener("keydown", (event) => {
    switch (event.key) {
        case "ArrowUp":
            if (direction.y === 0) direction = { x: 0, y: -1 };
            break;
        case "ArrowDown":
            if (direction.y === 0) direction = { x: 0, y: 1 };
            break;
        case "ArrowLeft":
            if (direction.x === 0) direction = { x: -1, y: 0 };
            break;
        case "ArrowRight":
            if (direction.x === 0) direction = { x: 1, y: 0 };
            break;
    }
});

// Start the game loop
generateFood();  // Place the first food item
gameLoop();  // Start the game loop
