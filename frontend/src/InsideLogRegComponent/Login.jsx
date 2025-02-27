import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import FooterArea from '../FooterArea';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  // Email validation
  const isValidEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isFormValid = isValidEmail(email) && password.length >= 4;

  const handleSubmit = async (e) => {
    e.preventDefault(); //This line prevents the default behavior of the event.
    if (!isFormValid) {
      setError('Please fill all fields correctly!');
      return;
    }
    setError('');

    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });
      localStorage.setItem('isAuthenticated', 'true'); 
      localStorage.setItem('userID', response.data.user.id); // Save User ID to localStorage
      localStorage.setItem('userName', response.data.user.name); 
      localStorage.setItem('userRole', response.data.user.role); 

      // Navigate based on user role
      const UserID = response.data.user.id; //id receive from data base and store it inside UserID.
      const name = response.data.user.name;
      if (response.data.user.role === 'admin') {
        navigate(`/admin/${UserID}/${name}`);
      } else if (response.data.user.role === 'user') {
        navigate(`/user/${UserID}/${name}`);
      } else {
        navigate('/');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError(error.response?.data?.error || 'Login failed');
    }
  };

  return (
    <>
    <div className="d-flex justify-content-center align-items-center vh-100 text-white bg-body-secondary">
      <div className="card p-4 shadow-lg text-dark border border-secondary" style={{ width: '50vh', borderRadius: '10px' }}>
        <h3 className="text-center mb-3">🔑 Login</h3>
        {error && <div className="alert alert-danger">{error}</div>}
        <form onSubmit={handleSubmit}>
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
                placeholder="Enter your password"
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
          <button type="submit" className="btn btn-success w-100" disabled={!isFormValid}>
            Login
          </button>
        </form>
        <p className="text-center mt-3">
          Do not have an account? <Link to="/register" className="text-danger fw-bold">Register</Link>
        </p>
      </div>
    </div>
    <FooterArea />
   </>
  );
};

export default Login;