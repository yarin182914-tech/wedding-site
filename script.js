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

const QUIZ = [
    {
        q: 'מה מאיה הכי אוהבת להכין לירין לאכול?',
        options: [
            'חחחח, איזה "להכין"? היא לא נכנסת למטבח בכלל',
            'שניצל ופסטה',
            'לחם מחמצת עם סלט טונה',
            'שקשוקה עם ביצים רכות'
        ],
        correct: 0
    },
    {
        q: 'איך מאיה וירין הכירו?',
        options: [
            'בבית הספר לטיסה - היא הייתה חונכת והוא היה חניך',
            'בבית ספר, היא הייתה דלוקה עליו והתחילה איתו בבית המרזח',
            'במכינה - הוא מיין אותה למכינה, למחזור תחתיו, והיא "עשתה מה שצריך" כדי להתקבל',
            'בשיעור פילאטיס - הוא הגיע לאימון ניסיון והיא דאגה לתקן אותו לא מעט',
            'אחות של ירין ואח של מאיה חברים הכי טובים והם שידכו ביניהם'
        ],
        correct: 0
    },
    {
        q: 'מה המקצוע של מאיה?',
        options: ['מדריכת פילאטיס', 'מדריכת ספינינג', 'מדריכת אקרויוגה', 'מדריכת ג\'יו ג\'יטסו ברזילאי'],
        correct: 0
    },
    {
        q: 'מה ירין עושה למחייתו?',
        options: ['מכין לחמים ומאפים', 'מצלם ועורך וידאו', 'משרת בצבא השם', 'מטפח ומאכיל את מאיה שמביאה את כל הכסף'],
        correct: 3
    }
];

let quizIndex = 0;
let quizScore = 0;

function shuffleArray(arr) {
    const a = arr.slice();
    for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
}

function renderQuizQuestion() {
    const q = QUIZ[quizIndex];
    const shuffled = shuffleArray(q.options.map((text, i) => ({ text, isCorrect: i === q.correct })));

    document.getElementById('quiz-question').textContent = `שאלה ${quizIndex + 1} מתוך ${QUIZ.length}: ${q.q}`;
    const feedbackEl = document.getElementById('quiz-feedback');
    feedbackEl.hidden = true;
    feedbackEl.classList.remove('is-correct', 'is-wrong');
    document.getElementById('quiz-next').hidden = true;

    const optionsEl = document.getElementById('quiz-options');
    optionsEl.innerHTML = '';
    shuffled.forEach(opt => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'quiz-option';
        btn.textContent = opt.text;
        btn.addEventListener('click', () => answerQuiz(btn, opt.isCorrect, shuffled, optionsEl));
        optionsEl.appendChild(btn);
    });
}

function answerQuiz(button, isCorrect, shuffled, optionsEl) {
    const correctText = shuffled.find(opt => opt.isCorrect).text;

    Array.from(optionsEl.children).forEach((btn, i) => {
        btn.disabled = true;
        if (shuffled[i].isCorrect) {
            btn.classList.add('correct');
        }
    });

    const feedbackEl = document.getElementById('quiz-feedback');
    feedbackEl.hidden = false;
    if (isCorrect) {
        quizScore++;
        feedbackEl.textContent = '✅ נכון!';
        feedbackEl.classList.add('is-correct');
    } else {
        button.classList.add('wrong');
        feedbackEl.textContent = `❌ לא נכון. התשובה הנכונה: ${correctText}`;
        feedbackEl.classList.add('is-wrong');
    }

    document.getElementById('quiz-next').hidden = false;
}

function nextQuizQuestion() {
    quizIndex++;
    if (quizIndex < QUIZ.length) {
        renderQuizQuestion();
    } else {
        showQuizResult();
    }
}

function showQuizResult() {
    document.getElementById('quiz-question').hidden = true;
    document.getElementById('quiz-options').hidden = true;
    document.getElementById('quiz-result').hidden = false;
    document.getElementById('quiz-score').textContent = `כל הכבוד! ענית נכון על ${quizScore} מתוך ${QUIZ.length} שאלות.`;
}

function startQuiz() {
    quizIndex = 0;
    quizScore = 0;
    document.getElementById('quiz-question').hidden = false;
    document.getElementById('quiz-options').hidden = false;
    document.getElementById('quiz-result').hidden = true;
    renderQuizQuestion();
}

if (document.getElementById('quiz')) {
    startQuiz();
}

document.querySelectorAll('.bingo-cell').forEach((cell, index) => {
    if (localStorage.getItem('bingo-' + index) === '1') {
        cell.classList.add('checked');
    }
});
