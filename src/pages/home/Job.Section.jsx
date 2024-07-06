import JobCard from "@/components/shared/JobCard";
import axios from "axios";
import { useEffect, useState } from "react";

function JobSection() {
    const [displayAllJobs, setJobs] = useState([]);

    useEffect(() => {
        axios.get(`http://localhost:5000/jobs`)
            .then((response) => {
                  setJobs(response.data);
                    console.log(response.data);
                })
            .catch((err) => console.log(err));
    }, []);

    if(!displayAllJobs) {
        return <div className="mt-3">Loading...</div>
    }
    return (
        <section className="py-8">
            <h2>Available Jobs</h2>
            <div className="mt-4 flex flex-col">
                {
                    displayAllJobs.map((job) => (
                        <JobCard
                            key={job._id} 
                            id={job._id} 
                            title={job.title}
                            type={job.type}
                            location={job.location}
                        />
                    ))
                }
            </div>
        </section>
    );
}

export default JobSection;
