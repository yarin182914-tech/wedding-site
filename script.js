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
