// Cart specific functionality - Funcionalidad específica del carrito
document.addEventListener('DOMContentLoaded', function() {
    console.log('Carrito de Merliah inicializado');
    
    initCartInteractions();
    loadCartItems();
    updateCartSummary();
});

// Inicializar interacciones del carrito
function initCartInteractions() {
    // Botones para eliminar items
    const removeButtons = document.querySelectorAll('.remove-btn');
    removeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const cartItem = this.closest('.cart-item');
            const productName = cartItem.querySelector('h3').textContent;
            
            if (confirm(`¿Estás seguro de que quieres eliminar "${productName}" del carrito?`)) {
                removeCartItem(cartItem);
            }
        });
    });
    
    // Controles de cantidad en el carrito
    const quantityControls = document.querySelectorAll('.quantity-controls');
    quantityControls.forEach(control => {
        const minusBtn = control.querySelector('.qty-btn:first-child');
        const plusBtn = control.querySelector('.qty-btn:last-child');
        const quantitySpan = control.querySelector('.quantity');
        
        minusBtn.addEventListener('click', function() {
            let quantity = parseInt(quantitySpan.textContent);
            if (quantity > 1) {
                quantitySpan.textContent = quantity - 1;
                updateCartItemQuantity(this.closest('.cart-item'), quantity - 1);
                updateCartSummary();
            }
        });
        
        plusBtn.addEventListener('click', function() {
            let quantity = parseInt(quantitySpan.textContent);
            quantitySpan.textContent = quantity + 1;
            updateCartItemQuantity(this.closest('.cart-item'), quantity + 1);
            updateCartSummary();
        });
    });
    
    // Botón de checkout
    const checkoutBtn = document.querySelector('.checkout-btn');
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            proceedToCheckout();
        });
    }
    
    // Botón continuar comprando
    const continueBtn = document.querySelector('.continue-shopping');
    if (continueBtn) {
        continueBtn.addEventListener('click', function(e) {
            e.preventDefault();
            window.location.href = 'products.html';
        });
    }
}

// Cargar items del carrito
function loadCartItems() {
    const cart = JSON.parse(localStorage.getItem('merliah_cart')) || [];
    const cartItemsContainer = document.querySelector('.cart-items');
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `
            <div class="empty-cart">
                <h3>Tu carrito está vacío</h3>
                <p>¡Descubre nuestra colección veraniega!</p>
                <a href="products.html" class="cta-button">Ver Productos</a>
            </div>
        `;
        return;
    }
    
    // En una app real, aquí se generarían los items dinámicamente
    console.log('Carrito cargado:', cart);
}

// Eliminar item del carrito
function removeCartItem(cartItem) {
    const productName = cartItem.querySelector('h3').textContent;
    
    // Eliminar de localStorage
    let cart = JSON.parse(localStorage.getItem('merliah_cart')) || [];
    cart = cart.filter(item => item.name !== productName);
    localStorage.setItem('merliah_cart', JSON.stringify(cart));
    
    // Efecto visual de eliminación
    cartItem.style.transform = 'translateX(100%)';
    cartItem.style.opacity = '0';
    
    setTimeout(() => {
        cartItem.remove();
        updateCartSummary();
        updateCartCounter();
        
        // Si el carrito queda vacío, mostrar mensaje
        if (document.querySelectorAll('.cart-item').length === 0) {
            loadCartItems();
        }
    }, 300);
}

// Actualizar cantidad de un item
function updateCartItemQuantity(cartItem, newQuantity) {
    const productName = cartItem.querySelector('h3').textContent;
    let cart = JSON.parse(localStorage.getItem('merliah_cart')) || [];
    
    const itemIndex = cart.findIndex(item => item.name === productName);
    if (itemIndex !== -1) {
        cart[itemIndex].quantity = newQuantity;
        localStorage.setItem('merliah_cart', JSON.stringify(cart));
    }
}

// Actualizar resumen del carrito
function updateCartSummary() {
    const cart = JSON.parse(localStorage.getItem('merliah_cart')) || [];
    let subtotal = 0;
    
    // Calcular subtotal
    cart.forEach(item => {
        const price = parseFloat(item.price.replace('€', ''));
        subtotal += price * item.quantity;
    });
    
    // Calcular envío (gratis arriba de €50)
    const shipping = subtotal >= 50 ? 0 : 4.99;
    const total = subtotal + shipping;
    
    // Actualizar UI
    const subtotalElement = document.querySelector('.summary-line:nth-child(1) span:last-child');
    const shippingElement = document.querySelector('.summary-line:nth-child(2) span:last-child');
    const totalElement = document.querySelector('.summary-line.total span:last-child');
    
    if (subtotalElement) subtotalElement.textContent = `€${subtotal.toFixed(2)}`;
    if (shippingElement) shippingElement.textContent = shipping === 0 ? 'GRATIS' : `€${shipping.toFixed(2)}`;
    if (totalElement) totalElement.textContent = `€${total.toFixed(2)}`;
    
    // Mostrar mensaje de envío gratis
    const freeShippingMsg = document.querySelector('.free-shipping-msg') || document.createElement('div');
    if (subtotal < 50 && subtotal > 0) {
        const remaining = (50 - subtotal).toFixed(2);
        freeShippingMsg.className = 'free-shipping-msg';
        freeShippingMsg.textContent = `¡Solo €${remaining} más para envío GRATIS!`;
        freeShippingMsg.style.cssText = 'color: #4caf50; font-size: 0.9rem; margin-top: 0.5rem;';
        
        if (!document.querySelector('.free-shipping-msg')) {
            shippingElement.parentNode.appendChild(freeShippingMsg);
        }
    } else {
        freeShippingMsg.remove();
    }
}

// Proceder al checkout
function proceedToCheckout() {
    const cart = JSON.parse(localStorage.getItem('merliah_cart')) || [];
    
    if (cart.length === 0) {
        alert('Tu carrito está vacío. Añade algunos productos antes de proceder al pago.');
        return;
    }
    
    // Verificar si el usuario está logueado
    const isLoggedIn = localStorage.getItem('merliah_user_loggedin');
    
    if (!isLoggedIn) {
        if (confirm('Para continuar con la compra, necesitas iniciar sesión. ¿Quieres ir a la página de login?')) {
            window.location.href = 'login.html';
        }
        return;
    }
    
    // Simular proceso de checkout
    alert('¡Redirigiendo al proceso de pago!');
    console.log('Iniciando checkout con productos:', cart);
    
    // En una app real, aquí iría la integración con PayPal/Stripe/etc.
    setTimeout(() => {
        // Limpiar carrito después de compra exitosa
        localStorage.removeItem('merliah_cart');
        alert('¡Compra realizada con éxito! Gracias por tu pedido.');
        window.location.href = 'index.html';
    }, 2000);
}

// Actualizar contador del carrito (importado de main.js)
function updateCartCounter() {
    const cart = JSON.parse(localStorage.getItem('merliah_cart')) || [];
    const cartIcons = document.querySelectorAll('.cart-icon');
    
    cartIcons.forEach(icon => {
        let counter = icon.querySelector('.cart-counter') || document.createElement('span');
        counter.className = 'cart-counter';
        counter.textContent = cart.reduce((total, item) => total + item.quantity, 0);
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