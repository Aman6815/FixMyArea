// =========================================
// REGISTRATION FORM
// =========================================

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", function (event) {

        // Prevent page refresh
        event.preventDefault();

        // Get form values
        const fullName = document.getElementById("fullName").value.trim();
        const email = document.getElementById("email").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const location = document.getElementById("location").value;
        const password = document.getElementById("password").value;
        const confirmPassword =
            document.getElementById("confirmPassword").value;


        // Check password length
        if (password.length < 8) {

            alert("Password must be at least 8 characters long.");

            return;
        }


        // Check if passwords match
        if (password !== confirmPassword) {

            alert("Passwords do not match.");

            return;
        }


        // Temporary success message
        alert(
            `Welcome, ${fullName}! Your registration form is valid.`
        );

        // Show submitted information in console
        console.log({
            fullName,
            email,
            phone,
            location
        });

    });

}


// =========================================
// LOGIN FORM
// =========================================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", function (event) {

        // Prevent page refresh
        event.preventDefault();

        // Get login values
        const email =
            document.getElementById("loginEmail").value.trim();

        const password =
            document.getElementById("loginPassword").value;


        // Basic validation
        if (!email || !password) {

            alert("Please enter your email and password.");

            return;
        }


        // Temporary login message
        alert("Login form is valid.");

        console.log({
            email,
            password
        });

    });

}

