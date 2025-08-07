import React from "react";

function CustomerDetails({ customer }) {
  return (
    <div>
      <h3>Customer Details</h3>
      {customer ? (
        <div>
          <p><strong>ID:</strong> {customer.id}</p>
          <p><strong>First Name:</strong> {customer.firstName}</p>
          <p><strong>Last Name:</strong> {customer.lastName}</p>
          <p><strong>Email:</strong> {customer.email}</p>
        </div>
      ) : (
        <p>No customer selected</p>
      )}
    </div>
  );
}

export default CustomerDetails;
