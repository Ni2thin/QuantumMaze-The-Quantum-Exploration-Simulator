// Get canvas and context
const canvas = document.getElementById("quantum-canvas");
const ctx = canvas.getContext("2d");

// Set canvas size
canvas.width = window.innerWidth * 0.8;
canvas.height = window.innerHeight * 0.7;

let particles = [];
let particleCount = 50;
let quantumState = "particle"; // Possible states: "particle" or "wave"
let isPaused = false;
let entangledParticles = [];

// Maze walls
let mazeWalls = [
    { x: 200, y: 150, width: 400, height: 20 },
    { x: 300, y: 300, width: 20, height: 150 },
];

// Initialize particles
function createParticles(count) {
    particles = [];
    entangledParticles = []; // Reset entanglement on new particle creation
    for (let i = 0; i < count; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            dx: Math.random() * 2 - 1,
            dy: Math.random() * 2 - 1,
            radius: 5,
            color: "white",
            isEntangled: false,
        });
    }
}
createParticles(particleCount);

// Draw maze walls
function drawWalls() {
    ctx.fillStyle = "rgba(255, 255, 255, 0.3)";
    mazeWalls.forEach(wall => {
        ctx.fillRect(wall.x, wall.y, wall.width, wall.height);
    });
}

// Check collision with maze walls
function checkWallCollision(p) {
    mazeWalls.forEach(wall => {
        if (
            p.x + p.radius > wall.x &&
            p.x - p.radius < wall.x + wall.width &&
            p.y + p.radius > wall.y &&
            p.y - p.radius < wall.height + wall.y
        ) {
            p.dx *= -1;
            p.dy *= -1;
        }
    });
}

// Quantum tunneling effect
function quantumTunneling(p) {
    if (Math.random() < 0.01) { // Low chance of tunneling
        p.x = Math.random() * canvas.width;
        p.y = Math.random() * canvas.height;
    }
}

// Draw particles
function drawParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawWalls();

    particles.forEach(p => {
        if (!isPaused) {
            p.x += p.dx;
            p.y += p.dy;
            checkWallCollision(p);
            quantumTunneling(p);
        }

        ctx.beginPath();
        if (quantumState === "particle") {
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
        } else {
            ctx.arc(p.x, p.y, p.radius * 1.5, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(0, 255, 255, 0.4)`;
        }
        ctx.fill();

        // Draw entanglement links
        if (p.isEntangled) {
            entangledParticles.forEach(other => {
                if (other !== p) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(other.x, other.y);
                    ctx.strokeStyle = "rgba(255, 255, 0, 0.5)";
                    ctx.lineWidth = 2;
                    ctx.stroke();
                }
            });
        }
    });
}

// Update particles
function updateParticles() {
    drawParticles();
    requestAnimationFrame(updateParticles);
}
updateParticles();

// Toggle quantum state
document.getElementById("toggle-state").addEventListener("click", () => {
    quantumState = quantumState === "particle" ? "wave" : "particle";
});

// Entangle particles
document.getElementById("entangle-particles").addEventListener("click", () => {
    entangledParticles = []; // Reset previous entangled particles
    particles.forEach(p => {
        // Randomly decide if this particle should be entangled
        if (Math.random() > 0.5) {
            p.isEntangled = true;
            entangledParticles.push(p); // Add to entangled group
        } else {
            p.isEntangled = false;
        }
    });
});

// Pause or play
document.getElementById("pause-play").addEventListener("click", () => {
    isPaused = !isPaused;
});

// Adjust particle count
document.getElementById("particle-count").addEventListener("input", (e) => {
    particleCount = e.target.value;
    createParticles(particleCount);
});

// Save canvas as image
document.getElementById("save-image").addEventListener("click", () => {
    const link = document.createElement("a");
    link.download = "quantum_maze.png";
    link.href = canvas.toDataURL();
    link.click();
});

// Background music controls
const music = document.getElementById("background-music");
const musicButton = document.getElementById("toggle-music");
let isMusicPlaying = false;

musicButton.addEventListener("click", () => {
    if (isMusicPlaying) {
        music.pause();
        musicButton.textContent = "Music: Off";
    } else {
        music.play();
        musicButton.textContent = "Music: On";
    }
    isMusicPlaying = !isMusicPlaying;
});
