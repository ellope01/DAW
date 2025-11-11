document.addEventListener('DOMContentLoaded', () => {
    console.log('Auth Merliah listo');
    initAuth();
    updateUserUI();
});

function initAuth() {
    const form = document.querySelector('.auth-form');
    const path = window.location.pathname;

    if (form) {
        form.addEventListener('submit', e => {
            e.preventDefault();

            if (path.includes('login.html')) handleLogin(form);
            if (path.includes('register.html')) handleRegister(form);
        });
    }

    const logout = document.querySelector('.logout-btn');
    if (logout) logout.addEventListener('click', logoutUser);
}

// --- LOGIN ---
function handleLogin(form) {
    const email = form.querySelector('#email').value.trim();
    const pass = form.querySelector('#password').value.trim();

    if (!validateEmail(email) || pass.length < 6) {
        showMsg('Email o contraseña inválidos', 'error');
        return;
    }

    const users = JSON.parse(localStorage.getItem('merliah_users')) || [];
    const user = users.find(u => u.email === email && u.password === pass);

    if (!user) return showMsg('Credenciales incorrectas', 'error');

    localStorage.setItem('merliah_user', JSON.stringify(user));
    showMsg('Bienvenido/a de nuevo', 'ok');
    setTimeout(() => (window.location.href = 'index.html'), 1000);
}

// --- REGISTRO ---
function handleRegister(form) {
    const name = form.querySelector('#name').value.trim();
    const email = form.querySelector('#email').value.trim();
    const pass = form.querySelector('#password').value.trim();
    const confirm = form.querySelector('#confirm-password').value.trim();

    if (!name || !validateEmail(email) || pass.length < 6 || pass !== confirm) {
        showMsg('Datos inválidos o contraseñas no coinciden', 'error');
        return;
    }

    const users = JSON.parse(localStorage.getItem('merliah_users')) || [];
    if (users.some(u => u.email === email)) return showMsg('Email ya registrado', 'error');

    const newUser = { id: Date.now(), name, email, password: pass };
    users.push(newUser);
    localStorage.setItem('merliah_users', JSON.stringify(users));
    localStorage.setItem('merliah_user', JSON.stringify(newUser));

    showMsg('Cuenta creada con éxito', 'ok');
    setTimeout(() => (window.location.href = 'index.html'), 1000);
}

// --- LOGOUT ---
function logoutUser() {
    if (!confirm('¿Cerrar sesión?')) return;
    localStorage.removeItem('merliah_user');
    showMsg('Sesión cerrada', 'ok');
    setTimeout(() => (window.location.href = 'index.html'), 800);
}

// --- UI y utilidades ---
function updateUserUI() {
    const user = JSON.parse(localStorage.getItem('merliah_user'));
    const userIcon = document.querySelectorAll('.user-icon');

    if (user) {
        userIcon.forEach(i => {
            i.innerHTML = '👤';
            i.href = 'settings.html';
            i.title = `Mi cuenta (${user.name})`;
        });
        if (!document.querySelector('.logout-btn')) {
            const btn = document.createElement('button');
            btn.textContent = 'Cerrar sesión';
            btn.className = 'logout-btn';
            btn.onclick = logoutUser;
            document.querySelector('.nav-icons')?.appendChild(btn);
        }
    }
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showMsg(msg, type = 'ok') {
    const box = document.createElement('div');
    box.textContent = msg;
    box.style.cssText = `
        position:fixed;top:20px;left:50%;transform:translateX(-50%);
        background:${type === 'ok' ? '#4caf50' : '#ff4444'};
        color:#fff;padding:10px 20px;border-radius:8px;z-index:9999;
    `;
    document.body.appendChild(box);
    setTimeout(() => box.remove(), 2000);
}
