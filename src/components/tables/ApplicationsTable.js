import React from "react";
import { deleteApplication } from "../../services/applicationService";

const ApplicationsTable = ({ applications, onDeleteSuccess }) => {
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this application?")) {
      try {
        await deleteApplication(id);
        alert("Application deleted successfully!");
        if (onDeleteSuccess) {
          onDeleteSuccess(id); // notify parent to refresh or remove from state
        }
      } catch (err) {
        console.error(err);
        alert("Failed to delete application.");
      }
    }
  };

  return (
    <table border="1" cellPadding="8" style={{ width: "100%", marginTop: "20px", borderCollapse: "collapse" }}>
      <thead>
        <tr>
          <th>Sl No</th>
          <th>Applic. ID</th>
          <th>Card Holder Name</th>
          <th>Application Form Status</th>
          <th>Age of Application Form</th>
          <th>Handled By Sales User</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {applications.map((app, index) => (
          <tr key={app.id}>
            <td>{index + 1}</td>
            <td>{app.id}</td>
            <td>{app.cardHolderName}</td>
            <td>{app.status}</td>
            <td>{app.age}</td>
            <td>{app.salesUser}</td>
            <td>
              <button
                onClick={() => handleDelete(app.id)}
                style={{
                  background: "#f44336",
                  color: "white",
                  border: "none",
                  padding: "4px 8px",
                  borderRadius: "12px",
                  cursor: "pointer",
                }}
              >
                Del
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default ApplicationsTable;
