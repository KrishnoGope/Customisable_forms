import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Quiz = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(`/forms-list/0`);
  }, [navigate]);

  return (
    <div className="container mt-4">
      <h2>Forms Page</h2>
    </div>
  );
};

export default Quiz;