import axios from "axios";

export const getJobApplications = async () => {
  const token = await window.Clerk.session.getToken();
  try {
    const res = await axios.get(`http://localhost:5000/jobApplications`, {
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
