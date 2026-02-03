const PASSWORD = "xyzzz";
const valentineDays = [
    { day: "Rose Day 🌹", message: "A rose for the prettiest girl in my world", gif: "assets/gifs/rose.gif" },
    { day: "Propose Day 💍", message: "I choose you today and always", gif: "assets/gifs/propose.gif" },
    { day: "Chocolate Day 🍫", message: "You're sweeter than chocolate", gif: "assets/gifs/chocolate.gif" },
    { day: "Teddy Day 🧸", message: "Hug this teddy until I hug you", gif: "assets/gifs/teddy.gif" },
    { day: "Promise Day 🤝", message: "I promise to annoy you forever", gif: "assets/gifs/promise.gif" },
    { day: "Hug Day 🤗", message: "Sending you the warmest virtual hug", gif: "assets/gifs/hug.gif" },
    { day: "Kiss Day 😘", message: "Flying kisses just for you", gif: "assets/gifs/kiss.gif" },
    { day: "Valentine’s Day ❤️", message: "Will you be my forever Valentine?", gif: "assets/gifs/valentine.gif" }
];

let currentDayIndex = 0;

// 1. Identity Check Logic
function checkIdentity() {
    const name = document.getElementById('name-input').value.trim();
    const pass = document.getElementById('pass-input').value.trim();
    const errorMsg = document.getElementById('login-error');
    const deniedGif = document.getElementById('denied-gif');

    if (name.toLowerCase() === "tanvi" && pass === PASSWORD) {
        document.getElementById('login-section').classList.add('hidden');
        document.getElementById('proposal-section').classList.remove('hidden');
        createHearts(); // Start background animation
    } else {
        errorMsg.innerText = "Access denied 😜 This is only for Tanvi!";
        errorMsg.classList.remove('hidden');
        deniedGif.classList.remove('hidden');
    }
}

// 2. Button Following Cursor Logic (YES Button)
const yesBtn = document.getElementById('yes-btn');
document.addEventListener('mousemove', (e) => {
    const x = (e.clientX - window.innerWidth / 2) / 25;
    const y = (e.clientY - window.innerHeight / 2) / 25;
    yesBtn.style.transform = `translate(${x}px, ${y}px)`;
});

// 3. NO Button Running Away (Optional but funny)
const noBtn = document.getElementById('no-btn');
noBtn.addEventListener('mouseover', () => {
    const x = Math.random() * (window.innerWidth - 100);
    const y = Math.random() * (window.innerHeight - 100);
    noBtn.style.position = 'absolute';
    noBtn.style.left = x + 'px';
    noBtn.style.top = y + 'px';
});

// 4. Content Cycling
yesBtn.addEventListener('click', () => {
    if (currentDayIndex < valentineDays.length) {
        const data = valentineDays[currentDayIndex];
        document.getElementById('proposal-text').innerText = data.day + ": " + data.message;
        
        const gifContainer = document.getElementById('gif-display');
        gifContainer.innerHTML = `<img src="${data.gif}" loading="lazy" style="width:100%; border-radius:15px; margin-top:15px;">`;
        
        triggerSparkles();
        currentDayIndex++;
    } else {
        // Switch to Final Gallery
        document.getElementById('proposal-section').classList.add('hidden');
        document.getElementById('gallery-section').classList.remove('hidden');
        loadGallery();
    }
});

// 5. Gallery Loader
function loadGallery() {
    const leftCol = document.getElementById('col-left');
    const rightCol = document.getElementById('col-right');
    // Placeholders for your 10-15 images
    for (let i = 1; i <= 10; i++) {
        const img = document.createElement('img');
        img.src = `assets/images/img${i}.png`;
        img.loading = "lazy";
        if (i % 2 === 0) leftCol.appendChild(img);
        else rightCol.appendChild(img);
    }
}

// Decorations
function createHearts() {
    const container = document.getElementById('hearts-container');
    setInterval(() => {
        const heart = document.createElement('div');
        heart.classList.add('heart');
        heart.innerHTML = '❤️';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.animationDuration = (Math.random() * 3 + 2) + 's';
        container.appendChild(heart);
        setTimeout(() => heart.remove(), 5000);
    }, 300);
}

function triggerSparkles() {
    // Logic for momentary sparkle effect
    document.body.style.backgroundColor = "#ffccd5";
    setTimeout(() => { document.body.style.backgroundColor = "#fff0f3"; }, 200);
}
