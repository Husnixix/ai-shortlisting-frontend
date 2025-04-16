import axios from "axios";

export const deleteJob = async (id) => {

    const token = await window.Clerk.session.getToken();
    try {
        const response = await axios.delete(`https://ai-shortlisting-backend.vercel.app/jobs/${id}`, {
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
