// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import ViewApplications from "./pages/Applications/ViewApplications";
import DeleteApplication from "./pages/Applications/DeleteApplication";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/applications" />} />
        <Route path="/applications" element={<ViewApplications />} />
        <Route path="/applications/delete/:id" element={<DeleteApplication />} />
        <Route path="*" element={<p>Page Not Found</p>} />
      </Routes>
    </Router>
  );
}

export default App;
