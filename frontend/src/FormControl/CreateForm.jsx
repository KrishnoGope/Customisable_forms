import { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom"; 
import PropTypes from "prop-types";

const CreateForm = (props) => {
  const [formTitle, setFormTitle] = useState("");
  const [questions, setQuestions] = useState([{ question_text: "", type: "text", options: [] }]);
  const navigate = useNavigate();

  // Add a new question
  const addQuestion = () => {
    setQuestions([...questions, { question_text: "", type: "text", options: [] }]);
  };

  // Update question text
  const updateQuestionText = (index, text) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].question_text = text;
    setQuestions(updatedQuestions);
  };

  // Update question type and reset options if needed
  const updateQuestionType = (index, type) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].type = type;
    if (type === "radio" || type === "checkbox") {
      updatedQuestions[index].options = [""];
    } else {
      updatedQuestions[index].options = [];
    }
    setQuestions(updatedQuestions);
  };

  // Add an option to multiple-choice or checkbox questions
  const addOption = (qIndex) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options.push("");
    setQuestions(updatedQuestions);
  };

  // Update option text
  const updateOptionText = (qIndex, optIndex, value) => {
    const updatedQuestions = [...questions];
    updatedQuestions[qIndex].options[optIndex] = value;
    setQuestions(updatedQuestions);
  };

  // Create Form API Call
  const handleCreateForm = async () => {
    if (!formTitle) {
      alert("Please make some questions");
      return;
    }
    try {
      const response = await fetch("http://localhost:5000/api/forms/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: formTitle, user_id: props.UserID, questions }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Form created successfully!");
        setFormTitle("");
        setQuestions([{ question_text: "", type: "text", options: [] }]);
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error creating form:", error);
    }
  };

  // Navigate to the forms list page
  const goToFormsList = () => {
    const user_id = props.UserID;
    navigate(`/forms-list/${user_id}`);
  };

  return (
    <div className="container mt-4 p-4 border rounded shadow bg-light">
      <h2 className="text-center text-primary mb-4">📝 Create a New Form</h2>

      {/* Form Title */}
      <div className="mb-3">
        <label className="form-label fw-bold">Form Title</label>
        <input
          type="text"
          className="form-control"
          value={formTitle}
          onChange={(e) => setFormTitle(e.target.value)}
          placeholder="Enter form title"
        />
      </div>

      {/* Questions Section */}
      {questions.map((question, qIndex) => (
        <div key={qIndex} className="mb-4 p-3 border rounded bg-white">
          <label className="form-label fw-bold">Question {qIndex + 1}</label>
          <input
            type="text"
            className="form-control mb-2"
            value={question.question_text}
            onChange={(e) => updateQuestionText(qIndex, e.target.value)}
            placeholder="Enter question text"
          />

          {/* Select Question Type */}
          <select
            className="form-select mb-2"
            value={question.type}
            onChange={(e) => updateQuestionType(qIndex, e.target.value)}
          >
            <option value="text">Text</option>
            <option value="radio">Multiple Choice</option>
            <option value="checkbox">Checkbox</option>
          </select>

          {/* Options for Multiple Choice / Checkbox */}
          {(question.type === "radio" || question.type === "checkbox") && (
            <div className="mt-2">
              <strong>Options:</strong>
              {question.options.map((option, optIndex) => (
                <div key={optIndex} className="d-flex align-items-center mt-2">
                  <input
                    type="text"
                    className="form-control me-2"
                    value={option}
                    onChange={(e) => updateOptionText(qIndex, optIndex, e.target.value)}
                    placeholder={`Option ${optIndex + 1}`}
                  />
                </div>
              ))}
              <button className="btn btn-outline-secondary mt-2" onClick={() => addOption(qIndex)}>➕ Add Option</button>
            </div>
          )}
        </div>
      ))}

      <button className="btn btn-success mt-3 ml-3 mr-3" onClick={addQuestion}>➕ Add Question</button>
      <button className="btn btn-primary mt-3 ms-3" onClick={handleCreateForm}>🚀 Create Form</button>
      
      {/* Button to view forms */}
      <button className="btn btn-info mt-3 ms-3" onClick={goToFormsList}>View Created Forms</button>
    </div>
  );
};

// Define PropTypes for UserID
CreateForm.propTypes = {
  UserID: PropTypes.string.isRequired,
};

export default CreateForm;