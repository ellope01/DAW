// Main JavaScript functionality - Funciones generales de la tienda
document.addEventListener('DOMContentLoaded', function() {
    console.log('Merliah - Tienda de moda veraniega cargada');
    
    // Inicializar todas las funcionalidades
    initMobileMenu();
    initProductInteractions();
    initSettingsTabs();
    initSearch();
    initImageGallery();
    initAuthForms();
});

// Menú móvil
function initMobileMenu() {
    const nav = document.querySelector('.nav-links');
    const menuBtn = document.createElement('button');
    menuBtn.innerHTML = '☰';
    menuBtn.className = 'mobile-menu-btn';
    menuBtn.style.display = 'none';
    
    document.querySelector('.nav').appendChild(menuBtn);
    
    menuBtn.addEventListener('click', function() {
        nav.style.display = nav.style.display === 'flex' ? 'none' : 'flex';
    });
    
    // Responsive - mostrar/ocultar menú hamburguesa
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 768) {
            menuBtn.style.display = 'block';
            nav.style.display = 'none';
        } else {
            menuBtn.style.display = 'none';
            nav.style.display = 'flex';
        }
    });
}

// Interacciones con productos
function initProductInteractions() {
    // Botones "Añadir al carrito"
    const addToCartButtons = document.querySelectorAll('.add-to-cart');
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            
            const productCard = this.closest('.product-card') || this.closest('.product-info');
            const productName = productCard.querySelector('h3, h1').textContent;
            const price = productCard.querySelector('.price').textContent;
            
            // Añadir al carrito (simulación)
            addToCart(productName, price);
            
            // Efecto visual
            this.style.background = '#4caf50';
            this.textContent = '✓ Añadido';
            
            setTimeout(() => {
                this.style.background = '';
                this.textContent = 'Añadir al Carrito';
            }, 2000);
        });
    });
    
    // Selector de tallas
    const sizeButtons = document.querySelectorAll('.size-btn');
    sizeButtons.forEach(button => {
        button.addEventListener('click', function() {
            sizeButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
        });
    });
    
    // Controles de cantidad
    const quantityControls = document.querySelectorAll('.quantity-controls');
    quantityControls.forEach(control => {
        const minusBtn = control.querySelector('.qty-btn:first-child');
        const plusBtn = control.querySelector('.qty-btn:last-child');
        const quantitySpan = control.querySelector('.quantity');
        
        minusBtn.addEventListener('click', function() {
            let quantity = parseInt(quantitySpan.textContent);
            if (quantity > 1) {
                quantitySpan.textContent = quantity - 1;
                updateProductTotal();
            }
        });
        
        plusBtn.addEventListener('click', function() {
            let quantity = parseInt(quantitySpan.textContent);
            quantitySpan.textContent = quantity + 1;
            updateProductTotal();
        });
    });
}

// Pestañas de ajustes
function initSettingsTabs() {
    const tabs = document.querySelectorAll('.settings-tab');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remover clase active de todas las pestañas y contenidos
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            // Añadir clase active a la pestaña actual y contenido
            this.classList.add('active');
            document.getElementById(targetTab).classList.add('active');
        });
    });
}

// Funcionalidad de búsqueda
function initSearch() {
    const searchInputs = document.querySelectorAll('.search-box input');
    const searchButtons = document.querySelectorAll('.search-btn');
    
    searchButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            performSearch(searchInputs[index].value);
        });
    });
    
    // Buscar con Enter
    searchInputs.forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                performSearch(this.value);
            }
        });
    });
}

// Galería de imágenes de productos
function initImageGallery() {
    const mainImage = document.querySelector('.main-image img');
    const thumbnails = document.querySelectorAll('.thumbnails img');
    
    if (thumbnails.length > 0) {
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', function() {
                mainImage.src = this.src;
                
                // Resaltar miniatura activa
                thumbnails.forEach(t => t.style.opacity = '0.6');
                this.style.opacity = '1';
            });
        });
    }
}

// Formularios de autenticación
function initAuthForms() {
    const loginForm = document.querySelector('.auth-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateAuthForm(this)) {
                const email = this.querySelector('#email').value;
                alert(`¡Bienvenido/a de nuevo! Sesión iniciada para: ${email}`);
                // Redirigir a la página principal
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 1000);
            }
        });
    }
}

// Función para buscar productos
function performSearch(searchTerm) {
    if (searchTerm.trim()) {
        alert(`Buscando productos: "${searchTerm}"`);
        // En una app real, redirigiría a productos con filtro de búsqueda
        window.location.href = `products.html?search=${encodeURIComponent(searchTerm)}`;
    }
}

// Añadir producto al carrito
function addToCart(productName, price) {
    // Obtener carrito actual de localStorage
    let cart = JSON.parse(localStorage.getItem('merliah_cart')) || [];
    
    // Añadir nuevo producto
    const product = {
        id: Date.now(),
        name: productName,
        price: price,
        quantity: 1,
        image: 'images/products/default.jpg'
    };
    
    cart.push(product);
    
    // Guardar en localStorage
    localStorage.setItem('merliah_cart', JSON.stringify(cart));
    
    // Mostrar notificación
    showNotification(`${productName} añadido al carrito`);
    
    // Actualizar contador del carrito
    updateCartCounter();
}

// Mostrar notificación
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #4caf50;
        color: white;
        padding: 1rem 2rem;
        border-radius: 5px;
        z-index: 10000;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

// Actualizar contador del carrito
function updateCartCounter() {
    const cart = JSON.parse(localStorage.getItem('merliah_cart')) || [];
    const cartIcons = document.querySelectorAll('.cart-icon');
    
    cartIcons.forEach(icon => {
        let counter = icon.querySelector('.cart-counter') || document.createElement('span');
        counter.className = 'cart-counter';
        counter.textContent = cart.length;
        counter.style.cssText = `
            background: #ff4444;
            color: white;
            border-radius: 50%;
            padding: 2px 6px;
            font-size: 0.8rem;
            position: absolute;
            top: -5px;
            right: -5px;
        `;
        
        if (!icon.querySelector('.cart-counter')) {
            icon.style.position = 'relative';
            icon.appendChild(counter);
        }
    });
}

// Validar formularios de autenticación
function validateAuthForm(form) {
    const inputs = form.querySelectorAll('input[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = 'red';
            
            setTimeout(() => {
                input.style.borderColor = '';
            }, 2000);
        }
        
        // Validación específica para email
        if (input.type === 'email' && input.value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(input.value)) {
                isValid = false;
                input.style.borderColor = 'red';
                alert('Por favor, introduce un email válido');
            }
        }
        
        // Validación de contraseña
        if (input.type === 'password' && input.value.length < 6) {
            isValid = false;
            input.style.borderColor = 'red';
            alert('La contraseña debe tener al menos 6 caracteres');
        }
    });
    
    return isValid;
}

// Actualizar total del producto (en página de detalle)
function updateProductTotal() {
    const quantity = document.querySelector('.quantity');
    const priceElement = document.querySelector('.price');
    
    if (quantity && priceElement) {
        const unitPrice = parseFloat(priceElement.textContent.replace('€', ''));
        const total = unitPrice * parseInt(quantity.textContent);
        
        // Mostrar el total si existe un elemento para ello
        const totalElement = document.querySelector('.product-total') || document.createElement('div');
        totalElement.className = 'product-total';
        totalElement.textContent = `Total: €${total.toFixed(2)}`;
        totalElement.style.cssText = 'font-size: 1.2rem; font-weight: bold; margin: 1rem 0;';
        
        if (!document.querySelector('.product-total')) {
            priceElement.parentNode.insertBefore(totalElement, priceElement.nextSibling);
        }
    }
}

// Inicializar contador del carrito al cargar la página
updateCartCounter();