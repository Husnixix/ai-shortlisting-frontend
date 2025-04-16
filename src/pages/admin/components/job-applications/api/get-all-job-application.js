import axios from "axios";

export const getJobApplications = async () => {
  const token = await window.Clerk.session.getToken();
  try {
    const res = await axios.get(`https://ai-shortlisting-backend.vercel.app/jobApplications`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(res.data);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
