import axios from "axios";

const api = axios.create({
  baseURL: "https://ai-resume-analyzer-9ukf.onrender.com",
  withCredentials: true,
});

export const generateInterviewReport = async ({
  jobDescription,
  resumeFile,
  selfDescription,
}) => {
  try {
    const formData = new FormData();
    formData.append("jobDescription", jobDescription);
    formData.append("resume", resumeFile);
    formData.append("selfDescription", selfDescription);

    const response = await api.post("/api/interview/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    // const message = error?.response?.data?.message || "Something went wrong";
    let message;
    if (error?.status === 503) {
      message =
        "Our AI is currently at capacity due to high demand. Please wait a moment ";
    } else {
      message = "An unexpected error occurred.";
    }
    throw new Error(message);
  }
};

export const getInterviewReport = async (interviewId) => {
  try {
    const response = await api.get(`/api/interview/report/${interviewId}`);
    return response.data;
  } catch (error) {
    const message = error?.response?.data?.message || "Something went wrong";
    throw new Error(message);
  }
};

export const getAllinterview = async () => {
  try {
    const response = await api.get(`/api/interview/`);
    return response.data;
  } catch (error) {
    const message = error?.response?.data?.message || "Something went wrong";
    throw new Error(message);
  }
};

export const downloadResume = async (interviewId) => {
  try {
    const response = await api.post(
      `/api/interview/resume/pdf/${interviewId}`,
      null,
      { responseType: "blob" },
    );
    return response.data;
  } catch (error) {
    // const message = error?.response?.data?.message || "Something went wrong";
    let message;
    if (error?.status === 503) {
      message =
        "Our AI is currently at capacity due to high demand. Please wait a moment ";
    } else {
      message = "An unexpected error occurred.";
    }
    throw new Error(message);
  }
};
