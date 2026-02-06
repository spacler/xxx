<!DOCTYPE html>
<html lang="pl">
<head>
	<meta charset="UTF-8" />
	<meta name="viewport" content="width=device-width, initial-scale=1.0" />
	<title>Logowanie / Rejestracja – Wolny Strzelec</title>

	<link rel="stylesheet" href="css/style.css" />
</head>
<body id="top">

<header class="header">
	<div class="container">
		<div class="logo">Wolny<span>Strzelec</span></div>

		<nav class="nav">
			<div class="nav-links">
				<a href="index.html#services">Usługi</a>
				<a href="#" id="termsBtn">Regulamin</a>
				<a href="index.html#contact">Kontakt</a>
			</div>
		</nav>
	</div>
</header>

<main class="auth-page">
	<div class="auth-grid">

		<!-- REJESTRACJA -->
		<section class="auth-box" id="register">
			<h2>Rejestracja</h2>

			<form id="registerForm">
				<div class="field">
					<input type="text" id="firstName" required placeholder=" " />
					<label>Imię</label>
				</div>

				<div class="field">
					<input type="text" id="lastName" required placeholder=" " />
					<label>Nazwisko</label>
				</div>

				<div class="field">
					<input type="email" id="email" required placeholder=" " />
					<label>Email</label>
				</div>

				<ul class="email-rules">
					<li id="rule-email">Poprawny adres email</li>
				</ul>

				<div class="field">
					<input type="password" id="password" required placeholder=" " />
					<label>Hasło</label>
				</div>

				<ul class="password-rules">
					<li id="rule-length">Min. 8 znaków</li>
					<li id="rule-upper">1 duża litera</li>
				</ul>

				<div class="field">
					<input type="password" id="password2" required placeholder=" " />
					<label>Powtórz hasło</label>
				</div>

				<p class="password-match hidden" id="passwordMatch">
					Hasła się nie zgadzają
				</p>

				<label class="checkbox">
					<input type="checkbox" id="terms" />
					<span>Akceptuję <a href="#" id="termsLink">regulamin</a></span>
				</label>

				<button type="submit">Zarejestruj</button>
				<p class="form-error hidden" id="authError"></p>
			</form>
		</section>

		<!-- LOGOWANIE -->
		<section class="auth-box" id="login">
			<h2>Logowanie</h2>

			<form id="loginForm">
				<div class="field">
					<input type="email" id="loginEmail" required placeholder=" " />
					<label>Email</label>
				</div>

				<div class="field">
					<input type="password" id="loginPassword" required placeholder=" " />
					<label>Hasło</label>
				</div>

				<button type="submit">Zaloguj</button>
			</form>
		</section>

	</div>
</main>

<footer class="footer">
	<div class="footer-container">
		<p class="footer-copy">© 2026 Wolny Strzelec</p>
	</div>
</footer>

<!-- REGULAMIN – MODAL ZOSTAJE -->
<div id="termsModal" class="modal">
	<div class="modal-box">
		<h2>Regulamin serwisu</h2>
		<p>Treść bez zmian…</p>
	</div>
</div>

<script src="js/main.js"></script>
<script src="js/auth.js"></script>

</body>
</html>
