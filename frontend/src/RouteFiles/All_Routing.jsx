import { Routes, Route } from "react-router-dom";
import Education from "../NavBar/Education";
import Quiz from "../NavBar/Quiz";
import Contact from "../NavBar/Contact";
import Login from "../InsideLogRegComponent/Login";
import Register from "../InsideLogRegComponent/Register";
import ProtectedRoute from "./ProtectedRoute";
import Admin from "../InsideLogRegComponent/Admin";
import User from "../InsideLogRegComponent/User";
import FormsList from "../FormControl/FormsList";
import TakeEvaluation from "../FormControl/TakeEvaluation";
const isAuthenticated = localStorage.getItem('isAuthenticated')=== 'true';

const All_Routing = () => (
  <Routes>
    <Route path="/" element={<Education />} />
    <Route path="/quiz" element={<Quiz />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    
    {/* Protected Routes */}
    <Route path="/admin/:UserID/:name" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
    <Route path="/user/:UserID/:name" element={<ProtectedRoute><User /></ProtectedRoute>} />

    {isAuthenticated ?(
    <Route path="/forms-list/:user_id" element={<ProtectedRoute><FormsList /></ProtectedRoute>} />):
    (<Route path="/forms-list/:user_id" element={<FormsList />} />)}

    <Route path="/form/:formId" element={<ProtectedRoute><TakeEvaluation /></ProtectedRoute>} />
  </Routes> 
);

export default All_Routing;