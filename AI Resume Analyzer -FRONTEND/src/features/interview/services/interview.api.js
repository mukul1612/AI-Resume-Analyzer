import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

export const generateInterviewReport = async ({
  jobDescription,
  resumeFile,
  selfDescription,
}) => {
  const formData = new FormData();
  formData.append("jobDescription", jobDescription);
  formData.append("resume", resumeFile);
  formData.append("selfDescription", selfDescription);

  const reponse = await api.post("/api/interview/", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return reponse.data;
};

export const getInterviewReport = async (interviewId) => {
  const response = await api.get(`/api/interview/report/${interviewId}`);
  return response.data;
};

export const getAllinterview = async () => {
  const response = await api.get(`/api/interview/`);
  return response.data;
};

export const downloadResume = async (interviewId) => {
  const response = await api.post(
    `/api/interview/resume/pdf/${interviewId}`,
    null,
    { responseType: "blob" },
  );
  return response.data;
};
