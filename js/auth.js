// =========================================
// REGISTRATION FORM
// =========================================

const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", async function (event) {

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



        try {

            const response = await fetch(
                "http://localhost:5000/api/auth/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        full_name: fullName,
                        email,
                        password
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {

                alert(data.message);

                return;

            }

            alert("Registration successful!");

            registerForm.reset();

            window.location.href = "login.html";

        } catch (error) {

            console.error(error);

            alert("Unable to register.");

        }

    });

}



// =========================================
// LOGIN FORM
// =========================================

const loginForm = document.getElementById("loginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async function (event) {

        // Prevent page refresh
        event.preventDefault();

        // Get login values
        const email =
            document.getElementById("loginEmail").value.trim();

        const password =
            document.getElementById("loginPassword").value;



        try {

            const response = await fetch(
                "http://localhost:5000/api/auth/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {

                alert(data.message);

                return;

            }

            localStorage.setItem("token", data.token);

            localStorage.setItem(
                "user",
                JSON.stringify(data.user)
            );

            alert("Login successful!");

            window.location.href = "index.html";

        } catch (error) {

            console.error(error);

            alert("Unable to login.");

        }


        
    });

}


