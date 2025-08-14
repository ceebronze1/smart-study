document.addEventListener('DOMContentLoaded', async function() {
    // Check auth status on page load
    const authCheck = await AuthService.checkAuth();
    
    if (authCheck.success) {
        showProtectedContent(authCheck.data.user);
    } else {
        showAuthForms();
    }

    // Setup event listeners
    setupAuthForms();
    document.getElementById('logout-btn').addEventListener('click', handleLogout);
});

function showProtectedContent(user) {
    document.getElementById('auth-forms').style.display = 'none';
    const protectedContent = document.getElementById('protected-content');
    protectedContent.style.display = 'block';
    
    // Display user info
    document.getElementById('user-name').textContent = user.full_name;
    document.getElementById('user-email').textContent = user.email;
}

function showAuthForms() {
    document.getElementById('protected-content').style.display = 'none';
    const authForms = document.getElementById('auth-forms');
    authForms.style.display = 'block';
    
    // Create forms dynamically
    authForms.innerHTML = `
        <div class="tab-buttons">
            <button class="tab-btn active" data-tab="login">Login</button>
            <button class="tab-btn" data-tab="register">Register</button>
        </div>
        
        <div id="login-form" class="tab-content active">
            <form id="loginForm">
                <div class="form-group">
                    <label for="login-email">Email</label>
                    <input type="email" id="login-email" required>
                </div>
                <div class="form-group">
                    <label for="login-password">Password</label>
                    <input type="password" id="login-password" required>
                </div>
                <button type="submit">Login</button>
                <div id="login-message" class="error-message"></div>
            </form>
        </div>
        
        <div id="register-form" class="tab-content">
            <form id="registerForm">
                <div class="form-group">
                    <label for="register-name">Full Name</label>
                    <input type="text" id="register-name" required>
                </div>
                <div class="form-group">
                    <label for="register-email">Email</label>
                    <input type="email" id="register-email" required>
                </div>
                <div class="form-group">
                    <label for="register-password">Password</label>
                    <input type="password" id="register-password" required>
                </div>
                <button type="submit">Register</button>
                <div id="register-message" class="error-message"></div>
            </form>
        </div>
    `;
}

function setupAuthForms() {
    // Tab switching
    document.addEventListener('click', function(e) {
        if (e.target.classList.contains('tab-btn')) {
            const tabButtons = document.querySelectorAll('.tab-btn');
            tabButtons.forEach(btn => btn.classList.remove('active'));
            e.target.classList.add('active');
            
            const tabContents = document.querySelectorAll('.tab-content');
            tabContents.forEach(content => content.classList.remove('active'));
            
            const tabId = e.target.getAttribute('data-tab') + '-form';
            document.getElementById(tabId).classList.add('active');
        }
    });

    // Login form submission
    document.addEventListener('submit', async function(e) {
        if (e.target.id === 'loginForm') {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            const messageEl = document.getElementById('login-message');
            
            const result = await AuthService.login(email, password);
            if (result.success) {
                messageEl.textContent = 'Login successful!';
                messageEl.className = 'success-message';
                showProtectedContent(result.data.user);
            } else {
                messageEl.textContent = result.message;
                messageEl.className = 'error-message';
            }
        }
        
        // Register form submission
        if (e.target.id === 'registerForm') {
            e.preventDefault();
            const name = document.getElementById('register-name').value;
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            const messageEl = document.getElementById('register-message');
            
            const result = await AuthService.register(name, email, password);
            if (result.success) {
                messageEl.textContent = 'Registration successful! Please login.';
                messageEl.className = 'success-message';
                
                // Switch to login tab
                document.querySelector('.tab-btn[data-tab="login"]').click();
                document.getElementById('login-email').value = email;
            } else {
                messageEl.textContent = result.message;
                messageEl.className = 'error-message';
            }
        }
    });
}

async function handleLogout() {
    const result = await AuthService.logout();
    if (result.success) {
        showAuthForms();
    } else {
        alert('Logout failed: ' + result.message);
    }
}