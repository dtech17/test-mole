const holes = document.querySelectorAll('.hole');
const scoreDisplay = document.getElementById('score');
const winOverlay = document.getElementById('winOverlay');
const winMessage = document.querySelector('.win-message p');
const nextLevelButton = document.getElementById('nextLevelButton');
const restartLevelButton = document.getElementById('restartLevelButton');

let score = 0;
let level = 1;
let moleInterval;

// Initial timings
let moleTime = 800; // Mole appears every 800ms
let moleActiveTime = 800; // Mole stays active for 800ms

const maxMoles = 8; // Score needed to complete a level

function randomHole() {
    return holes[Math.floor(Math.random() * holes.length)];
}

function showMole() {
    const currentHole = randomHole();
    currentHole.classList.add('active');
    setTimeout(() => currentHole.classList.remove('active'), moleActiveTime);
}

function updateScore() {
    score++;
    scoreDisplay.textContent = `Score: ${score} | Level: ${level}`;
    if (score >= maxMoles) {
        endLevel();
    }
}

function whackMole(event) {
    if (event.target.classList.contains('active')) updateScore();
}

function startGame() {
    score = 0;
    level = 1;
    scoreDisplay.textContent = `Score: ${score} | Level: ${level}`;
    winOverlay.style.display = 'none'; // Hide the win overlay
    moleInterval = setInterval(showMole, moleTime);
    holes.forEach(hole => hole.addEventListener('click', whackMole));
}

function startLevel() {
    score = 0;
    scoreDisplay.textContent = `Score: ${score} | Level: ${level}`;
    winOverlay.style.display = 'none'; // Hide the win overlay
    moleInterval = setInterval(showMole, moleTime);
    holes.forEach(hole => hole.addEventListener('click', whackMole));
}

function endLevel() {
    clearInterval(moleInterval);
    winOverlay.style.display = 'flex'; // Show the full-page win overlay
    holes.forEach(hole => hole.removeEventListener('click', whackMole));
    if (level < 50) {
        winMessage.textContent = `Level ${level} Complete!`;
        winOverlay.appendChild(nextLevelButton); // Show "Next Level" button
        winOverlay.appendChild(restartLevelButton); // Show "Restart Level" button
    } else {
        endGame();
    }
}

function nextLevel() {
    level++;
    if (level > 50) {
        endGame();
    } else {
        // Increase difficulty more gradually
        moleTime = Math.max(600, moleTime - 20); // Decrease moleTime by 20ms per level
        moleActiveTime = Math.max(400, moleActiveTime - 8); // Decrease moleActiveTime by 8ms per level
        startLevel();
    }
}

function restartLevel() {
    // Restart the current level
    startLevel();
}

function endGame() {
    clearInterval(moleInterval);
    winOverlay.style.display = 'flex'; // Show the full-page win overlay
    winMessage.textContent = 'Congratulations! You completed all levels!';
    holes.forEach(hole => hole.removeEventListener('click', whackMole));
}

nextLevelButton.addEventListener('click', nextLevel);
restartLevelButton.addEventListener('click', restartLevel);

startGame();
