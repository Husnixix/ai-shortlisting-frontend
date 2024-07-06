import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getJobApplicationForJob } from "../api/get-job-application";
import ManageViewApplication from "./manage-view-application";

const ViewJobApplicationForJob = () => {
  const [viewJobApplication, setToViewJobApplication] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams(); 
  useEffect(() => {
    console.log("Current Job ID:", id);
    if (id) {
      getJobApplicationForJob(id)
        .then((data) => {
          setToViewJobApplication(data);
          setIsLoading(false);
          console.log("Fetched data:", data);
        })
        .catch((err) => {
          console.error("Error fetching data:", err);
          setIsLoading(false);
        });
    } else {
      setIsLoading(true);
      console.log("Job Id not Found");
    }
  }, [id]); 

  if (isLoading) {
    return (
      <div>
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <div>
      <ManageViewApplication jobApplications={viewJobApplication} />
    </div>
  );
};

export default ViewJobApplicationForJob;
