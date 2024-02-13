// Define canvas
const canvas = document.getElementById('space');
const context = canvas.getContext('2d');

// Set canvas size to window size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Array to hold stars
let stars = [];

// Function to initialize stars
function initStars() {
    for (let i = 0; i < 1000; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        let radius = Math.random() * 1.5;
        let opacity = Math.random();

        stars.push({
            x: x,
            y: y,
            radius: radius,
            opacity: opacity
        });
    }
}

// Function to draw stars
function drawStars() {
    context.fillStyle = "#FFF";
    for (let i = 0; i < stars.length; i++) {
        let star = stars[i];
        context.beginPath();
        context.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        context.closePath();
        context.globalAlpha = star.opacity;
        context.fill();
    }
}

// Function to update stars position
function updateStars() {
    for (let i = 0; i < stars.length; i++) {
        let star = stars[i];
        star.x -= 0.5;
        if (star.x < 0) {
            star.x = canvas.width;
        }
    }
}

// Function to create parallax effect
function parallax(event) {
    canvas.style.transform = `translateX(${event.clientX / 100}px) translateY(${event.clientY / 100}px)`;
}

// Function to generate twinkling effect
function twinklingStars() {
    for (let i = 0; i < stars.length; i++) {
        if (Math.random() > 0.99) {
            stars[i].opacity = Math.random();
        }
    }
}

// Animation loop
function animate() {
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawStars();
    updateStars();
    twinklingStars();
    requestAnimationFrame(animate);
}

// Initialize stars and start animation
initStars();
animate();

// Event listener for mouse move to trigger parallax effect
document.addEventListener('mousemove', parallax);
