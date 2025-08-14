
// src/pages/Applications/DeleteApplication.js
import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const DeleteApplication = ({ applications, setApplications }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const handleDelete = () => {
    setApplications(prev => prev.filter(app => app.id.toString() !== id));
    alert("Application deleted successfully!");
    navigate("/applications");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Delete Application</h2>
      <p>Are you sure you want to delete this application?</p>
      <button 
        style={{ background: "red", color: "white", marginRight: "10px" }}
        onClick={handleDelete}
      >
        Yes, Delete
      </button>
      <button onClick={() => navigate("/applications")}>Cancel</button>
    </div>
  );
};

export default DeleteApplication;
