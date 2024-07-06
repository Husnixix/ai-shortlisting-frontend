import { useState, useEffect } from 'react';
import { getAllJobs } from '../api/get-all-jobs';
import DisplayAllJobs from './display-jobs';
import { deleteJob } from '../api/delete-job';
import AlertMessage from '../../alert/alert-message';


const ManagePostedJobs = () => {
    const [displayPostedJobs, setDisplayPostedJobs] = useState([]); 
    const [alertMessage, setAlertMessage] = useState(null); 
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getAllJobs();
                setDisplayPostedJobs(data);
            } catch (error) {
                console.error('Error fetching jobs:', error);
            }
        };

        fetchData();
    }, []);

    const handleDeleteJob = async (id) => {
        
        try {
            const response = await deleteJob(id);
            if (response.status === 200) {
                const updatedJobs = displayPostedJobs.filter(job => job._id !== id);
                setDisplayPostedJobs(updatedJobs);
                setAlertMessage({ type: 'success', message: 'Job post deleted' });
                console.log("Job deleted successfully");
            } else {
                setAlertMessage({ type: 'error', message: 'Failed to delete Job post' });
                console.error('Failed to delete job:', response.statusText);
            }
        } catch (error) {
            console.error('Error deleting job:', error);
            setAlertMessage({ type: 'error', message: 'Error deleting job' });
        }

        // Remove Alert Message
        setTimeout(() => {
            setAlertMessage(null);
        }, 1000);
    };

    return (
        <div>
            {alertMessage && <AlertMessage type={alertMessage.type} message={alertMessage.message} />}
            <DisplayAllJobs jobs={displayPostedJobs} onDelete={handleDeleteJob} />
        </div>
    );
};

export default ManagePostedJobs;
