import { useParams } from "react-router-dom";
import CreateForm from "../FormControl/CreateForm";

const Admin = () => {
  const { UserID, name } = useParams(); // Extracting UserID from the URL

  return (
    <div>
      <h3 className="text-center text-primary fw-bold p-3 bg-light border rounded shadow">
        Hi {name}, Welcome to your Admin profile
      </h3>
      {/* Pass UserID as a prop */}
      <CreateForm UserID={UserID} />
    </div>
  );
};

export default Admin;