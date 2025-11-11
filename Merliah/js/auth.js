// Authentication functionality - Funcionalidad de autenticación
document.addEventListener('DOMContentLoaded', function() {
    console.log('Sistema de autenticación de Merliah inicializado');
    
    initAuthSystem();
    checkLoginStatus();
});

// Inicializar sistema de autenticación
function initAuthSystem() {
    const loginForm = document.querySelector('.auth-form');
    const registerForm = document.querySelector('.auth-form');
    
    if (loginForm && window.location.pathname.includes('login.html')) {
        initLoginForm(loginForm);
    }
    
    if (registerForm && window.location.pathname.includes('register.html')) {
        initRegisterForm(registerForm);
    }
    
    // Botón de logout (si existe)
    const logoutBtn = document.querySelector('.logout-btn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
}

// Inicializar formulario de login
function initLoginForm(form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateLoginForm(this)) {
            const email = this.querySelector('#email').value;
            const password = this.querySelector('#password').value;
            
            handleLogin(email, password);
        }
    });
    
    // Recordar usuario (simulación)
    const savedEmail = localStorage.getItem('merliah_saved_email');
    if (savedEmail) {
        form.querySelector('#email').value = savedEmail;
        form.querySelector('#remember-me').checked = true;
    }
}

// Inicializar formulario de registro
function initRegisterForm(form) {
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateRegisterForm(this)) {
            const formData = {
                name: this.querySelector('#name').value,
                email: this.querySelector('#email').value,
                password: this.querySelector('#password').value
            };
            
            handleRegistration(formData);
        }
    });
}

// Validar formulario de login
function validateLoginForm(form) {
    const email = form.querySelector('#email');
    const password = form.querySelector('#password');
    let isValid = true;
    
    // Reset estilos
    [email, password].forEach(input => input.style.borderColor = '');
    
    // Validar email
    if (!email.value.trim()) {
        showFieldError(email, 'El email es obligatorio');
        isValid = false;
    } else if (!isValidEmail(email.value)) {
        showFieldError(email, 'Por favor, introduce un email válido');
        isValid = false;
    }
    
    // Validar contraseña
    if (!password.value.trim()) {
        showFieldError(password, 'La contraseña es obligatoria');
        isValid = false;
    } else if (password.value.length < 6) {
        showFieldError(password, 'La contraseña debe tener al menos 6 caracteres');
        isValid = false;
    }
    
    return isValid;
}

// Validar formulario de registro
function validateRegisterForm(form) {
    const name = form.querySelector('#name');
    const email = form.querySelector('#email');
    const password = form.querySelector('#password');
    const confirmPassword = form.querySelector('#confirm-password');
    let isValid = true;
    
    // Reset estilos
    [name, email, password, confirmPassword].forEach(input => input.style.borderColor = '');
    
    // Validar nombre
    if (!name.value.trim()) {
        showFieldError(name, 'El nombre es obligatorio');
        isValid = false;
    }
    
    // Validar email
    if (!email.value.trim()) {
        showFieldError(email, 'El email es obligatorio');
        isValid = false;
    } else if (!isValidEmail(email.value)) {
        showFieldError(email, 'Por favor, introduce un email válido');
        isValid = false;
    }
    
    // Validar contraseña
    if (!password.value.trim()) {
        showFieldError(password, 'La contraseña es obligatoria');
        isValid = false;
    } else if (password.value.length < 6) {
        showFieldError(password, 'La contraseña debe tener al menos 6 caracteres');
        isValid = false;
    }
    
    // Validar confirmación de contraseña
    if (password.value !== confirmPassword.value) {
        showFieldError(confirmPassword, 'Las contraseñas no coinciden');
        isValid = false;
    }
    
    return isValid;
}

// Manejar login
function handleLogin(email, password) {
    // Simular llamada a API
    showLoading('Iniciando sesión...');
    
    setTimeout(() => {
        // En una app real, aquí verificarías con el backend
        const users = JSON.parse(localStorage.getItem('merliah_users')) || [];
        const user = users.find(u => u.email === email && u.password === password);
        
        if (user) {
            // Login exitoso
            localStorage.setItem('merliah_user_loggedin', 'true');
            localStorage.setItem('merliah_user_data', JSON.stringify(user));
            
            // Recordar email si está marcado
            const rememberMe = document.querySelector('#remember-me');
            if (rememberMe && rememberMe.checked) {
                localStorage.setItem('merliah_saved_email', email);
            }
            
            hideLoading();
            showSuccess('¡Bienvenido/a de nuevo!');
            
            setTimeout(() => {
                window.location.href = 'index.html';
            }, 1500);
        } else {
            // Login fallido
            hideLoading();
            showError('Email o contraseña incorrectos. Por favor, intenta de nuevo.');
        }
    }, 1500);
}

// Manejar registro
function handleRegistration(userData) {
    showLoading('Creando tu cuenta...');
    
    setTimeout(() => {
        // Verificar si el usuario ya existe
        const users = JSON.parse(localStorage.getItem('merliah_users')) || [];
        const existingUser = users.find(u => u.email === userData.email);
        
        if (existingUser) {
            hideLoading();
            showError('Este email ya está registrado. ¿Quieres iniciar sesión?');
            return;
        }
        
        // Crear nuevo usuario
        const newUser = {
            id: Date.now(),
            name: userData.name,
            email: userData.email,
            password: userData.password, // En una app real, esto estaría encriptado
            joinDate: new Date().toISOString()
        };
        
        users.push(newUser);
        localStorage.setItem('merliah_users', JSON.stringify(users));
        
        // Auto-login después del registro
        localStorage.setItem('merliah_user_loggedin', 'true');
        localStorage.setItem('merliah_user_data', JSON.stringify(newUser));
        
        hideLoading();
        showSuccess('¡Cuenta creada con éxito! Bienvenido/a a Merliah');
        
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 2000);
    }, 2000);
}

// Manejar logout
function handleLogout() {
    if (confirm('¿Estás seguro de que quieres cerrar sesión?')) {
        localStorage.removeItem('merliah_user_loggedin');
        localStorage.removeItem('merliah_user_data');
        
        showSuccess('Sesión cerrada correctamente');
        
        setTimeout(() => {
            window.location.href = 'index.html';
        }, 1000);
    }
}

// Verificar estado de login
function checkLoginStatus() {
    const isLoggedIn = localStorage.getItem('merliah_user_loggedin');
    const userLinks = document.querySelectorAll('.user-icon');
    
    if (isLoggedIn) {
        const userData = JSON.parse(localStorage.getItem('merliah_user_data'));
        
        // Actualizar enlaces de usuario
        userLinks.forEach(link => {
            link.innerHTML = '👤';
            link.href = 'settings.html';
            link.title = `Mi cuenta (${userData.name})`;
        });
        
        // Añadir botón de logout si no existe
        if (!document.querySelector('.logout-btn')) {
            const logoutBtn = document.createElement('button');
            logoutBtn.className = 'logout-btn';
            logoutBtn.textContent = 'Cerrar Sesión';
            logoutBtn.style.cssText = `
                background: none;
                border: 1px solid #ccc;
                padding: 0.5rem 1rem;
                border-radius: 5px;
                cursor: pointer;
                margin-left: 1rem;
            `;
            
            const navIcons = document.querySelector('.nav-icons');
            if (navIcons) {
                navIcons.appendChild(logoutBtn);
            }
        }
    }
}

// Utilidades de validación
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function showFieldError(input, message) {
    input.style.borderColor = '#ff4444';
    
    // Mostrar tooltip de error
    const errorDiv = document.createElement('div');
    errorDiv.className = 'field-error';
    errorDiv.textContent = message;
    errorDiv.style.cssText = `
        color: #ff4444;
        font-size: 0.8rem;
        margin-top: 0.25rem;
    `;
    
    input.parentNode.appendChild(errorDiv);
    
    // Auto-eliminar después de 3 segundos
    setTimeout(() => {
        errorDiv.remove();
    }, 3000);
}

function showLoading(message) {
    const loadingDiv = document.createElement('div');
    loadingDiv.className = 'auth-loading';
    loadingDiv.innerHTML = `
        <div class="spinner"></div>
        <p>${message}</p>
    `;
    loadingDiv.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255,255,255,0.9);
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        z-index: 10000;
    `;
    
    const spinnerStyle = document.createElement('style');
    spinnerStyle.textContent = `
        .spinner {
            border: 4px solid #f3f3f3;
            border-top: 4px solid var(--primary-blue);
            border-radius: 50%;
            width: 40px;
            height: 40px;
            animation: spin 1s linear infinite;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(spinnerStyle);
    
    document.body.appendChild(loadingDiv);
}

function hideLoading() {
    const loadingDiv = document.querySelector('.auth-loading');
    if (loadingDiv) {
        loadingDiv.remove();
    }
}

function showSuccess(message) {
    showMessage(message, '#4caf50');
}

function showError(message) {
    showMessage(message, '#ff4444');
}

function showMessage(message, color) {
    const messageDiv = document.createElement('div');
    messageDiv.textContent = message;
    messageDiv.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${color};
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        z-index: 10001;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(messageDiv);
    
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}