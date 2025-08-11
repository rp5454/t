import React from "react";
import { useParams, Link } from "react-router-dom";

export default function CustomerDetails({ customers = [], onDelete }) {
  const { id } = useParams();
  const cust = customers.find(c => c.id === Number(id));

  if (!cust) {
    return (
      <div>
        <Link to="/customers">&lt; Back to Customers List</Link>
        <h3>Customer not found</h3>
      </div>
    );
  }

  return (
    <div>
      <Link to="/customers">&lt; Back to Customers List</Link>
      <h3 style={{ marginTop: 8 }}>Customer Details</h3>

      <div style={{ display: "flex", gap: "40px", alignItems: "flex-start" }}>
        <div>
          <p><strong>ID:</strong> {cust.id}</p>
          <p><strong>First Name:</strong> {cust.firstName}</p>
          <p><strong>Last Name:</strong> {cust.lastName}</p>
          <p><strong>Email:</strong> {cust.email}</p>
          <p><strong>Phone:</strong> {cust.phone || "-"}</p>
          <div style={{ marginTop: 12 }}>
            <Link to={`/customers/${cust.id}/edit`} className="btn">Edit</Link>
            {" "}
            <button className="btn danger" onClick={() => {
              if (window.confirm("Delete this customer?")) onDelete(cust.id);
            }}>Delete</button>
          </div>
        </div>

        <div style={{ flex: 1 }}>
          <h4>List of Accounts</h4>
          <table className="customers-table">
            <thead>
              <tr>
                <th>Account No</th>
                <th>Type</th>
                <th>Branch</th>
                <th>Balance</th>
              </tr>
            </thead>
            <tbody>
              {cust.accounts && cust.accounts.length > 0 ? (
                cust.accounts.map((acc, idx) => (
                  <tr key={idx}>
                    <td>{acc.accountNo}</td>
                    <td>{acc.type}</td>
                    <td>{acc.branch}</td>
                    <td>{acc.balance}</td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="4">No accounts found.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
