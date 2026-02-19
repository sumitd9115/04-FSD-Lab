document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let fullname = document.getElementById("fullname").value.trim();
    let email = document.getElementById("email").value.trim();
    let message = document.getElementById("message").value.trim();
    let errorMsg = document.getElementById("errorMsg");

    errorMsg.innerHTML = "";

    let nameRegex = /^[A-Za-z\s]{3,}$/;
    if (!nameRegex.test(fullname)) {
        errorMsg.innerHTML = "Please enter a valid full name (only letters, minimum 3 characters).";
        return;
    }

    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        errorMsg.innerHTML = "Please enter a valid email address.";
        return;
    }

    if (message.length < 10) {
        errorMsg.innerHTML = "Message must be at least 10 characters long.";
        return;
    }

    alert("Form submitted successfully!");
    this.submit(); 
});