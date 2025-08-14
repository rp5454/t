// src/pages/Applications/ViewApplications.js
import React, { useEffect, useState } from "react";
import { getApplications } from "../../services/applicationService";
import ApplicationsTable from "../../components/tables/ApplicationsTable";

const ViewApplications = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getApplications();
      setApplications(data);
    };
    fetchData();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <ApplicationsTable applications={applications} />
    </div>
  );
};

export default ViewApplications;
