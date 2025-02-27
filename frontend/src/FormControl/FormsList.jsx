import { useState, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { InputGroup, Form, Button } from 'react-bootstrap';

const FormsList = () => {
  const { user_id } = useParams(); 
  const [forms, setForms] = useState([]);
  const [filteredForms, setFilteredForms] = useState([]);
  const [selectedForm, setSelectedForm] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  // Fetch forms from the backend
  const fetchForms = useCallback(async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/forms?user_id=${user_id}`, {
        method: 'GET',
      });

      if (!response.ok) {
        console.error("Error fetching forms:", response.status, response.statusText);
        return;
      }

      const data = await response.json();
      setForms(data);
      setFilteredForms(data); // Initialize filtered list with full data
    } catch (error) {
      console.error("Error fetching forms:", error);
      alert("Failed to fetch forms. Please try again later.");
    }
  }, [user_id]);

  useEffect(() => {
    fetchForms();
  }, [fetchForms]);

  // Function to handle form updates functionality
  const handleUpdate = async () => {
    if (!selectedForm) return;
    try {
      await fetch(`http://localhost:5000/api/forms/update/${selectedForm}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: newTitle }),
      });
      alert("Form updated successfully!");
      fetchForms();
      setNewTitle("");
      setSelectedForm("");
    } catch (error) {
      console.error("Error updating form:", error);
      alert("Failed to update form. Please try again.");
    }
  };

  // Function to handle form deletion
  const handleDelete = async () => {
    if (!selectedForm) return;
    try {
      await fetch(`http://localhost:5000/api/forms/delete/${selectedForm}`, {
        method: "DELETE",
      });
      alert("Form deleted successfully!");
      fetchForms();
      setSelectedForm("");
    } catch (error) {
      console.error("Error deleting form:", error);
      alert("Failed to delete form. Please try again.");
    }
  };

  // Dynamic search function
  useEffect(() => {
    const filtered = forms.filter(form =>
      form.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      form.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredForms(filtered);
  }, [searchTerm, forms]);

  return (
    <div style={{ backgroundColor: '#B2C8E4' }}>
      <div className="container  d-flex  w-100 "style={{ minHeight: '100vh', overflowY: 'auto' }}>
        {/* Sidebar Dashboard */}
        {isAuthenticated && user_id != 0 && (
          <div className="position-fixed top-0 start-0 p-3 border-end bg-secondary mt-5" style={{ width: "35vh", height: "97vh" }}>
            <h4 className="mb-2 pt-5 pb-2 text-center">Dashboard</h4>
            <select
              className="form-select mb-2"
              value={selectedForm}
              onChange={(e) => setSelectedForm(e.target.value)}
            >
              <option value="">Select Form</option>
              {forms.map((form) => (
                <option key={form.id} value={form.id}>
                  {form.title}
                </option>
              ))}
            </select>

            <input
              type="text"
              className="form-control mb-2"
              placeholder="New title"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
            />
            
            <button className="btn btn-primary w-100 mb-2"
              onClick={() => { if (newTitle.trim() !== "") { handleUpdate(); } else { alert("Please select a form and set a new title"); } }}>
              Update
            </button>
            <button className="btn btn-danger w-100 mb-2" onClick={handleDelete}>
              Delete
            </button>
          </div>
        )}

        {/* Forms List (Available Quize) */}
        <div className="flex-grow-1 ms-4">
          <div className="d-flex justify-content-center align-items-center mb-4 pt-4">
            <h3 className="text-center p-3">(Available Forms or Quiz)</h3>
            {/* Search bar */}
                <div className="d-flex bg-success rounded-pill shadow-sm p-2 d-flex align-items-center" style={{ width: '45vh' }}>
                  <InputGroup>
                    <Form.Control
                      type="search"
                      placeholder="Search by Author or Title"
                      className="rounded-pill shadow-sm border-0 px-3 w-auto"
                      aria-label="Search"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <Button className="btn btn-light rounded-pill px-3 ms-2">🔍</Button>
                  </InputGroup>
                </div>  
          </div>
          {/* Table or expected form or quiz */}
          {filteredForms.length > 0 ? (
            <div className="table-responsive d-flex justify-content-center">
              <table className="table table-striped table-bordered text-center w-75">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Start Quiz</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredForms.map((form, index) => (
                    <tr key={form.id}>
                      <td>{index + 1}</td>
                      <td>
                        <Link to={`/form/${form.id}`} className="text-decoration-none fw-bold"
                          onClick={(e) => {
                            if (!isAuthenticated) {
                              e.preventDefault();
                              alert("Please log in to attempt the quiz.");
                            }
                          }}
                        >
                          {form.title}
                        </Link>
                      </td>
                      <td><span className="fw-semibold">{form.name || "Unknown"}</span></td>
                      <td>
                        <Link to={`/form/${form.id}`} className="btn btn-primary btn-sm"
                          onClick={(e) => {
                            if (!isAuthenticated) {
                              e.preventDefault();
                              alert("Please log in to attempt the quiz.");
                            }
                          }}
                        >
                          Start Quiz
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="text-muted text-center">No forms available at the moment.</p>
          )}
        </div>
      </div>
    </div>  
  );
};

export default FormsList;