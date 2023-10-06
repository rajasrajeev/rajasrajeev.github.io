const cart = JSON.parse(localStorage.getItem("cart"));

const cartProductGrid = document.getElementById("cart-products");
const subtotal = document.getElementById("subtotal");
const total = document.getElementById("total");

function showCart() {
    console.log(cart);
    document.getElementById("cart-total-count").innerHTML = cart.length + " items"
    cartProductGrid.innerHTML = "";
    var totalPrice = 0;
    cart.forEach(item => {
        totalPrice += item.product.price * item.quantity;
        const productCard = document.createElement("div");
        productCard.classList.add("container");
        productCard.innerHTML = `
        <div class="row border-top border-bottom">
        <div class="row main align-items-center">
          <div class="col-2"><img class="img-fluid" src="${item.product.image}"></div>
          <div class="col">
            <div class="row">${item.product.name}</div>
          </div>
          <div class="col">
            <a href="#">-</a><a href="#" class="border">${item.quantity}</a><a href="#">+</a>
          </div>
          <div class="col">&euro; ${item.quantity * item.product.price} <span class="close">&#10005;</span></div>
        </div>
      </div>
        `;
        cartProductGrid.appendChild(productCard);
    })
    subtotal.innerHTML = `&euro; ${totalPrice}`;
    total.innerHTML = `&euro; ${totalPrice}`;

}

showCart();

// Function to handle the checkout via WhatsApp
function checkoutViaWhatsApp() {
    // Construct a WhatsApp message with the cart contents
    var message = "I'd like to order the following items:%0A";
    var cartTotal = 0;
    cart.forEach(item => {
        cartTotal += item.product.price * item.quantity;
        message += `${item.product.name} x${item.quantity} - $${(item.quantity * item.product.price).toFixed(2)}%0A`;
    });
    message += `Total: ${cartTotal}`;

    // Open WhatsApp with the message
    const whatsappURL = `https://wa.me/9400243451?text=${message}`;
    window.open(whatsappURL);
}