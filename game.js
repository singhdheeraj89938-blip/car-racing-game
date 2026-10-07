const player = document.getElementById("player");
const enemies = document.querySelectorAll(".enemy");

const scoreText = document.getElementById("score");
const finalScore = document.getElementById("finalScore");
const gameOverScreen = document.getElementById("gameOver");

let playerX = 172;
let score = 0;
let gameRunning = true;

let enemyPositions = [
    { element: enemies[0], x: 70, y: -120, speed: 5 },
    { element: enemies[1], x: 270, y: -350, speed: 6 }
];

document.addEventListener("keydown", function(event) {

    if (!gameRunning) return;

    if (event.key === "ArrowLeft") {
        playerX -= 25;
    }

    if (event.key === "ArrowRight") {
        playerX += 25;
    }

    // Keep car inside road
    if (playerX < 15) {
        playerX = 15;
    }

    if (playerX > 330) {
        playerX = 330;
    }

    player.style.left = playerX + "px";
});


function gameLoop() {

    if (!gameRunning) return;

    enemyPositions.forEach(enemy => {

        enemy.y += enemy.speed;

        // Enemy reached bottom
        if (enemy.y > 700) {

            enemy.y = -150 - Math.random() * 300;

            enemy.x = Math.floor(Math.random() * 6) * 55 + 20;

            enemy.speed += 0.1;

            score++;
            scoreText.textContent = score;
        }

        enemy.element.style.top = enemy.y + "px";
        enemy.element.style.left = enemy.x + "px";

        // Collision
        if (isColliding(player, enemy.element)) {
            endGame();
        }
    });

    requestAnimationFrame(gameLoop);
}


function isColliding(a, b) {

    const aRect = a.getBoundingClientRect();
    const bRect = b.getBoundingClientRect();

    return !(
        aRect.bottom < bRect.top ||
        aRect.top > bRect.bottom ||
        aRect.right < bRect.left ||
        aRect.left > bRect.right
    );
}


function endGame() {

    gameRunning = false;

    finalScore.textContent = score;
    gameOverScreen.style.display = "block";
}


function restartGame() {

    location.reload();
}


gameLoop();