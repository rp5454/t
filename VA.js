import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

const ViewApplications = () => {
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();

  // --- Load applications from localStorage ---
  useEffect(() => {
    const storedApplications = localStorage.getItem('creditCardApplications');
    if (storedApplications) {
      setApplications(JSON.parse(storedApplications));
    } else {
      setApplications([]);
    }
  }, []);

  // --- Handle Navigation ---
  const handleCreateNew = () => {
    navigate('/applications/create');
  };

  const handleEdit = (applicationId) => {
    navigate(`/applications/edit/${applicationId}`);
  };

  // --- Delete functionality (bulk delete with checkboxes, HIS code) ---
  const [selectedRows, setSelectedRows] = useState([]);
  const handleDelete = () => {
    const newData = applications.filter((row) => !selectedRows.includes(row.id));
    setApplications(newData);
    localStorage.setItem('creditCardApplications', JSON.stringify(newData));
    setSelectedRows([]);
  };

  const handleSelect = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div style={{ backgroundColor: '#e6f2ff', minHeight: '100vh' }}>
      <div className="App">
        {/* Header */}
        <div className="d-flex justify-content-between align-items-center p-3 border bg-light">
          <div>Logo</div>
          <h4 className="m-0">Company Name</h4>
          <button className="btn btn-outline-dark btn-sm">Logout</button>
        </div>

        {/* Welcome Banner */}
        <div className="bg-secondary text-white text-center p-2">
          Welcome <strong>@Username</strong>, hope you're having a productive day. What would you like to do today?
        </div>

        <div className="d-flex" style={{ minHeight: "90vh" }}>
          {/* Sidebar */}
          <div className="border-end p-3" style={{ width: "220px" }}>
            <div
              data-bs-toggle="collapse"
              data-bs-target="#sidebarDropdown"
              aria-expanded="false"
              className="d-flex justify-content-between align-items-center mb-3"
              style={{ cursor: "pointer" }}
            >
              <span>Menu</span>
              <i className="bi bi-chevron-down" />
            </div>
            <div id="sidebarDropdown" className="collapse">
              <div className="d-grid gap-2">
                <button className="btn btn-dark">Settings</button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-grow-1 p-3">
            <div className="d-flex justify-content-end mb-3 gap-2">
              <button className="btn btn-success" onClick={handleCreateNew}>Create</button>
              <button className="btn btn-danger" onClick={handleDelete} disabled={selectedRows.length === 0}>Delete</button>
            </div>

            {/* Table */}
            <div className="table-responsive">
              <table className="table table-bordered text-center">
                <thead className="table-secondary">
                  <tr>
                    <th>Sl.No</th>
                    <th>Application ID</th>
                    <th>Card Holder Name</th>
                    <th>Nationality</th>
                    <th>Mobile</th>
                    <th>E-mail</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.length > 0 ? (
                    applications.map((app, index) => (
                      <tr key={app.id}>
                        <td>
                          <input
                            type="checkbox"
                            checked={selectedRows.includes(app.id)}
                            onChange={() => handleSelect(app.id)}
                            style={{ marginRight: "5px" }}
                          />
                          {index + 1}
                        </td>
                        <td>{app.id}</td>
                        <td>{app.firstName} {app.lastName}</td>
                        <td>{app.nationality}</td>
                        <td>{app.mobile}</td>
                        <td>{app.email}</td>
                        <td>
                          <button
                            onClick={() => handleEdit(app.id)}
                            className="btn btn-primary btn-sm me-2"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => navigate(`/applications/delete/${app.id}`)}
                            className="btn btn-danger btn-sm"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="7">No applications found. Please create one!</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewApplications;
