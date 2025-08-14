// src/components/tables/ApplicationsTable.js
import React from "react";
import { useNavigate } from "react-router-dom";

const ApplicationsTable = ({ applications }) => {
  const navigate = useNavigate();

  return (
    <div>
      <h3>Existing Applicant Details</h3>
      <table border="1" cellPadding="8" style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>Sl No</th>
            <th>Applic. ID</th>
            <th>Card Holder Name</th>
            <th>Application Form Status</th>
            <th>Age of Application Form</th>
            <th>Handeled By Sales User</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app, index) => (
            <tr key={app.id}>
              <td>{index + 1}</td>
              <td>{app.id}</td>
              <td>{app.name}</td>
              <td>{app.status}</td>
              <td>{app.age}</td>
              <td>{app.handledBy}</td>
              <td>
                <button onClick={() => navigate(`/applications/delete/${app.id}`)}>Del</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <br />
      <button style={{ padding: "8px 16px", borderRadius: "20px" }}>Next</button>
    </div>
  );
};

export default ApplicationsTable;
