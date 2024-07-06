import axios from 'axios';

export const getAllJobs = async () => {
  try {
    const response = await axios.get('http://localhost:5000/jobs');
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('Error fetching jobs:', error);
    throw error; 
  }
};
