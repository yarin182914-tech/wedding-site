function showTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById(tabId).classList.add('active');

    document.querySelectorAll('.tab-link').forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + tabId);
    });

    document.querySelector('nav').classList.remove('open');
    document.querySelector('.menu-toggle').setAttribute('aria-expanded', 'false');
}

function toggleMenu() {
    const nav = document.querySelector('nav');
    const isOpen = nav.classList.toggle('open');
    document.querySelector('.menu-toggle').setAttribute('aria-expanded', isOpen);
}

document.addEventListener('DOMContentLoaded', () => showTab('timeline'));

const bgSlides = document.querySelectorAll('.bg-slide');
if (bgSlides.length > 1) {
    let bgIndex = 0;
    setInterval(() => {
        bgSlides[bgIndex].classList.remove('active');
        bgIndex = (bgIndex + 1) % bgSlides.length;
        bgSlides[bgIndex].classList.add('active');
    }, 5000);
}

// כתובת המייל שמקבלת את ההרשמות של פנויים/ות - אפשר להחליף בקלות
const SINGLES_EMAIL = 'yarin182914@gmail.com';

function submitSingle(event) {
    event.preventDefault();
    const name = document.getElementById('single-name').value.trim();
    const contact = document.getElementById('single-contact').value.trim();
    const note = document.getElementById('single-note').value.trim();

    const subject = `פנוי/ה בחתונה: ${name}`;
    const body =
        `שם: ${name}\n` +
        `יצירת קשר: ${contact}\n` +
        `קצת עליי: ${note || '-'}`;

    const mailto = `mailto:${SINGLES_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;

    document.getElementById('singles-form').reset();
    return false;
}

const blessingsForm = document.getElementById('blessings-form');
if (blessingsForm) {
    blessingsForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const data = new FormData(blessingsForm);
        fetch('/', { method: 'POST', body: data })
            .then(() => {
                blessingsForm.hidden = true;
                document.getElementById('blessings-thanks').hidden = false;
            })
            .catch(() => alert('משהו השתבש בשליחה, נסו שוב בעוד רגע.'));
    });
}

const WEDDING_DATE = new Date('2027-06-04T18:00:00+03:00');

function updateCountdown() {
    const diff = WEDDING_DATE.getTime() - new Date().getTime();
    if (diff <= 0) {
        return;
    }
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);

    document.getElementById('cd-days').textContent = days;
    document.getElementById('cd-hours').textContent = String(hours).padStart(2, '0');
    document.getElementById('cd-minutes').textContent = String(minutes).padStart(2, '0');
    document.getElementById('cd-seconds').textContent = String(seconds).padStart(2, '0');
}

if (document.getElementById('countdown')) {
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

function toggleBingo(cell) {
    const cells = Array.from(document.querySelectorAll('.bingo-cell'));
    const key = 'bingo-' + cells.indexOf(cell);
    const checked = cell.classList.toggle('checked');
    localStorage.setItem(key, checked ? '1' : '0');
}

document.querySelectorAll('.bingo-cell').forEach((cell, index) => {
    if (localStorage.getItem('bingo-' + index) === '1') {
        cell.classList.add('checked');
    }
});
