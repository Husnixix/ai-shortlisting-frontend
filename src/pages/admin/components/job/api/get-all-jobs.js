import axios from 'axios';

export const getAllJobs = async () => {
  try {
    const response = await axios.get('https://https://ai-shortlisting-backend.vercel.app/jobs');
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error;
  }
};
