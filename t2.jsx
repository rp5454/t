import React, { useState } from "react";

export default function App() {
  const [customers, setCustomers] = useState([]); // Start empty
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [form, setForm] = useState({ firstName: "", lastName: "", email: "" });

  const handleInputChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCustomer = {
      id: customers.length + 1,
      ...form
    };
    setCustomers([...customers, newCustomer]);
    setForm({ firstName: "", lastName: "", email: "" });
  };

  const handleRowClick = (customer) => {
    setSelectedCustomer(customer);
  };

  return (
    <div style={{ display: "flex", padding: "20px", fontFamily: "Arial" }}>
      {/* Left Column */}
      <div style={{ flex: 2, paddingRight: "40px" }}>
        <h2>Customers List</h2>
        {customers.length > 0 ? (
          <table border="1" cellPadding="8" cellSpacing="0" width="100%">
            <thead>
              <tr>
                <th>Id</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              {customers.map((customer) => (
                <tr key={customer.id} onClick={() => handleRowClick(customer)} style={{ cursor: "pointer" }}>
                  <td>{customer.id}</td>
                  <td>{customer.firstName}</td>
                  <td>{customer.lastName}</td>
                  <td>{customer.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No customers yet. Add one below.</p>
        )}

        <h3 style={{ marginTop: "30px" }}>Add Customer</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={form.firstName}
            onChange={handleInputChange}
            style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={form.lastName}
            onChange={handleInputChange}
            style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleInputChange}
            style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
            required
          />
          <button type="submit" style={{ padding: "8px 16px", background: "#007bff", color: "#fff", border: "none" }}>
            Submit
          </button>
        </form>
      </div>

      {/* Right Column */}
      <div style={{ flex: 1 }}>
        <h3>Customer Details</h3>
        {selectedCustomer ? (
          <div>
            <p><strong>ID:</strong> {selectedCustomer.id}</p>
            <p><strong>First Name:</strong> {selectedCustomer.firstName}</p>
            <p><strong>Last Name:</strong> {selectedCustomer.lastName}</p>
            <p><strong>Email:</strong> {selectedCustomer.email}</p>
          </div>
        ) : (
          <p>No customer selected</p>
        )}
      </div>
    </div>
  );
}
