import React from "react";

function CustomerList({ customers, onSelect }) {
  return (
    <div>
      <h2>Customer List</h2>
      <table border="1" cellPadding="8" width="100%">
        <thead>
          <tr>
            <th>Id</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((cust) => (
            <tr key={cust.id} onClick={() => onSelect(cust)} style={{ cursor: "pointer" }}>
              <td>{cust.id}</td>
              <td>{cust.firstName}</td>
              <td>{cust.lastName}</td>
              <td>{cust.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CustomerList;
