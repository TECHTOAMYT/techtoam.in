// 1. MAGNETIC CURSOR
const cursorDot = document.createElement('div');
const cursorOutline = document.createElement('div');
cursorDot.className = 'cursor-dot'; cursorOutline.className = 'cursor-outline';
document.body.appendChild(cursorDot); document.body.appendChild(cursorOutline);

window.addEventListener('mousemove', (e) => {
    const posX = e.clientX; const posY = e.clientY;
    cursorDot.style.left = `${posX}px`; cursorDot.style.top = `${posY}px`;
    cursorOutline.animate({ left: `${posX}px`, top: `${posY}px` }, { duration: 500, fill: "forwards" });
});

// 2. 3D TILT EFFECT
document.querySelectorAll('.glass-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left; const y = e.clientY - rect.top;
        const xRotation = -((y - rect.height/2) / 20);
        const yRotation = (x - rect.width/2) / 20;
        card.style.transform = `perspective(1000px) scale(1.02) rotateX(${xRotation}deg) rotateY(${yRotation}deg)`;
        card.style.border = '1px solid var(--accent-color)';
    });
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) scale(1) rotateX(0) rotateY(0)';
        card.style.border = '1px solid var(--border-color)';
    });
});

// 3. SECURITY & LOGIN
function verifyHuman() {
    const box = document.querySelector('.checkbox-spin');
    const label = document.getElementById('security-label');
    if(box.classList.contains('checked')) return;
    box.classList.add('loading');
    setTimeout(() => {
        box.classList.remove('loading'); box.classList.add('checked');
        label.innerText = "Verified Human"; label.style.color = "#00ffcc";
        alert("Security Clearance: GRANTED. Admin Access Unlocked.");
    }, 1500);
}

const loginBtn = document.getElementById('login-btn');
if (loginBtn) {
    loginBtn.addEventListener('click', () => {
        const password = prompt("ENTER ADMIN KEY:");
        if(password === "tech2026") alert("Welcome back, Ashbin.");
        else alert("Access Denied.");
    });
}

// 4. WHATSAPP STORE LOGIC
const buyButtons = document.querySelectorAll('.buy-btn');
const myPhoneNumber = "91XXXXXXXXXX"; // REPLACE WITH YOUR NUMBER
buyButtons.forEach(button => {
    button.addEventListener('click', () => {
        const product = button.getAttribute('data-product');
        const url = `https://wa.me/${myPhoneNumber}?text=${encodeURIComponent(`Hello, I want to buy: ${product}`)}`;
        window.open(url, '_blank');
    });
});

// 5. THEME & SCROLL
const themeBtn = document.getElementById('theme-toggle');
if(themeBtn) {
    themeBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
    });
}
if (localStorage.getItem('theme') === 'light') document.body.classList.add('light-theme');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if(entry.isIntersecting) entry.target.classList.add('active'); });
});
document.querySelectorAll('.glass-card').forEach(el => { el.classList.add('reveal'); observer.observe(el); });
