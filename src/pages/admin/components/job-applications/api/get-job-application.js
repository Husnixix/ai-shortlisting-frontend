import axios from "axios";

export const getJobApplicationForJob = async (_id) => {
  const token = await window.Clerk.session.getToken();
  try {
    const res = await axios.get(`http://localhost:5000/jobApplications?jobid=${_id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return res.data; 
  } catch (error) {
    console.log(error);
    throw error; 
  }
};
