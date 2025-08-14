const API_BASE_URL = '/auth_php/api'; // Adjust this to your PHP API path code base

class AuthService {
    // Check authentication status
    static async checkAuth() {
        try {
            const response = await fetch(`${API_BASE_URL}/check-auth.php`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Auth check failed:', error);
            return { success: false, message: 'Network error' };
        }
    }

    // Login user
    static async login(email, password) {
        try {
            const response = await fetch(`${API_BASE_URL}/login.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
                credentials: 'include' // Important for sessions to work
            });
            return await response.json();
        } catch (error) {
            console.error('Login failed:', error);
            return { success: false, message: 'Network error' };
        }
    }

    // Register user
    static async register(name, email, password) {
        try {
            const response = await fetch(`${API_BASE_URL}/register.php`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ 
                    full_name: name, 
                    email, 
                    password 
                }),
                credentials: 'include'
            });
            return await response.json();
        } catch (error) {
            console.error('Registration failed:', error);
            return { success: false, message: 'Network error' };
        }
    }

    // Logout user
    static async logout() {
        try {
            const response = await fetch(`${API_BASE_URL}/logout.php`, {
                method: 'POST',
                credentials: 'include'
            });
            return await response.json();
        } catch (error) {
            console.error('Logout failed:', error);
            return { success: false, message: 'Network error' };
        }
    }
}