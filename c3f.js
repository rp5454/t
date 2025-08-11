import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^\d{7,15}$/;

export default function CustomerForm({ customers = [], onSave }) {
  const params = useParams();
  const editingId = params.id ? Number(params.id) : null;

  const [values, setValues] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    accounts: []
  });
  const [errors, setErrors] = useState({});
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    if (editingId && customers.length) {
      const c = customers.find(x => x.id === editingId);
      if (c) {
        setValues({
          firstName: c.firstName || "",
          lastName: c.lastName || "",
          email: c.email || "",
          phone: c.phone || "",
          accounts: c.accounts || []
        });
      }
    }
  }, [editingId, customers]);

  function validate(vals) {
    const err = {};
    if (!vals.firstName.trim()) err.firstName = "First name is required.";
    if (!vals.lastName.trim()) err.lastName = "Last name is required.";
    if (!vals.email.trim()) err.email = "Email is required.";
    else if (!emailRegex.test(vals.email)) err.email = "Invalid email format.";
    if (vals.phone.trim() && !phoneRegex.test(vals.phone)) err.phone = "Phone must be 7–15 digits (numbers only).";
    return err;
  }

  const handleChange = (e) => {
    setValues(prev => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors(prev => ({ ...prev, [e.target.name]: undefined }));
    setSubmitError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate(values);
    setErrors(err);
    if (Object.keys(err).length) {
      setSubmitError("Please fix validation errors.");
      return;
    }

    try {
      if (editingId) {
        onSave(values, editingId);
      } else {
        onSave(values);
      }
    } catch (ex) {
      setSubmitError("Failed to save. Try again.");
    }
  };

  return (
    <div className="form-card">
      <Link to="/customers">&lt; Back to Customers List</Link>
      <h3 style={{ marginTop: 8 }}>{editingId ? "Edit Customer" : "Add Customer"}</h3>

      <form onSubmit={handleSubmit}>
        <label>First Name</label>
        <input name="firstName" value={values.firstName} onChange={handleChange} placeholder="Please enter first name" />
        {errors.firstName && <div className="error">{errors.firstName}</div>}

        <label>Last Name</label>
        <input name="lastName" value={values.lastName} onChange={handleChange} placeholder="Please enter last name" />
        {errors.lastName && <div className="error">{errors.lastName}</div>}

        <label>Email</label>
        <input name="email" value={values.email} onChange={handleChange} placeholder="Please enter email details" />
        {errors.email && <div className="error">{errors.email}</div>}

        <label>Phone</label>
        <input name="phone" value={values.phone} onChange={handleChange} placeholder="Please enter phone no" />
        {errors.phone && <div className="error">{errors.phone}</div>}

        <div style={{ marginTop: 12 }}>
          <button type="submit" className="btn primary">{editingId ? "Update Customer" : "Create Customer"}</button>
          {" "}
          <Link to="/customers" className="btn">Cancel</Link>
        </div>

        {submitError && <div className="error" style={{ marginTop: 8 }}>{submitError}</div>}
      </form>
    </div>
  );
}
