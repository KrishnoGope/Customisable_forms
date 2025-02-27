import { BrowserRouter as Router } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import All_Routing from "./RouteFiles/All_Routing";
import MyNavbar from "./NavBar/Navbar";

function App() {
  return (
    <Router>
      <MyNavbar />
      <All_Routing />
    </Router>
  );
}

export default App;