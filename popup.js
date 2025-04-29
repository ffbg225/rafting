document.addEventListener('DOMContentLoaded', () => {
    const popup = document.getElementById('popup');
    const localButton = document.getElementById('localButton');
    const foreignButton = document.getElementById('foreignButton');
    const closePopup = document.getElementById('closePopup');

    // Show popup on page load
    popup.style.display = 'flex';

    // Close popup when close button is clicked
    closePopup.addEventListener('click', () => {
        popup.style.display = 'none';
    });

    // Local button click event
    localButton.addEventListener('click', () => {
        popup.style.display = 'none';
        localStorage.setItem('currency', 'Rs'); // Save currency preference
        window.dispatchEvent(new Event('currencyChange')); // Dispatch event
    });

    // Foreign button click event
    foreignButton.addEventListener('click', () => {
        popup.style.display = 'none';
        localStorage.setItem('currency', '$'); // Save currency preference
        window.dispatchEvent(new Event('currencyChange'));
    });

    // Function to update prices based on currency
    function updatePrices(currency) {
        const prices = document.querySelectorAll('.price, .cart-price, .total-price, .total-price-cart');
        const conversionRate = 300; // 1 USD = 300 LKR

        prices.forEach(priceElement => {
            let priceText = priceElement.textContent.trim(); // Trim whitespace
            let priceValue;

            // Extract numeric value from price text
            if (priceText.includes('Rs')) {
                priceValue = parseFloat(priceText.replace('Rs', '').trim());
            } else if (priceText.includes('$')) {
                priceValue = parseFloat(priceText.replace('$', '').trim());
            } else {
                // If no currency symbol, assume it's in LKR
                priceValue = parseFloat(priceText);
            }

            // If priceValue is not a number, skip this element
            if (isNaN(priceValue)) {
                console.warn(`Invalid price value: ${priceText}`);
                return;
            }

            // Convert price based on selected currency
            if (currency === '$') {
                priceElement.textContent = `$${(priceValue / conversionRate).toFixed(2)}`;
            } else {
                priceElement.textContent = `Rs ${(priceValue * conversionRate).toFixed(2)}`;
            }
        });
    }

    // Check localStorage for currency preference on page load
    const savedCurrency = localStorage.getItem('currency') || 'Rs';
    updatePrices(savedCurrency); // Apply saved currency preference

    // Listen for currency change events
    window.addEventListener('currencyChange', () => {
        const currentCurrency = localStorage.getItem('currency') || 'Rs';
        updatePrices(currentCurrency);
    });
});