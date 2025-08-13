import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ViewApplications from "./pages/Applications/ViewApplications";

function App() {
  return (
    <Router>
      <Routes>
        {/* Applications list page */}
        <Route path="/applications" element={<ViewApplications />} />
        
        {/* Default route */}
        <Route path="*" element={<p>Page Not Found</p>} />
      </Routes>
    </Router>
  );
}

export default App;
