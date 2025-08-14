// src/services/applicationService.js
export const getApplications = async () => {
  // Mock data for frontend-only development
  return [
    {
      id: "2030919",
      name: "Rishabh Pathak",
      status: "Pending",
      age: 1,
      handledBy: "Preeti"
    }
  ];
};

export const deleteApplication = async (id) => {
  console.log(`Mock delete application with id: ${id}`);
  return { success: true };
};
