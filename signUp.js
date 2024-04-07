document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("signupForm");
    signupForm.addEventListener("submit", function (event) {
        event.preventDefault();
        validateForm();
    });
});

function validateForm() {
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value.trim();

    if (emailValue === "") {
        setError(emailError, "Email is required");
        return;
    } else {
        setError(emailError, null);
    }

    if (passwordValue === "") {
        setError(passwordError, "Password is required");
        return;
    } else {
        setError(passwordError, null);
    }

    const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    registeredUsers.push({ email: emailValue, password: passwordValue });
    localStorage.setItem("registeredUsers", JSON.stringify(registeredUsers));

    alert("Sign up successful! Redirecting to login page.");
    window.location.href = "/index.html";
}

function setError(element, message) {
    element.textContent = message;
}
