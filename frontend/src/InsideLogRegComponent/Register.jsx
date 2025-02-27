import { useState } from 'react';
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const role = 'user'; //by default treat as a user
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');


  // Email validation
  const isValidEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isFormValid = isValidEmail(email) && password.length >= 4;
  const passwordsMatch = password === confirmPassword && password.length >= 4;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) {
      setError('Please fill all fields correctly!');
      return;
    }
    setError('');

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role }),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Registration successful!')
        setName('');
        setEmail('');
        setPassword('');
        setConfirmPassword('');
        setError('');
      } else {
        setError(data.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setError('Server error');
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-success text-white">
      <div className="card p-4 shadow-lg text-dark" style={{ width: '400px', borderRadius: '10px' }}>
        <h3 className="text-center mb-3">📝 Register</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter your full name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Email Address</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <div className="input-group">
              <input
                type={showPassword ? 'text' : 'password'}
                className="form-control"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="btn btn-outline-secondary"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? '🙈' : '👁'}
              </button>
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {!passwordsMatch && confirmPassword.length > 0 && (
              <div className="text-danger small">Passwords do not match</div>
            )}
          </div>
          <button type="submit" className="btn btn-primary w-100" disabled={!isFormValid}>
            Register
          </button>
        </form>
        <p className="text-center mt-3">
          Already have an account? <Link to="/login" className="text-success fw-bold">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;