// src/services/applicationService.js

// In-memory mock data for frontend-only development
let mockApplications = [
  {
    id: "2030919",
    name: "Rishabh Pathak",
    status: "Pending",
    age: 1,
    handledBy: "Preeti"
  }
];

export const getApplications = async () => {
  // Simulate API delay
  return Promise.resolve([...mockApplications]);
};

export const deleteApplication = async (id) => {
  console.log(`Mock delete application with id: ${id}`);
  mockApplications = mockApplications.filter(app => app.id !== id);
  return Promise.resolve({ success: true });
};
