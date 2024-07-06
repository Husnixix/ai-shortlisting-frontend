import React, { useEffect, useState } from 'react';
import DisplayJobApplications from './display-job-applications';
import { getJobApplications } from '../api/get-all-job-application';
import AlertMessage from '../../alert/alert-message';
import { deleteJobApplication } from '../api/delete-job-application';

const ManageJobApplications = () => {
  const [jobApplications, setJobApplications] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [alertMessage, setAlertMessage] = useState(null); 

  useEffect(() => {
    getJobApplications()
      .then((data) => {
        setJobApplications(data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  const handleReject = async (_id) => {
    console.log(`Rejected application ID: ${_id}`);
    try {
      const response = await deleteJobApplication(_id);
      if(response.status === 200) {
        setJobApplications((prevApplications) =>
          prevApplications.filter((app) => app._id !== _id)
        );
        setAlertMessage({ type: 'success', message: 'Job Application deleted' });
        console.log("Job Application deleted successfully");
      }
    } catch (error) {
      console.log('Error deleting job:', error);
      setAlertMessage({ type: 'error', message: 'Error deleting job application' });
    }
    // Remove Alert Message
    setTimeout(() => {
      setAlertMessage(null);
    }, 3000); // Increase timeout to allow users to see the message
  };

  if (isLoading) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div>
      {alertMessage && <AlertMessage type={alertMessage.type} message={alertMessage.message} />}
      <DisplayJobApplications jobApplications={jobApplications} onReject={handleReject} />
    </div>
  );
};

export default ManageJobApplications;
