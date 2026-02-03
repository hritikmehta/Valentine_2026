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

function checkIdentity() {
    const name = document.getElementById('name-input').value.trim();
    const pass = document.getElementById('pass-input').value.trim();
    const errorMsg = document.getElementById('login-error');
    const deniedGif = document.getElementById('denied-gif');

    if (name.toLowerCase() === "tanvi" && pass === PASSWORD) {
        document.getElementById('login-section').classList.add('hidden');
        document.getElementById('proposal-section').classList.remove('hidden');
        createHearts();
        updateDayNav();
    } else {
        errorMsg.innerText = "Access denied 😜 This is only for Tanvi!";
        errorMsg.classList.remove('hidden');
        deniedGif.classList.remove('hidden');
    }
}

// Wait for DOM
window.addEventListener('DOMContentLoaded', () => {
    const yesBtn = document.getElementById('yes-btn');
    const noBtn = document.getElementById('no-btn');
    const gifDisplay = document.getElementById('gif-display');
    const msgArea = document.getElementById('message-area');
    const textarea = document.getElementById('day-message');
    const saveBtn = document.getElementById('save-message');
    const dayNav = document.getElementById('day-nav');
    const btnContainer = document.getElementById('btn-container');

    // Cursor-following YES button (move & expand toward cursor direction)
    document.addEventListener('mousemove', (e) => {
        const rect = yesBtn.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;
        const maxMove = 120;
        const moveX = Math.max(Math.min(dx * 0.12, maxMove), -maxMove);
        const moveY = Math.max(Math.min(dy * 0.12, maxMove), -maxMove);
        const maxDist = Math.hypot(window.innerWidth/2, window.innerHeight/2);
        const dist = Math.hypot(dx, dy);
        const sx = 1 + Math.min(Math.abs(dx)/maxDist * 2.5, 0.9);
        const sy = 1 + Math.min(Math.abs(dy)/maxDist * 1.5, 0.6);
        yesBtn.style.transform = `translate(${moveX}px, ${moveY}px) scale(${sx}, ${sy})`;
    });

    // NO button smaller jumps
    noBtn.addEventListener('mouseover', () => {
        const rect = noBtn.getBoundingClientRect();
        const width = window.innerWidth - rect.width - 20;
        const height = window.innerHeight - rect.height - 20;
        const offsetX = (Math.random() * 300) - 150; // -150..150
        const offsetY = (Math.random() * 200) - 100; // -100..100
        let left = rect.left + offsetX;
        let top = rect.top + offsetY;
        left = Math.max(10, Math.min(left, width));
        top = Math.max(10, Math.min(top, height));
        noBtn.style.position = 'absolute';
        noBtn.style.left = left + 'px';
        noBtn.style.top = top + 'px';
    });

    // YES click: show day content or gallery
    yesBtn.addEventListener('click', () => {
        if (currentDayIndex < valentineDays.length) {
            const data = valentineDays[currentDayIndex];
            document.getElementById('proposal-text').innerText = data.day + ": " + data.message;
            gifDisplay.innerHTML = `<img src="${data.gif}" loading="lazy" style="width:100%; border-radius:15px; margin-top:15px;">`;
            // load saved message if any
            const saved = localStorage.getItem(`msg-${currentDayIndex}`) || '';
            textarea.value = saved;
            msgArea.classList.remove('hidden');
            triggerSparkles();
            currentDayIndex++;
            updateDayNav();
        } else {
            // final gallery screen
            document.getElementById('proposal-section').classList.add('hidden');
            document.getElementById('gallery-section').classList.remove('hidden');
            loadGallery();
            // hide interactive controls
            btnContainer.classList.add('hidden');
            msgArea.classList.add('hidden');
            dayNav.classList.add('hidden');
        }
    });

    // Day nav clicks: only allow opening if dayIndex <= currentDayIndex (unlocked)
    dayNav.addEventListener('click', (e) => {
        const btn = e.target.closest('button[data-day]');
        if (!btn) return;
        const dayIndex = Number(btn.getAttribute('data-day'));
        if (dayIndex > currentDayIndex) {
            alert("Hritik has a surprise for you!");
            return;
        }
        // Open that day's content
        const data = valentineDays[dayIndex];
        document.getElementById('proposal-text').innerText = data.day + ": " + data.message;
        gifDisplay.innerHTML = `<img src="${data.gif}" loading="lazy" style="width:100%; border-radius:15px; margin-top:15px;">`;
        const saved = localStorage.getItem(`msg-${dayIndex}`) || '';
        textarea.value = saved;
        msgArea.classList.remove('hidden');
    });

    // Save message
    saveBtn.addEventListener('click', () => {
        // find visible day from proposal-text; crude parse to detect current shown day index
        const left = document.getElementById('proposal-text').innerText || '';
        const match = valentineDays.findIndex(d => left.startsWith(d.day));
        if (match === -1) {
            alert('No day selected');
            return;
        }
        localStorage.setItem(`msg-${match}`, textarea.value);
        alert('Message saved');
    });

    // initialise dayNav visual state
    function updateDayNav() {
        const buttons = dayNav.querySelectorAll('button[data-day]');
        buttons.forEach(b => {
            const di = Number(b.getAttribute('data-day'));
            if (di <= currentDayIndex - 1) {
                b.disabled = false;
                b.style.opacity = 1;
            } else {
                b.disabled = false; // allow clicking; will show surprise if too early
                b.style.opacity = 0.6;
            }
        });
    }

    updateDayNav();
});

// 5. Gallery Loader
function loadGallery() {
    const leftCol = document.getElementById('col-left');
    const rightCol = document.getElementById('col-right');
    leftCol.innerHTML = '';
    rightCol.innerHTML = '';
    // Use any images placed in assets/images; create elements for 10 images
    for (let i = 1; i <= 10; i++) {
        const img = document.createElement('img');
        img.src = `assets/images/img${i}.png`;
        img.loading = "lazy";
        img.alt = `memory-${i}`;
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
    document.body.style.backgroundColor = "#ffccd5";
    setTimeout(() => { document.body.style.backgroundColor = "#fff0f3"; }, 200);
}
