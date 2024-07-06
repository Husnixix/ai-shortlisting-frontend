import React, { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { noOfPostedJobs } from './api/posted-jobs';

const CountOfPostedJobs = () => {
  const [jobsPostedCount, setJobsPostedCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await noOfPostedJobs();
        setJobsPostedCount(data);
      } catch (error) {
        console.log("Error fetching Posted Jobs Count", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <Card className='bg-muted'>
        <CardHeader>
          <CardTitle>No of Jobs Online</CardTitle>
        </CardHeader>
        <CardContent>
          <p>{jobsPostedCount}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default CountOfPostedJobs;
