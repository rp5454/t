import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import "../../assets/styles/variables.css";
import sclogo from "../../assets/images/sclogo.jpg";
import t1 from "../../assets/images/t1.jpg";

// ✅ Import CreateApplication page
import CreateApplication from "../Applications/CreateApplication";

// ---------------- Home Component ----------------
function Home() {
  return (
    <>
      {/* Navbar */}
      <nav className="custom-navbar">
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src={sclogo} alt="Logo" className="navbar-logo" />
          <span className="navbar-title">Standard Chartered</span>
        </div>
        <div className="ms-auto login-signup-btn">
          <Link to="/login" className="btn btn-success">
            {" "}
            Login{" "}
          </Link>
        </div>
      </nav>
      {/* Hero Section */}
      <section
        className="hero"
        style={{
          backgroundImage: `url(${t1})`,
        }}
      >
        <div className="hero-overlay">
          <div className="hero-text">
            <h1 className="fw-bold">
              Simpler way to make payment towards your credit card
            </h1>
            <p>Effortlessly pay your credit card bill through BillDesk.</p>
          </div>
          {/* Right Side Floating Boxes */}
          <div className="side-buttons">
            <div className="btn-box">
              Priority Banking
              <br />
              <small>Get vouchers up to 30%</small>
            </div>
            <div className="btn-box highlight">
              Begin investment journey
              <br />
              <small>With SC Invest</small>
            </div>
            <div className="btn-box">
              Fixed Deposits
              <br />
              <small>@ 6.6% p.a.*</small>
            </div>
            <div className="btn-box highlight">
              Effortless Payments
              <br />
              <small>With BillDesk</small>
            </div>
            <div className="btn-box">
              Grievance Redressal
              <br />
              <small>Grievance Redressal Day</small>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer>
        <div className="container">
          <div className="row">
            {/* Only Services Column */}
            <div className="col-md-4">
              <h5>Services</h5>
              <ul>
                <li>
                  <a href="#">About Us</a>
                </li>
                <li>
                  <a href="#">Bank with Us</a>
                </li>
                <li>
                  <a href="#">ATMs & Branches</a>
                </li>
                <li>
                  <a href="#">Get Help</a>
                </li>
                <li>
                  <a href="#">FAQs</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

// ---------------- Login Component ----------------
function Login() {
  const [role, setRole] = useState("employee");
  const navigate = useNavigate(); // ✅ Hook for navigation

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(`Logging in as:${role}`);
    // ✅ Redirect to CreateApplication after login
    navigate("/create-application");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark custom-navbar login-page">
        <div className="container d-flex align-items-center">
          <div style={{ display: "flex", alignItems: "center" }}>
            <img src={sclogo} alt="Logo" className="navbar-logo" />
            <span className="navbar-title">Standard Chartered</span>
          </div>
          <div className="ms-auto login-signup-btn">
            <a className="btn btn-warning" href="/">
              ⬅ Back to Home
            </a>
          </div>
        </div>
      </nav>
      <div className="login-container">
        <div className="login-card">
          {/* Role Switch */}
          <div className="btn-group w-100 mb-2" role="group">
            <input
              type="radio"
              className="btn-check"
              name="role"
              id="admin"
              autoComplete="off"
              onChange={() => setRole("admin")}
            />
            <label className="btn btn-outline-dark" htmlFor="admin">
              Admin
            </label>
            <input
              type="radio"
              className="btn-check"
              name="role"
              id="employee"
              autoComplete="off"
              defaultChecked
              onChange={() => setRole("employee")}
            />
            <label className="btn btn-outline-dark" htmlFor="employee">
              Employee
            </label>
          </div>
          {/* Role label */}
          <p className="fw-semibold mb-3">
            {role === "admin" ? "Admin Login" : "Employee Login"}
          </p>
          {/* Login form */}
          <form onSubmit={handleSubmit}>
            <div className="input-group mb-3 custom-input">
              <span className="input-group-text"></span>
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                required
              />
            </div>
            <div className="input-group mb-2 custom-input">
              <span className="input-group-text"></span>
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                required
              />
            </div>
            <div className="text-end mb-3">
              <a href="#" className="small text-dark">
                Forgot Password?
              </a>
            </div>
            <button type="submit" className="log-btn w-100 submit-btn">
              Login
            </button>
          </form>
        </div>
      </div>

      {/* ✅ Define Routes inside LoginPage file */}
      <Routes>
        <Route path="/create-application" element={<CreateApplication />} />
      </Routes>
    </div>
  );
}

// --------------- Export ----------------
export { Home, Login };
export default Login;
