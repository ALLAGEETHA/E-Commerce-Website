import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './Login.css';

/**
 * Login Component
 * Simple and clean login page for user authentication
 */
const Login = () => {
  const navigate = useNavigate();
  
  // Form state for login credentials
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  // Error state for displaying validation messages
  const [error, setError] = useState('');

  /**
   * Handle input field changes
   * Updates the form data state as user types
   * 
   * @param {Event} e - The change event from input fields
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  /**
   * Handle form submission
   * Validates credentials and handles login
   * For demo purposes, accepts any email/password combination
   * 
   * @param {Event} e - The form submit event
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    // Simple email validation
    if (!formData.email.includes('@')) {
      setError('Please enter a valid email address');
      return;
    }

    // For demo: accept any credentials and redirect to home
    // In a real app, this would authenticate with a backend
    navigate('/');
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1 className="login-logo">ShoppyGlobe</h1>
          <p className="login-subtitle">Welcome back! Please login to your account.</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="login-error">{error}</div>}

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="form-input"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="form-input"
              required
            />
          </div>

          <button type="submit" className="login-button">
            Login
          </button>
        </form>

        <div className="login-footer">
          <p>
            Don't have an account?{' '}
            <Link to="/" className="signup-link">
              Continue as Guest
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;

