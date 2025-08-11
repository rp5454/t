import React, { useEffect, useState } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import CustomerList from "./components/CustomerList";
import CustomerForm from "./components/CustomerForm";
import CustomerDetails from "./components/CustomerDetails";
import About from "./pages/About";
import initialData from "./data/customers.json";

const STORAGE_KEY = "customers_data_v1";

function App() {
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setCustomers(JSON.parse(stored));
      } catch {
        setCustomers(initialData);
      }
    } else {
      setCustomers(initialData);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(customers));
  }, [customers]);

  const createCustomer = (cust) => {
    const maxId = customers.length ? Math.max(...customers.map(c => c.id)) : 0;
    const newCustomer = { ...cust, id: maxId + 1, accounts: cust.accounts || [] };
    setCustomers(prev => [...prev, newCustomer]);
    return newCustomer;
  };

  const updateCustomer = (id, updates) => {
    setCustomers(prev => prev.map(c => (c.id === id ? { ...c, ...updates } : c)));
  };

  const deleteCustomer = (id) => {
    setCustomers(prev => prev.filter(c => c.id !== id));
  };

  return (
    <div>
      <nav className="navbar">
        <div className="brand">TopGuns Bank</div>
        <div className="navlinks">
          <Link to="/">Home</Link>
          <Link to="/customers">Customers</Link>
          <Link to="/about">About</Link>
          <a href="#scb">SCB</a>
        </div>
      </nav>

      <main className="container">
        <Routes>
          <Route path="/" element={
            <div>
              <h2>Welcome to TopGuns Bank</h2>
              <p>
                TopGuns Bank provides secure, modern banking for customers. Use
                this admin app to manage customers and view their accounts.
              </p>
            </div>
          } />
          <Route path="/about" element={<About />} />

          <Route path="/customers" element={
            <CustomerList
              customers={customers}
              onDelete={deleteCustomer}
            />
          } />
          <Route path="/customers/new" element={
            <CustomerForm
              onSave={(values) => {
                createCustomer(values);
                navigate("/customers");
              }}
            />
          } />
          <Route path="/customers/:id/edit" element={
            <CustomerForm
              customers={customers}
              onSave={(values, id) => {
                updateCustomer(id, values);
                navigate("/customers");
              }}
            />
          } />
          <Route path="/customers/:id" element={
            <CustomerDetails customers={customers} onDelete={(id) => {
              deleteCustomer(id);
              navigate("/customers");
            }} />
          } />
          <Route path="*" element={<div>404 — Not found</div>} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
