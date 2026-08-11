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






// =========================================
// AUTH NAVIGATION
// =========================================
console.log("Auth navigation is running");

const user = JSON.parse(localStorage.getItem("user"));

const loginLink = document.getElementById("loginLink");
const registerLink = document.getElementById("registerLink");
const myReportsLink = document.getElementById("myReportsLink");
const reportLink = document.getElementById("reportLink");
const logoutLink = document.getElementById("logoutLink");
const adminLink = document.getElementById("adminLink");

if (user) {

    if (loginLink) loginLink.style.display = "none";
    if (registerLink) registerLink.style.display = "none";

    if (myReportsLink) myReportsLink.style.display = "inline-block";
    if (reportLink) reportLink.style.display = "inline-block";

    if (logoutLink) logoutLink.style.display = "inline-block";

    if (adminLink) {
        adminLink.style.display = user.is_admin ? "inline-block" : "none";
    }

} else {

    if (myReportsLink) myReportsLink.style.display = "none";
    if (reportLink) reportLink.style.display = "none";

    if (logoutLink) logoutLink.style.display = "none";

    if (adminLink) adminLink.style.display = "none";

}

if (logoutLink) {

    logoutLink.addEventListener("click", function (event) {

        event.preventDefault();

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        window.location.href = "login.html";

    });

}



