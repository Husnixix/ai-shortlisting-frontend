import axios from "axios";

export const deleteJobApplication = async (_id) => {
  const token = await window.Clerk.session.getToken();
  try {
    const response = await axios.delete(`http://localhost:5000/jobApplications/${_id}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    return response; // Ensure the response is returned
  } catch (error) {
    console.error('Error deleting job:', error);
    throw error; // Throw the error to be caught by the caller
  }
};
