import React from "react";
import { Link } from "react-router-dom";

export default function CustomerList({ customers = [], onDelete }) {
  const handleDelete = (id, name) => {
    if (window.confirm(`Delete customer ${name} (id ${id}) ?`)) {
      onDelete(id);
    }
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h3>Customers List</h3>
        <Link to="/customers/new" className="btn">Create new customer</Link>
      </div>

      <table className="customers-table">
        <thead>
          <tr>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th style={{ minWidth: 160 }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.length === 0 ? (
            <tr><td colSpan="5">No customers found.</td></tr>
          ) : customers.map(c => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.firstName}</td>
              <td>{c.lastName}</td>
              <td>{c.email}</td>
              <td>
                <Link to={`/customers/${c.id}`} className="link">Show</Link>{" | "}
                <Link to={`/customers/${c.id}/edit`} className="link">Edit</Link>{" | "}
                <button className="link-btn" onClick={() => handleDelete(c.id, `${c.firstName} ${c.lastName}`)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
