import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const DeleteApplication = () => {
  const { id } = useParams(); // Get application ID from URL
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);

  useEffect(() => {
    const storedApplications = JSON.parse(localStorage.getItem("creditCardApplications")) || [];
    const appToDelete = storedApplications.find((app) => app.id === id);
    setApplication(appToDelete);
  }, [id]);

  const handleConfirmDelete = () => {
    const storedApplications = JSON.parse(localStorage.getItem("creditCardApplications")) || [];
    const updated = storedApplications.filter((app) => app.id !== id);
    localStorage.setItem("creditCardApplications", JSON.stringify(updated));
    navigate("/applications/view"); // Go back to View list after delete
  };

  const handleCancel = () => {
    navigate("/applications/view");
  };

  if (!application) {
    return (
      <div className="container mt-5">
        <h3>No application found with ID {id}</h3>
        <button className="btn btn-secondary mt-3" onClick={handleCancel}>
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h3>Delete Application</h3>
      <p>
        Are you sure you want to delete application <strong>{application.id}</strong> for{" "}
        <strong>{application.firstName} {application.lastName}</strong>?
      </p>
      <button className="btn btn-danger me-2" onClick={handleConfirmDelete}>
        Yes, Delete
      </button>
      <button className="btn btn-secondary" onClick={handleCancel}>
        Cancel
      </button>
    </div>
  );
};

export default DeleteApplication;

