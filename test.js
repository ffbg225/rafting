// Automatically open the popup when the page loads
window.onload = function() {
    document.getElementById("popup").style.display = "flex";
};

// Close the popup when the close button is clicked
document.getElementById("closePopup").addEventListener("click", function() {
    document.getElementById("popup").style.display = "none";
});

// Close the popup when the "Local" button is clicked
document.getElementById("localButton").addEventListener("click", function() {
    alert("Local Button Clicked!");
    document.getElementById("popup").style.display = "none";
});

// Close the popup when the "Foreign" button is clicked
document.getElementById("foreignButton").addEventListener("click", function() {
    alert("Foreign Button Clicked!");
    document.getElementById("popup").style.display = "none";
});

// Close the popup when clicking outside the popup content
window.addEventListener("click", function(event) {
    if (event.target === document.getElementById("popup")) {
        document.getElementById("popup").style.display = "none";
    }
});