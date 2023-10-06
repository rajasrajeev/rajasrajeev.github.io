const products = [
    { name: "Product 1", price: 10.00, category: "1", image: "assets/images/tea.jpg" },
    { name: "Horlicks", price: 8.50, category: "2", image: "assets/images/horlicks.jpg" },
    { name: "Product 3", price: 111.00, category: "2", image: "assets/images/biriyani-mutton.jpg" },
    { name: "Product 4", price: 45.00, category: "3", image: "assets/images/product1.jpg" },
    { name: "Product 5", price: 15.00, category: "3", image: "assets/images/biriyani-mutton.jpg" },
    { name: "Product 6", price: 12.00, category: "4", image: "assets/images/tea.jpg" },
    { name: "Product 7", price: 13.00, category: "5", image: "assets/images/product1.jpg" },
    { name: "Product 8", price: 11.00, category: "6", image: "assets/images/biriyani-mutton.jpg" },
    { name: "Product 9", price: 1.00, category: "7", image: "assets/images/product1.jpg" },
    { name: "Product 10", price: 31.00, category: "8", image: "assets/images/product1.jpg" },
    { name: "Product 11", price: 13.00, category: "8", image: "assets/images/product1.jpg" },
    { name: "Product 12", price: 1.00, category: "9", image: "assets/images/biriyani-mutton.jpg" },
    { name: "Product 13", price: 13.00, category: "10", image: "assets/images/heniken.jpg" },
    { name: "Product 14", price: 31.00, category: "10", image: "assets/images/product1.jpg" },
    { name: "Product 15", price: 1.00, category: "11", image: "assets/images/product1.jpg" },
    { name: "Product 16", price: 13.00, category: "12", image: "assets/images/product1.jpg" },
    { name: "Product 17", price: 133.00, category: "13", image: "assets/images/product1.jpg" },
    { name: "Product 18", price: 313.00, category: "14", image: "assets/images/horlicks.jpg" },
    { name: "Product 18", price: 313.00, category: "13", image: "assets/images/product1.jpg" },
    { name: "Product 18", price: 313.00, category: "12", image: "assets/images/product1.jpg" },
    { name: "Product 18", price: 313.00, category: "12", image: "assets/images/biriyani-mutton.jpg" },

];

const cart = [];

const cartTotal = document.getElementById("cart-total");
const categoriesList = document.getElementById("categories");
const productGrid = document.getElementById("product-grid");

// Function to add items to the cart
function addToCart(event, product) {

    const existingItem = cart.find(item => item.product.name === product.name);
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ product, quantity: 1 });
    }
    const cartButton = document.getElementById("cart-quantity-badge");
    const cartButton2 = document.getElementById("cart-quantity-badge2");
    cartButton.innerHTML = cart.length;
    cartButton2.innerHTML = cart.length;
    localStorage.setItem('cart', JSON.stringify(cart));
    console.log(event.target.previous);
    event.target.previousElementSibling .innerHTML = findProductQuantityFromCart(product);
}

function deleteFromCart(event, product) {
    const existingItem = cart.find(item => item.product.name === product.name);
    if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity--;
        localStorage.setItem('cart', JSON.stringify(existingItem));
    } else {
        const newCart = cart.filter(item => item.product.name != product.name);
        const cartButton = document.getElementById("cart-quantity-badge");
        const cartButton2 = document.getElementById("cart-quantity-badge2");
        cartButton.innerHTML = newCart.length;
        cartButton2.innerHTML = newCart.length;
        localStorage.setItem('cart', JSON.stringify(newCart));
    }
    event.target.nextElementSibling .innerHTML = findProductQuantityFromCart(product);
    // event.target.style.display = "none";
    // event.target.previousElementSibling.style.display = "inline-block";
}

function findProductQuantityFromCart(product) {
    var cart = JSON.parse(localStorage.getItem("cart"));
    
    if(cart && cart.find(item => item.product.name === product.name)) {
        const item = cart.find(item => item.product.name === product.name);
        return item.quantity;
    } else {
        return 0;
    }
}

// Function to filter products by category
function filterProducts(category) {
    
    productGrid.innerHTML = "";

    const filteredProducts = category === "all" ?
        products :
        products.filter(product => product.category === category);
    console.log(filteredProducts);
    filteredProducts.forEach(product => {
        
        const productCard = document.createElement("div");
        productCard.classList.add("col");
        productCard.innerHTML = `
            <div class="card shadow-sm">
              <img src="${product.image}" alt="${product.name}" class="img-fluid product-img">

              <div class="card-body">
                <p class="card-text"><h4><b>${product.name}</b></h4></p>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group">
                  ${product.price.toFixed(2)}
                  </div>
                  <span>
                    <button type="button" data-product='${JSON.stringify(product)}' class="btn btn-sm btn-outline-secondary delete-from-cart">- </button>
                    <small class="text-muted">0</small>
                    <button type="button" data-product='${JSON.stringify(product)}' class="btn btn-sm btn-outline-secondary add-to-cart">+ </button>
                  </span> 
                </div>
                <small class="text-muted">9 mins</small>
              </div>
            </div>
        `;
        productGrid.appendChild(productCard);
    });
}

// Add click event listeners to "Add to Cart" buttons
productGrid.addEventListener("click", function (event) {
    if (event.target.classList.contains("add-to-cart")) {
        const product = JSON.parse(event.target.getAttribute("data-product"));
        addToCart(event, product);
    }
    console.log(event.target)
    if (event.target.classList.contains("delete-from-cart")) {
        const product = JSON.parse(event.target.getAttribute("data-product"));
        deleteFromCart(event, product);
    }
});

// Add click event listeners to category filter
categoriesList.addEventListener("click", function (event) {
    const target = event.target.closest(".card"); // Find the closest parent card element

    if (target) {
        const category = target.dataset.category;
        filterProducts(category);

        // Update active category
        const categoryItems = document.querySelectorAll("#categories .card");
        categoryItems.forEach(item => item.classList.remove("active"));
        target.classList.add("active");
    }
});

// Initial product grid display
filterProducts("all");

// Function to handle the checkout via WhatsApp
function checkoutViaWhatsApp() {
    // Construct a WhatsApp message with the cart contents
    const message = "I'd like to order the following items:%0A";
    cart.forEach(item => {
        message += `${item.product.name} x${item.quantity} - $${(item.quantity * item.product.price).toFixed(2)}%0A`;
    });
    const total = cartTotal.textContent;
    message += `Total: ${total}`;

    // Open WhatsApp with the message
    const whatsappURL = `https://wa.me/8136973746?text=${message}`;
    window.open(whatsappURL);
}