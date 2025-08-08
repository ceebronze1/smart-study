// auth.js

// Signup handler (call from signup.html)
function signup() {
  const fullName = document.getElementById("fullname")?.value?.trim();
  const email = document.getElementById("email")?.value?.trim();
  const password = document.getElementById("password")?.value;

  if (!fullName || !email || !password) {
    alert("Please fill all fields.");
    return;
  }

  const user = { fullName, email, password };
  localStorage.setItem("smartstudyUser", JSON.stringify(user));
  alert("Signup successful. Please log in.");
  window.location.href = "Login.html";
}

// Login handler (call from login.html)
function login() {
  const email = document.getElementById("loginEmail")?.value?.trim();
  const password = document.getElementById("loginPassword")?.value;

  if (!email || !password) {
    alert("Please fill all fields.");
    return;
  }

  const savedUser = JSON.parse(
    localStorage.getItem("smartstudyUser") || "null"
  );

  if (
    savedUser &&
    email === savedUser.email &&
    password === savedUser.password
  ) {
    // Save session
    localStorage.setItem("loggedInUser", savedUser.email);
    alert("Login successful!");
    window.location.href = "dashboard.html";
  } else {
    alert("Invalid credentials.");
  }
}

// Logout
function logout() {
  localStorage.removeItem("loggedInUser");
  alert("Logged out.");
  window.location.href = "Login.html";
}

// Session check (call on dashboard load)
function ensureLoggedIn() {
  const user = localStorage.getItem("loggedInUser");
  if (!user) {
    alert("Access denied. Please log in first.");
    window.location.href = "Login.html";
  }
}
