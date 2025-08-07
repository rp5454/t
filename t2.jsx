import React, { useEffect, useState } from "react";
import CustomerList from "./components/customers/CustomerList";
import CustomerForm from "./components/customers/CustomerForm";
import CustomerDetails from "./components/customers/CustomerDetails";
import customersData from "./data/customers.json";

function App() {
  const [customers, setCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  useEffect(() => {
    setCustomers(customersData); // Load from JSON
  }, []);

  const handleAddCustomer = (newCustomer) => {
    const nextId = customers.length ? Math.max(...customers.map(c => c.id)) + 1 : 1;
    const fullCustomer = { id: nextId, ...newCustomer };
    setCustomers([...customers, fullCustomer]);
  };

  return (
    <div style={{ margin: "0 10%", padding: "20px", fontFamily: "Arial" }}>
      <CustomerList customers={customers} onSelect={setSelectedCustomer} />

      <div style={{ display: "flex", marginTop: "30px", gap: "20px" }}>
        <CustomerForm onAdd={handleAddCustomer} />
        <CustomerDetails customer={selectedCustomer} />
      </div>
    </div>
  );
}

export default App;
