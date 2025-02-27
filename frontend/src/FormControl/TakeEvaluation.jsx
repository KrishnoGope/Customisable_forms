import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const TakeEvaluation = () => {
  const { formId } = useParams();
  const [questions, setQuestions] = useState([]);
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/forms/${formId}`);
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };
    fetchQuestions();
  }, [formId]);

  // Handle response change
  const handleResponseChange = (questionId, value) => {
    setResponses((prevResponses) => {
      const newResponses = [...prevResponses];
      const index = newResponses.findIndex((resp) => resp.question_id === questionId);
      if (index > -1) {
        newResponses[index].response_text = value;
      } else {
        newResponses.push({ question_id: questionId, response_text: value });
      }
      return newResponses;
    });
  };

  // Submit exam answers
  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/forms/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ form_id: formId, responses }),
      });
      const data = await response.json();
      if (response.ok) {
        alert("Submit successful");
        // Reset responses
        setResponses([]);
        // Reset questions or re-fetch them if needed
        setQuestions([]);
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Take Evaluation</h2>
      {questions.length > 0 ? (
        <form>
          {questions.map((question, index) => (
            <div key={question.id} className="mb-3">
              <label className="form-label">
                {index + 1}. {question.question_text}
              </label>

              {/* Different input types based on question type */}
              {question.type === "text" && (
                <input
                  type="text"
                  className="form-control"
                  onChange={(e) => handleResponseChange(question.id, e.target.value)}
                />
              )}

              {question.type === "radio" && (
                <div>
                  {JSON.parse(question.options).map((option, i) => (
                    <div key={i} className="form-check">
                      <input
                        type="radio"
                        className="form-check-input"
                        name={`question${question.id}`}
                        value={option}
                        onChange={() => handleResponseChange(question.id, option)}
                      />
                      <label className="form-check-label">{option}</label>
                    </div>
                  ))}
                </div>
              )}

              {question.type === "checkbox" && (
                <div>
                  {JSON.parse(question.options).map((option, i) => (
                    <div key={i} className="form-check">
                      <input
                        type="checkbox"
                        className="form-check-input"
                        value={option}
                        onChange={(e) => {
                          const value = e.target.checked ? option : "";
                          handleResponseChange(question.id, value);
                        }}
                      />
                      <label className="form-check-label">{option}</label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}

          <button type="button" className="btn btn-primary" onClick={handleSubmit}>
            Submit Responses
          </button>
        </form>
        ) : (
          <p>Thanks for your response...</p>
      )}
    </div>
  );
};

export default TakeEvaluation;