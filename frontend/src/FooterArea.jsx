import { Container, Row, Col, Nav } from 'react-bootstrap';
import { FaFacebook, FaInstagram, FaTwitter, FaGithub } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';


const FooterArea = () => {
  return (
    <footer className="bg-dark text-light py-4">
      <Container>
        <Row>
          <Col md={6} className="text-center text-md-start">
            <span className="h5">MyApp</span>
            <p className="mt-2">© 2025 MyApp. All rights reserved.</p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <Nav>
              <Nav.Link href="https://facebook.com" className="text-light" target="_blank" rel="noopener noreferrer">
                <FaFacebook size={24} />
              </Nav.Link>
              <Nav.Link href="https://instagram.com" className="text-light" target="_blank" rel="noopener noreferrer">
                <FaInstagram size={24} />
              </Nav.Link>
              <Nav.Link href="https://twitter.com" className="text-light" target="_blank" rel="noopener noreferrer">
                <FaTwitter size={24} />
              </Nav.Link>
              <Nav.Link href="mailto:example@gmail.com" className="text-light" target="_blank" rel="noopener noreferrer">
                <SiGmail size={24} />
              </Nav.Link>
              <Nav.Link href="https://github.com" className="text-light" target="_blank" rel="noopener noreferrer">
                <FaGithub size={24} />
              </Nav.Link>
            </Nav>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default FooterArea;