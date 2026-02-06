/* ================== KOMENTARZE ================== */
const form = document.getElementById('commentForm');
const list = document.getElementById('commentList');
const textInput = form?.querySelector('[name="text"]');
let currentRating = 5;
const stars = document.querySelectorAll('#starRating .star');

function updateStars(value) {
	stars.forEach((star) => {
		star.classList.toggle('active', Number(star.dataset.value) <= value);
	});
}

stars.forEach((star) => {
	star.addEventListener('click', (e) => {
		e.stopPropagation();
		currentRating = Number(star.dataset.value);
		updateStars(currentRating);
	});
});
updateStars(currentRating);

function renderStars(rating = 5) {
	return '★'.repeat(rating) + '☆'.repeat(5 - rating);
}

function formatDate(date) {
	return new Date(date).toLocaleString('pl-PL');
}

async function loadComments() {
	const res = await fetch('/api/comments', { credentials: 'include' });
	const data = await res.json();

	list.innerHTML = '';
	data.forEach((c) => {
		list.innerHTML += `
			<div class="comment">
				<div style="color:#facc15;font-size:18px;">${renderStars(c.rating)}</div>
				<strong>${c.name}</strong>
				<div style="font-size:12px;color:#94a3b8;">
					Dodano: ${formatDate(c.date)}
				</div>
				${c.text}
			</div>
		`;
	});
}

/* ================== AUTH ================== */
const modal = document.getElementById('authModal');
const modalBox = document.querySelector('.modal-box');

const loginBtn = document.getElementById('loginBtn');
const registerBtn = document.getElementById('registerBtn');
const logoutBtn = document.getElementById('logoutBtn');

const loginBtnMobile = document.getElementById('loginBtnMobile');
const registerBtnMobile = document.getElementById('registerBtnMobile');
const logoutBtnMobile = document.getElementById('logoutBtnMobile');

const switchMode = document.getElementById('switchMode');
const title = document.getElementById('modalTitle');
const submitBtn = document.getElementById('authSubmit');
const userEmailEl = document.getElementById('userEmail');
const userEmailMobile = document.getElementById('userEmailMobile');
const authError = document.getElementById('authError');

const firstNameField = document.getElementById('firstName').closest('.field');
const lastNameField = document.getElementById('lastName').closest('.field');
const password2Field = document.getElementById('password2').closest('.field');
const termsField = document.querySelector('.checkbox');

let mode = 'login';

/* ================== USER MENU ================== */
const userMenuBtn = document.getElementById('userMenuBtn');
const userMenu = document.getElementById('userMenu');

userMenuBtn?.addEventListener('click', (e) => {
	e.stopPropagation();
	userMenu.classList.toggle('hidden');
});

document.addEventListener('click', () => {
	userMenu.classList.add('hidden');
});

userMenu?.addEventListener('click', (e) => e.stopPropagation());

/* ================== HAMBURGER MENU ================== */
const hamburgerBtn = document.getElementById('hamburgerBtn');
const mobileMenu = document.getElementById('mobileMenu');

hamburgerBtn?.addEventListener('click', (e) => {
	e.stopPropagation(); // ⛔ nie zamykaj od razu
	mobileMenu.classList.toggle('hidden');
});

// klik poza menu = zamknij
document.addEventListener('click', () => {
	mobileMenu.classList.add('hidden');
});

// klik w menu = NIE zamykaj
mobileMenu?.addEventListener('click', (e) => {
	e.stopPropagation();
});

/* ================== SESJA ================== */
async function checkAuth() {
	const res = await fetch('/api/me', { credentials: 'include' });

	if (res.ok) {
		const user = await res.json();
		document.querySelectorAll('.auth-only').forEach((el) => el.classList.remove('hidden'));
		document.querySelectorAll('.guest-only').forEach((el) => el.classList.add('hidden'));
		userEmailEl.textContent = user.email;
		userEmailMobile.textContent = user.email;
	} else {
		document.querySelectorAll('.auth-only').forEach((el) => el.classList.add('hidden'));
		document.querySelectorAll('.guest-only').forEach((el) => el.classList.remove('hidden'));
	}

	loadComments();
}

/* ================== MODAL ================== */
function openModal(type) {
	mode = type;

	const isLogin = type === 'login';

	title.textContent = isLogin ? 'Zaloguj się' : 'Załóż konto';
	submitBtn.textContent = isLogin ? 'Zaloguj' : 'Zarejestruj';
	switchMode.textContent = isLogin ? 'Zarejestruj się' : 'Zaloguj się';

	firstNameField.style.display = isLogin ? 'none' : '';
	lastNameField.style.display = isLogin ? 'none' : '';
	password2Field.style.display = isLogin ? 'none' : '';
	termsField.style.display = isLogin ? 'none' : '';

	document.getElementById('authForm').reset();
	authError.classList.add('hidden');

	modal.classList.add('active');
}

function closeModal() {
	modal.classList.remove('active');
}

/* klik w tło = zamknij */
modal.addEventListener('click', (e) => {
	if (e.target === modal) closeModal();
});

/* klik w środek = NIE zamykaj */
modalBox.addEventListener('click', (e) => e.stopPropagation());

/* ================== EVENTY ================== */
loginBtn?.addEventListener('click', (e) => {
	e.preventDefault();
	e.stopPropagation();
	userMenu.classList.add('hidden');
	openModal('login');
});

registerBtn?.addEventListener('click', (e) => {
	e.preventDefault();
	e.stopPropagation();
	userMenu.classList.add('hidden');
	openModal('register');
});

loginBtnMobile?.addEventListener('click', (e) => {
	e.preventDefault();
	openModal('login');
});

registerBtnMobile?.addEventListener('click', (e) => {
	e.preventDefault();
	openModal('register');
});

switchMode.addEventListener('click', (e) => {
	e.preventDefault();
	openModal(mode === 'login' ? 'register' : 'login');
});

function checkPasswordLive(password) {
	const lengthRule = document.getElementById('rule-length');
	const upperRule = document.getElementById('rule-upper');

	// min 8 znaków
	if (password.length >= 8) {
		lengthRule.classList.add('valid');
	} else {
		lengthRule.classList.remove('valid');
	}

	// 1 duża litera
	if (/[A-Z]/.test(password)) {
		upperRule.classList.add('valid');
	} else {
		upperRule.classList.remove('valid');
	}
}
const passwordInput = document.getElementById('password');

passwordInput?.addEventListener('input', (e) => {
	checkPasswordLive(e.target.value);
});

function isValidEmail(email) {
	const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	return regex.test(email);
}

const emailInput = document.getElementById('email');

emailInput?.addEventListener('input', (e) => {
	const rule = document.getElementById('rule-email');

	if (isValidEmail(e.target.value.trim())) {
		rule.classList.add('valid');
	} else {
		rule.classList.remove('valid');
	}
});
const password1 = document.getElementById('password');
const password2Input = document.getElementById('password2');
const passwordMatch = document.getElementById('passwordMatch');

function checkPasswordMatch() {
	if (!password1.value || !password2Input.value) {
		passwordMatch.classList.add('hidden');
		passwordMatch.classList.remove('valid');
		return;
	}

	if (password1.value === password2Input.value) {
		passwordMatch.textContent = 'Hasła są takie same';
		passwordMatch.classList.remove('hidden');
		passwordMatch.classList.add('valid');
	} else {
		passwordMatch.textContent = 'Hasła się nie zgadzają';
		passwordMatch.classList.remove('hidden');
		passwordMatch.classList.remove('valid');
	}
}

password1?.addEventListener('input', checkPasswordMatch);
password2Input?.addEventListener('input', checkPasswordMatch);

/* ================== LOGIN / REGISTER ================== */
document.getElementById('authForm').addEventListener('submit', async (e) => {
	e.preventDefault();

	const email = document.getElementById('email').value.trim();
	const password = document.getElementById('password').value;
	const firstName = document.getElementById('firstName').value.trim();
	const lastName = document.getElementById('lastName').value.trim();
	const password2 = document.getElementById('password2').value;
	const terms = document.getElementById('terms').checked;
	const checkboxLabel = document.querySelector('.checkbox');

	authError.classList.add('hidden');
	checkboxLabel.classList.remove('error');

	if (!isValidEmail(email)) {
		authError.textContent = 'Podaj poprawny adres email';
		authError.classList.remove('hidden');
		return;
	}

	if (mode === 'register' && (!/[A-Z]/.test(password) || password.length < 8)) {
		authError.textContent = 'Hasło musi mieć min. 8 znaków i 1 dużą literę';
		authError.classList.remove('hidden');
		return;
	}

	if (mode === 'register') {
		if (!firstName || !lastName) {
			authError.textContent = 'Podaj imię i nazwisko';
			authError.classList.remove('hidden');
			return;
		}

		if (password !== password2) {
			authError.textContent = 'Hasła się nie zgadzają';
			authError.classList.remove('hidden');
			return;
		}

		if (!terms) {
			authError.textContent = 'Musisz zaakceptować regulamin';
			authError.classList.remove('hidden');
			checkboxLabel.classList.add('error');
			return;
		}
	}
	// --- wysyłka jak było ---
	const res = await fetch(`/api/${mode}`, {
		method: 'POST',
		credentials: 'include',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(mode === 'register' ? { email, password, firstName, lastName } : { email, password }),
	});

	if (res.ok) {
		closeModal();
		checkAuth();
	} else {
		const data = await res.json();
		authError.textContent = data.error || 'Błąd';
		authError.classList.remove('hidden');
	}
});
/* ================== WYLOGUJ ================== */
logoutBtn?.addEventListener('click', async () => {
	await fetch('/api/logout', { method: 'POST', credentials: 'include' });
	location.reload();
});
logoutBtnMobile?.addEventListener('click', async () => {
	await fetch('/api/logout', { method: 'POST', credentials: 'include' });
	location.reload();
});

/* ================== KOMENTARZ ================== */
form?.addEventListener('submit', async (e) => {
	e.preventDefault();

	const res = await fetch('/api/comments', {
		method: 'POST',
		credentials: 'include',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify({
			text: textInput.value,
			rating: currentRating,
		}),
	});

	if (res.status === 401) {
		openModal('login');
		return;
	}

	form.reset();
	currentRating = 5;
	updateStars(currentRating);
	loadComments();
});

/* ================== COOKIES RODO ================== */
function setCookie(name, value, days) {
	const date = new Date();
	date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
	document.cookie = `${name}=${value}; expires=${date.toUTCString()}; path=/; SameSite=Lax`;
}

function getCookie(name) {
	const value = `; ${document.cookie}`;
	const parts = value.split(`; ${name}=`);
	if (parts.length === 2) return parts.pop().split(';').shift();
	return null;
}

// ===== PO ZGODZIE =====
function initAfterConsent() {
	if (typeof checkAuth === 'function') {
		checkAuth();
	}
}


// helpers
document.addEventListener('DOMContentLoaded', () => {
	const banner = document.getElementById('cookieBanner');
	const acceptBtn = document.getElementById('acceptCookies');

	if (!banner || !acceptBtn) return;

	const consent = getCookie('cookiesAccepted');

	if (!consent) {
		// brak zgody → pokaż banner
		banner.classList.remove('hidden');
	} else {
		// zgoda już była → uruchom rzeczy wymagające cookies
		initAfterConsent();
	}

	acceptBtn.addEventListener('click', () => {
		setCookie('cookiesAccepted', 'true', 365);
		banner.classList.add('hidden');
		initAfterConsent();
	});
});




/* ================== REGULAMIN ================== */
const termsModal = document.getElementById('termsModal');
const termsBtn = document.getElementById('termsBtn');
const termsLink = document.getElementById('termsLink');
const closeTerms = document.getElementById('closeTerms');

function openTerms() {
	termsModal.classList.add('active');
}

function closeTermsModal() {
	termsModal.classList.remove('active');
}

termsBtn?.addEventListener('click', (e) => {
	e.preventDefault();
	openTerms();
});

termsLink?.addEventListener('click', (e) => {
	e.preventDefault();
	openTerms();
});

closeTerms?.addEventListener('click', closeTermsModal);

termsModal?.addEventListener('click', (e) => {
	if (e.target === termsModal) closeTermsModal();
});

/* ================== MAPA DOJAZDU ================== */
const map = L.map('map', {
	scrollWheelZoom: false,
	dragging: false,
	tap: false
}).setView([51.761, 18.091], 12);

// Włącz przesuwanie TYLKO przy dwóch palcach
map.getContainer().addEventListener('touchstart', (e) => {
	if (e.touches.length === 2) {
		map.dragging.enable();
	} else {
		map.dragging.disable();
	}
});

map.getContainer().addEventListener('touchend', () => {
	map.dragging.disable();
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: '© OpenStreetMap'
}).addTo(map);

L.marker([51.761, 18.091]).addTo(map)
	.bindPopup('Wolny Strzelec – mobilny mechanik');

// 2. Obsługa przycisku zamykania w modalu regulaminu
document.getElementById('closeTerms')?.addEventListener('click', (e) => {
    e.preventDefault();
    document.getElementById('termsModal').classList.remove('active');
});

// 3. Automatyczne zamykanie menu mobilnego po kliknięciu w link (żeby nie zasłaniało strony)
document.querySelectorAll('#mobileMenu a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('mobileMenu').classList.add('hidden');
    });
});

// 4. Dodatkowe zabezpieczenie: Zamknij regulamin klikając w tło poza okienkiem
document.getElementById('termsModal')?.addEventListener('click', (e) => {
    if (e.target.id === 'termsModal') {
        document.getElementById('termsModal').classList.remove('active');
    }
});

