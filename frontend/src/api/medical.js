import { api, headers } from './client';

export const getMedicalConditionBasedOnBalagruha = async (balagruhaIds) => {
  try {
    const response = await api.post(
      "/api/medical-check-ins/students/list",
      balagruhaIds
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching medical conditions based on balagruha:", error);
    throw error;
  }
};

export const getMedicalCheckInsByStudentId = async (studentId) => {
  try {
    const response = await api.get(`/api/medical-check-ins/student/${studentId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching medical check-ins by student ID:", error);
    throw error;
  }
};

export const getMoodBasedOnBalagruha = async (balagruhaIds) => {
  try {
    const response = await api.post("/api/v1/mood-tracker/latest", balagruhaIds);
    return response.data;
  } catch (error) {
    console.error("Error fetching mood based on balagruha:", error);
    throw error;
  }
};

export const createMedicalCheckin = async (data) => {
  try {
    const response = await api.post("/api/medical-check-ins", data, { headers });
    return response.data;
  } catch (error) {
    console.error("Error creating medical check-in:", error);
    throw error;
  }
};

export const updateMedicalCheckin = async (checkInId, data) => {
  try {
    const response = await api.put(`/api/medical-check-ins/${checkInId}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating medical check-in:", error);
    throw error;
  }
};

export const deleteMedicalCheckin = async (checkInId) => {
  try {
    const response = await api.delete(`/api/medical-check-ins/${checkInId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting medical check-in:", error);
    throw error;
  }
};

export const addMedicalCheckinAttachments = async (checkInId, formData) => {
  try {
    const response = await api.put(`/api/medical-check-ins/attachments/${checkInId}`, formData, { headers });
    return response.data;
  } catch (error) {
    console.error("Error adding medical check-in attachments:", error);
    throw error;
  }
};

export const deleteMedicalCheckinAttachment = async (checkInId, attachmentId) => {
  try {
    const response = await api.delete(`/api/medical-check-ins/attachments/${checkInId}/${attachmentId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting medical check-in attachment:", error);
    throw error;
  }
};

export const getAllDoctors = async () => {
  try {
    const response = await api.get("/api/doctors");
    return response.data;
  } catch (error) {
    console.error("Error fetching doctors:", error);
    throw error;
  }
};

export const createDoctor = async (name) => {
  try {
    const response = await api.post("/api/doctors", { name });
    return response.data;
  } catch (error) {
    console.error("Error creating doctor:", error);
    throw error;
  }
};

export const searchDoctors = async (searchTerm) => {
  try {
    const response = await api.get(`/api/doctors/search?q=${searchTerm}`);
    return response.data;
  } catch (error) {
    console.error("Error searching doctors:", error);
    throw error;
  }
};

export const getAllHospitals = async () => {
  try {
    const response = await api.get("/api/hospitals");
    return response.data;
  } catch (error) {
    console.error("Error fetching hospitals:", error);
    throw error;
  }
};

export const createHospital = async (name) => {
  try {
    const response = await api.post("/api/hospitals", { name });
    return response.data;
  } catch (error) {
    console.error("Error creating hospital:", error);
    throw error;
  }
};

export const searchHospitals = async (searchTerm) => {
  try {
    const response = await api.get(`/api/hospitals/search?q=${searchTerm}`);
    return response.data;
  } catch (error) {
    console.error("Error searching hospitals:", error);
    throw error;
  }
};

export const createMood = async (data) => {
  try {
    const response = await api.post("/api/v1/mood-tracker", data);
    return response.data;
  } catch (error) {
    console.error("Error creating mood:", error);
    throw error;
  }
};
