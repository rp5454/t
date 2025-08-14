// src/pages/Applications/DeleteApplication.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { deleteApplication, getApplications } from "../../services/applicationService";

const DeleteApplication = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchApp = async () => {
      try {
        const apps = await getApplications();
        const app = apps.find((a) => String(a.id) === String(id));
        if (app) {
          setApplication(app);
        } else {
          setError("Application not found");
        }
      } catch (err) {
        console.error("Error fetching application:", err);
        setError("Error fetching application details");
      } finally {
        setLoading(false);
      }
    };
    fetchApp();
  }, [id]);

  const handleDelete = async () => {
    try {
      await deleteApplication(id);
      alert("Application deleted successfully!");

      // Fetch updated applications list
      const updatedApps = await getApplications();
      console.log("Updated Applications after delete:", updatedApps);

      // Navigate back to applications list
      navigate("/applications", { state: { applications: updatedApps } });
    } catch (err) {
      console.error("Delete failed:", err);
      setError("Failed to delete application");
    }
  };

  if (loading) return <p>Loading application details...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "20px" }}>
      <h2>Delete Application</h2>
      {application && (
        <>
          <p>
            Are you sure you want to delete the application for{" "}
            <strong>{application.name}</strong>?
          </p>
          <button
            style={{
              background: "red",
              color: "white",
              marginRight: "10px",
              padding: "5px 10px",
              border: "none",
              cursor: "pointer",
            }}
            onClick={handleDelete}
          >
            Yes, Delete
          </button>
          <button onClick={() => navigate("/applications")}>Cancel</button>
        </>
      )}
    </div>
  );
};

export default DeleteApplication;
