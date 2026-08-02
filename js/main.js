// =========================================
// MOBILE NAVIGATION MENU
// =========================================

// Select the menu button
const menuToggle = document.querySelector(".menu-toggle");

// Select the navigation links container
const navLinks = document.querySelector(".nav-links");


// Open / Close mobile menu
menuToggle.addEventListener("click", () => {

    navLinks.classList.toggle("show");

});