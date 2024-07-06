import axios from "axios";

export const noOfPostedJobs = async () => {
  try {
    const token = await window.Clerk.session.getToken();
    const response = await axios.get('https://aidf-back-end-production.up.railway.app/jobs/posted', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
