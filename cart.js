const cartIcon = document.querySelector(".add");
const cart = document.querySelector(".cart");
const cartClose = document.querySelector("#cart-close");

// Open and close cart
cartIcon.addEventListener("click", () => cart.classList.add("active"));
cartClose.addEventListener("click", () => cart.classList.remove("active"));

// Add to cart functionality
const addCartButtons = document.querySelectorAll(".add-to-cart");
const cartContent = document.querySelector(".cart-content");

// Currency conversion rate
const conversionRate = 300; // 1 USD = 300 LKR

// Function to update prices based on currency
function updatePrices(currency) {
    const prices = document.querySelectorAll(".cart-price, .total-price");

    prices.forEach(priceElement => {
        let priceText = priceElement.textContent;
        if (currency === '$') {
            if (priceText.includes('Rs')) {
                let priceValue = parseFloat(priceText.replace('Rs', '').trim());
                let convertedPrice = (priceValue / conversionRate).toFixed(2);
                priceElement.textContent = `$${convertedPrice}`;
            }
        } else {
            if (priceText.includes('$')) {
                let priceValue = parseFloat(priceText.replace('$', '').trim());
                let convertedPrice = (priceValue * conversionRate).toFixed(2);
                priceElement.textContent = `Rs ${convertedPrice}`;
            }
        }
    });
}

// Function to add item to cart
const addToCart = productBox => {
    const productImgSrc = productBox.querySelector("img").src;
    const productTitle = productBox.querySelector(".product-title").textContent;
    const productPrice = productBox.querySelector(".price").textContent;
    const productQuantity = productBox.querySelector(".quantity-input").value;

    // Check if item already exists in cart
    const cartItems = cartContent.querySelectorAll(".cart-product-title");
    for (let item of cartItems) {
        if (item.textContent === productTitle) {
            alert("This item is already in the cart");
            return; // Stop further execution if the item is already in the cart
        }
    }

    // Create cart item
    const cartBox = document.createElement("div");
    cartBox.classList.add("cart-box");
    cartBox.innerHTML = `
        <img src="${productImgSrc}" class="cart-img" alt="">
        <div class="cart-detail">
            <h2 class="cart-product-title">${productTitle}</h2>
            <span class="cart-price">${productPrice}</span>
            <div class="cart-quantity">
                <button id="decrement">-</button>
                <span class="number">${productQuantity}</span>
                <button id="increment">+</button>
            </div>
        </div>
        <i class="ri-delete-bin-line cart-remove"></i>
    `;
    cartContent.appendChild(cartBox);

    // Remove item from cart
    cartBox.querySelector(".cart-remove").addEventListener("click", () => {
        cartBox.remove();
        updateTotalPrice();
        updateCartCount(-1); // Decrease cart count
    });

    // Update quantity
    cartBox.querySelector(".cart-quantity").addEventListener("click", event => {
        const numberElement = cartBox.querySelector(".number");
        const decrementButton = cartBox.querySelector("#decrement");
        let quantity = parseInt(numberElement.textContent);

        if (event.target.id === "decrement" && quantity > 1) {
            quantity--;
            if (quantity === 1) {
                decrementButton.style.color = "#999";
            }
        } else if (event.target.id === "increment") {
            quantity++;
            decrementButton.style.color = "#333";
        }

        numberElement.textContent = quantity;
        updateTotalPrice();
    });

    updateTotalPrice();
    updateCartCount(1); // Increase cart count
};

// Function to update total price
const updateTotalPrice = () => {
    const totalPriceElement = document.querySelector(".total-price");
    const cartBoxes = cartContent.querySelectorAll(".cart-box");
    let total = 0;

    cartBoxes.forEach(cartBox => {
        const priceElement = cartBox.querySelector(".cart-price");
        const quantityElement = cartBox.querySelector(".number");
        const priceText = priceElement.textContent;

        // Extract price value based on currency
        let priceValue;
        if (priceText.includes('Rs')) {
            priceValue = parseFloat(priceText.replace('Rs', '').trim());
        } else if (priceText.includes('$')) {
            priceValue = parseFloat(priceText.replace('$', '').trim()) * conversionRate;
        }

        const quantity = parseInt(quantityElement.textContent);
        total += priceValue * quantity;
    });

    // Display total price in the selected currency
    const savedCurrency = localStorage.getItem("currency") || 'Rs';
    if (savedCurrency === '$') {
        totalPriceElement.textContent = `$${(total / conversionRate).toFixed(2)}`;
    } else {
        totalPriceElement.textContent = `Rs ${total.toFixed(2)}`;
    }
};

// Function to update cart count
let cartCount = 0;
const updateCartCount = (change) => {
    cartCount += change;
    document.getElementById("cart-count").textContent = cartCount;
};

// Add event listeners to "Add to Cart" buttons
addCartButtons.forEach(button => {
    button.addEventListener("click", event => {
        const productBox = event.target.closest(".product-card");
        addToCart(productBox);
    });
});

// Listen for currency changes (from popup.js)
window.addEventListener("currencyChange", () => {
    const savedCurrency = localStorage.getItem("currency") || 'Rs';
    updatePrices(savedCurrency);
    updateTotalPrice();
});

// Initialize prices based on saved currency
document.addEventListener("DOMContentLoaded", () => {
    const savedCurrency = localStorage.getItem("currency") || 'Rs';
    updatePrices(savedCurrency);
    updateTotalPrice();
});