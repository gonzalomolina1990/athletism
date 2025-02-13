let speed = 0;
let player = document.getElementById("player");
let rivals = [
    { element: document.getElementById("rival1"), speed: Math.random() * 2 + 1 },
    { element: document.getElementById("rival2"), speed: Math.random() * 2 + 1 },
    { element: document.getElementById("rival3"), speed: Math.random() * 2 + 1 }
];
let level = 1;
let raceStarted = false;
let countdown = 3;
let finishLine = 800;

const clickButton = document.getElementById("click-button");
clickButton.addEventListener("click", () => {
    if (raceStarted) {
        speed += 2;
    }
});

function startCountdown() {
    clickButton.disabled = true;
    let countdownInterval = setInterval(() => {
        clickButton.innerText = countdown > 0 ? countdown : "¡Corre!";
        if (countdown === 0) {
            clearInterval(countdownInterval);
            raceStarted = true;
            clickButton.disabled = false;
        }
        countdown--;
    }, 1000);
}

function resetRace() {
    speed = 0;
    player.style.left = "0px";
    rivals.forEach(rival => {
        rival.element.style.left = "0px";
        rival.speed = Math.random() * 2 + level;
    });
    countdown = 3;
    raceStarted = false;
    startCountdown();
}

function updateGame() {
    if (raceStarted) {
        speed *= 0.98; // Reduce la velocidad con el tiempo
        player.style.left = Math.min(parseFloat(player.style.left) + speed, finishLine) + "px";
        
        rivals.forEach(rival => {
            rival.speed *= 0.99;
            rival.element.style.left = Math.min(parseFloat(rival.element.style.left) + rival.speed, finishLine) + "px";
        });
        
        if (parseFloat(player.style.left) >= finishLine) {
            alert("¡Ganaste! La dificultad aumentará.");
            level++;
            resetRace();
            return;
        }
        
        if (rivals.some(rival => parseFloat(rival.element.style.left) >= finishLine)) {
            alert("Perdiste. Inténtalo de nuevo.");
            resetRace();
            return;
        }
    }
    
    requestAnimationFrame(updateGame);
}

startCountdown();
updateGame();
