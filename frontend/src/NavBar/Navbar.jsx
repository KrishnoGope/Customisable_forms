import { useState, useEffect } from "react";
import { Navbar, Nav, Container, Button, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { Sun, Moon } from 'react-bootstrap-icons';

const MyNavbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [darkMode, setDarkMode] = useState(false); // State for dark mode
  const navigate = useNavigate();
  const userID = localStorage.getItem('userID');
  const userName = localStorage.getItem('userName');
  const userRole = localStorage.getItem('userRole');
  
  // Check if the user is authenticated by checking localStorage
  const authStatus = localStorage.getItem('isAuthenticated');
  useEffect(() => {
    // Update authentication state based on localStorage value
    const authStatus = localStorage.getItem('isAuthenticated');
    setIsAuthenticated(authStatus === 'true'); 

    // Check dark mode preference from localStorage
    const mode = localStorage.getItem('darkMode');
    setDarkMode(mode === 'true');
  }, [authStatus]);

  // Handle logout by confirming the action, clearing localStorage, and redirecting to home
  const handleLogout = () => {
      if (window.confirm("Are you sure you want to log out?")) {
        localStorage.removeItem('isAuthenticated');
        localStorage.removeItem('userID'); 
        localStorage.removeItem('userName'); 
        localStorage.removeItem('userRole'); 
        setIsAuthenticated(false); 
        navigate('/');
      }
  }

  // Toggle dark mode
  const toggleDarkMode = () => {
    setDarkMode(prevMode => {
      const newMode = !prevMode;
      localStorage.setItem('darkMode', newMode);
      return newMode;
    });
  };

  return (
    <Navbar variant={darkMode ? "dark" : "light"} expand="lg" className={`shadow ${darkMode ? 'bg-dark' : 'navbar navbar-dark bg-success'} sticky-top`} style={{ width: "100vw" }}>
      <Container>
        <Navbar.Brand as={Link} to="/">MyApp</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">Education</Nav.Link>
            <Nav.Link as={Link} to="/quiz">Quiz</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contact</Nav.Link>
            {isAuthenticated ? (
              <Nav.Link as={Link} to={`/${userRole}/${userID}/${userName}`}>Profile</Nav.Link>
            ) : (
              <Nav.Link as={Link} to="/login">Profile</Nav.Link>
            )}
          </Nav>

          <Form className="d-flex align-items-center">
            {/* Dark mode toggle button */}
            <Button className="me-2" onClick={toggleDarkMode} variant="outline-light">
              {darkMode ? <Sun color="yellow" /> : <Moon color="white" />}
            </Button>

            {isAuthenticated ? (
              <Button className="btn btn-danger rounded-pill px-4 ms-3" onClick={handleLogout}>Logout</Button>
            ) : (
              <Button as={Link} to="/login" className="btn btn-primary rounded-pill px-4 ms-3">Login</Button>
            )}
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;