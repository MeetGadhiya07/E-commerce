const form = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");

form.addEventListener("submit", function (event) {
    event.preventDefault();
    validateForm();
});

function validateForm() {
    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value.trim();

    const registeredUsers = JSON.parse(localStorage.getItem("registeredUsers")) || [];
    const foundUser = registeredUsers.find(user => user.email === emailValue && user.password === passwordValue);

    if (!foundUser) {
        setError(emailError, "Invalid email or password");
        setError(passwordError, "Invalid email or password");
        return;
    }

    setError(emailError, null);
    setError(passwordError, null);

    alert("Login successful! Redirecting to home page.");
    window.location.href = "/home.html";
}

function setError(element, message) {
    element.textContent = message;
}
