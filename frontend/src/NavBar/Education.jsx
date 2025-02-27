import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import FooterArea from "../FooterArea";

const topics = [
  {
    title: "JavaScript",
    description: "JavaScript is a versatile scripting language used for web development. It enables dynamic content, interactive elements, and powerful client-side scripting. JavaScript works alongside HTML and CSS to create engaging web pages. With ES6 and beyond, it has introduced modern syntax and features like arrow functions, classes, and async/await.",
    link: "https://www.w3schools.com/js/"
  },
  {
    title: "TypeScript",
    description: "TypeScript is a strongly typed superset of JavaScript that compiles to plain JavaScript. It introduces static typing, making it easier to catch errors during development. TypeScript is widely used in large-scale applications due to its improved code maintainability and developer experience.",
    link: "https://www.w3schools.com/typescript/"
  },
  {
    title: "React.js",
    description: "React.js is a JavaScript library for building user interfaces using components. It allows developers to create reusable UI components and efficiently manage application state. React utilizes the virtual DOM for optimized rendering, ensuring high performance and a smooth user experience.",
    link: "https://www.w3schools.com/REACT/DEFAULT.ASP"
  },
  {
    title: "Angular.js",
    description: "Angular.js is a structural framework for dynamic web applications. It extends HTML with additional attributes, making it easier to build single-page applications. Angular provides powerful features like two-way data binding, dependency injection, and modular development.",
    link: "https://www.w3schools.com/angular/"
  },
  {
    title: "Vue.js",
    description: "Vue.js is a progressive JavaScript framework used for building user interfaces. It is designed to be incrementally adaptable and is known for its simplicity, flexibility, and ease of integration with other projects. Vue provides a reactive data binding system and a virtual DOM for efficient rendering.",
    link: "https://www.w3schools.com/vue/"
  },
  {
    title: "Bootstrap 5",
    description: "Bootstrap 5 is a front-end framework for building responsive and mobile-first web applications. It offers a comprehensive set of prebuilt components, utility classes, and a flexible grid system. Unlike previous versions, Bootstrap 5 removes jQuery dependency, improves customization, and introduces better styling options.",
    link: "https://getbootstrap.com/docs/5.0/getting-started/introduction/"
  },
  {
    title: "Node.js",
    description: "Node.js is a JavaScript runtime that allows execution of JavaScript on the server-side. It is built on Chrome's V8 engine and is widely used for building scalable network applications. Node.js supports non-blocking, event-driven architecture, making it ideal for real-time applications.",
    link: "https://www.w3schools.com/nodejs/"
  },
  {
    title: "Express.js",
    description: "Express.js is a minimal and flexible Node.js web application framework. It simplifies the process of building APIs and web applications by providing a robust routing system and middleware support. Express.js is widely used in full-stack JavaScript development.",
    link: "https://expressjs.com/"
  },
  {
    title: "PHP",
    description: "PHP is a popular server-side scripting language designed for web development. It powers many content management systems (CMS) like WordPress and Drupal. PHP is known for its ease of use, extensive libraries, and ability to integrate seamlessly with databases like MySQL.",
    link: "https://www.w3schools.com/php/"
  },
  {
    title: "Laravel",
    description: "Laravel is a PHP framework designed for web application development. It provides an elegant syntax, built-in authentication, and database migration support. Laravel simplifies common tasks like routing, sessions, caching, and security, making it a preferred choice for modern web applications.",
    link: "https://www.w3schools.in/laravel"
  },
  {
    title: ".NET",
    description: ".NET is a software framework developed by Microsoft for building applications. It supports multiple programming languages, including C# and VB.NET. .NET offers a comprehensive development environment for creating web, desktop, and mobile applications with high performance and security.",
    link: "https://www.w3schools.com/asp/default.ASP"
  },
  {
    title: "MVC",
    description: "MVC (Model-View-Controller) is a software architectural pattern for implementing user interfaces. It separates an application into three interconnected components: Model (data and business logic), View (UI), and Controller (handles user interactions). MVC enhances code organization, scalability, and parallel development.",
    link: "https://www.w3schools.in/mvc-architecture"
  },
  {
    title: "Ruby",
    description: "Ruby is a dynamic, open-source programming language known for its simplicity and productivity. It has an elegant syntax that is easy to read and write. Ruby is often used for web development, particularly with the Ruby on Rails framework, which simplifies application development.",
    link: "https://www.tutorialspoint.com/ruby/index.htm"
  },
  {
    title: "Django",
    description: "Django is a high-level Python web framework that encourages rapid development and clean, pragmatic design. It follows the DRY (Don't Repeat Yourself) principle and includes built-in features for authentication, database management, and security, making it a preferred choice for scalable web applications.",
    link: "https://www.w3schools.com/django/"
  },
  {
    title: "Spring Boot",
    description: "Spring Boot is an open-source Java-based framework used for building standalone, production-ready Spring applications. It simplifies the setup and deployment process by providing pre-configured templates and embedded servers, making Java development faster and more efficient.",
    link: "https://www.geeksforgeeks.org/spring-boot/"
  }
];

const Education = () => {
  return (
    <div >
      <Container className="bg-white p-5 rounded shadow" >
        <h1 className="text-center mb-4 text-primary fw-bold">Technology Stack Overview</h1>
        <Row>
          {topics.map((topic, index) => (
            <Col key={index} md={4} className="mb-4">
              <Card className="shadow-lg h-100 border-0 d-flex flex-column">
                <Card.Body className="p-4 border border-info d-flex flex-column flex-grow-1">
                  <Card.Title className="text-center text-dark fw-bold">{topic.title}</Card.Title>
                  <Card.Text className="text-justify text-secondary flex-grow-1" style={{ textAlign: "justify" }}>
                    {topic.description}
                  </Card.Text>
                  <div className="text-center mt-auto">
                    <Button 
                      variant="primary" 
                      href={topic.link} 
                      target="_blank" 
                      className="btn btn-secondary"
                      rel="noopener noreferrer"
                    >
                      Learn More
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
      <FooterArea />
    </div>
  );
};

export default Education;