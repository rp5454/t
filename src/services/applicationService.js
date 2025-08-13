// src/services/applicationService.js
import axios from "axios";
import { API_BASE_URL } from "../utils/constants";

export const getApplications = async () => {
  const response = await axios.get(`${API_BASE_URL}/applications`);
  return response.data;
};

export const createApplication = async (applicationData) => {
  const response = await axios.post(`${API_BASE_URL}/applications`, applicationData);
  return response.data;
};

export const updateApplication = async (id, applicationData) => {
  const response = await axios.put(`${API_BASE_URL}/applications/${id}`, applicationData);
  return response.data;
};

export const deleteApplication = async (id) => {
  const response = await axios.delete(`${API_BASE_URL}/applications/${id}`);
  return response.data;
};
