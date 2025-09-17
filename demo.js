document.addEventListener('DOMContentLoaded', function () {
    const menuBtn = document.getElementById('menu-btn');
    const navbar = document.querySelector('.navbar');

    menuBtn.addEventListener('click', function (e) {
        e.preventDefault();
        navbar.classList.toggle('active');
    });


    const searchBtn = document.getElementById('search-btn');
    const searchContainer = document.getElementById('search-container');

    searchBtn.addEventListener('click', function (e) {
        e.preventDefault();
        searchContainer.style.display = searchContainer.style.display === 'block' ? 'none' : 'block';
    });


    const cartBtn = document.getElementById('cart-btn');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    const closeCart = document.getElementById('close-cart');

    cartBtn.addEventListener('click', function (e) {
        e.preventDefault();
        cartSidebar.classList.add('active');
        cartOverlay.classList.add('active');
    });

    closeCart.addEventListener('click', function () {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
    });

    cartOverlay.addEventListener('click', function () {
        cartSidebar.classList.remove('active');
        cartOverlay.classList.remove('active');
    });


    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentTestimonial = 0;

    function showTestimonial(index) {
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active');
        });
        testimonials[index].classList.add('active');
    }

    prevBtn.addEventListener('click', function () {
        currentTestimonial--;
        if (currentTestimonial < 0) {
            currentTestimonial = testimonials.length - 1;
        }
        showTestimonial(currentTestimonial);
    });

    nextBtn.addEventListener('click', function () {
        currentTestimonial++;
        if (currentTestimonial >= testimonials.length) {
            currentTestimonial = 0;
        }
        showTestimonial(currentTestimonial);
    });


    showTestimonial(currentTestimonial);


    const newsletterForm = document.getElementById('newsletter-form');

    newsletterForm.addEventListener('submit', function (e) {
        e.preventDefault();
        const email = this.querySelector('input').value;
        alert(`Thank you for subscribing with ${email}!`);
        this.reset();
    });


    const products = [
        {
            id: 1,
            title: "Radiant Glow Serum",
            price: 75.00,
            oldPrice: 100.00,
            image: "serum.jpeg",
            badge: "Bestseller"
        },
        {
            id: 2,
            title: "Luminous Foundation",
            price: 300.00,
            oldPrice: 400.00,
            image: "fundation.jfif",
            badge: "Sale"
        },
        {
            id: 3,
            title: "Hydrating Face Cream",
            price: 300.00,
            image: "face.jfif"
        },
        {
            id: 4,
            title: "Shimmer Eyeshadow Palette",
            price: 200.00,
            image: "eye.jfif"
        },
        {
            id: 5,
            title: "Nourishing Hair Mask",
            price: 250.00,
            oldPrice: 300.00,
            image: "mask.jfif",
            badge: "Sale"
        },
        {
            id: 6,
            title: "Vitamin C Brightening Toner",
            price: 3000.00,
            image: "vitmain.jfif"
        },
        {
            id: 7,
            title: "Matte Liquid Lipstick",
            price: 1800.00,
            image: "liquid.jfif"
        },
        {
            id: 8,
            title: "Refreshing Facial Mist",
            price: 700.00,
            oldPrice: 800.00,
            image: "mist.jfif",
            badge: "New"
        }
    ];


    const productGrid = document.getElementById('product-grid');

    function displayProducts() {
        productGrid.innerHTML = '';

        products.forEach(product => {
            const productCard = document.createElement('div');
            productCard.className = 'product-card';

            let badgeHTML = '';
            if (product.badge) {
                badgeHTML = `<span class="product-badge">${product.badge}</span>`;
            }

            let oldPriceHTML = '';
            if (product.oldPrice) {
                oldPriceHTML = `<span class="old-price">$${product.oldPrice.toFixed(2)}</span>`;
            }

            productCard.innerHTML = `
                ${badgeHTML}
                <div class="product-img">
                    <img src="${product.image}" alt="${product.title}">
                </div>
                <div class="product-info">
                    <h3 class="product-title">${product.title}</h3>
                    <div class="product-price">
                        <span class="current-price">$${product.price.toFixed(2)}</span>
                        ${oldPriceHTML}
                    </div>
                    <button class="add-to-cart" data-id="${product.id}">Add to Cart</button>
                </div>
            `;

            productGrid.appendChild(productCard);
        });


        document.querySelectorAll('.add-to-cart').forEach(button => {
            button.addEventListener('click', addToCart);
        });
    }


    let cart = [];
    const cartItems = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');
    const cartCount = document.querySelector('.cart-count');

    function addToCart(e) {
        const productId = parseInt(e.target.getAttribute('data-id'));
        const product = products.find(p => p.id === productId);


        const existingItem = cart.find(item => item.id === productId);

        if (existingItem) {
            existingItem.quantity++;
        } else {
            cart.push({
                ...product,
                quantity: 1
            });
        }

        updateCart();


        cartSidebar.classList.add('active');
        cartOverlay.classList.add('active');
    }

    function updateCart() {

        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;


        if (cart.length === 0) {
            cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        } else {
            cartItems.innerHTML = '';

            cart.forEach(item => {
                const cartItem = document.createElement('div');
                cartItem.className = 'cart-item';

                cartItem.innerHTML = `
                    <div class="cart-item-img">
                        <img src="${item.image}" alt="${item.title}">
                    </div>
                    <div class="cart-item-info">
                        <h4 class="cart-item-title">${item.title}</h4>
                        <p class="cart-item-price">$${item.price.toFixed(2)}</p>
                        <div class="cart-item-quantity">
                            <button class="decrease" data-id="${item.id}">-</button>
                            <span>${item.quantity}</span>
                            <button class="increase" data-id="${item.id}">+</button>
                        </div>
                        <span class="remove-item" data-id="${item.id}">Remove</span>
                    </div>
                `;

                cartItems.appendChild(cartItem);
            });


            document.querySelectorAll('.decrease').forEach(button => {
                button.addEventListener('click', decreaseQuantity);
            });

            document.querySelectorAll('.increase').forEach(button => {
                button.addEventListener('click', increaseQuantity);
            });

            document.querySelectorAll('.remove-item').forEach(button => {
                button.addEventListener('click', removeItem);
            });
        }


        const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        cartTotal.textContent = `$${total.toFixed(2)}`;
    }

    function decreaseQuantity(e) {
        const productId = parseInt(e.target.getAttribute('data-id'));
        const item = cart.find(item => item.id === productId);

        if (item.quantity > 1) {
            item.quantity--;
        } else {
            cart = cart.filter(item => item.id !== productId);
        }

        updateCart();
    }

    function increaseQuantity(e) {
        const productId = parseInt(e.target.getAttribute('data-id'));
        const item = cart.find(item => item.id === productId);

        item.quantity++;
        updateCart();
    }

    function removeItem(e) {
        const productId = parseInt(e.target.getAttribute('data-id'));
        cart = cart.filter(item => item.id !== productId);
        updateCart();
    }


    displayProducts();
});