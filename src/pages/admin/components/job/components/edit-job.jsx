import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AlertStatus from '../../alert/alert-message';
import { useSession } from '@clerk/clerk-react';

const EditJobCard = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [jobType, setJobType] = useState('');
  const [jobLocation, setJobLocation] = useState('');
  const [alertStatus, setAlertStatus] = useState(null);
  const { session } = useSession();

  useEffect(() => {
    const fetchJob = async () => {
      try {
        if (id) {
          console.log("Job ID from URL:", id);
          const token = await session.getToken(); 
          const response = await axios.get(`https://aidf-back-end-production.up.railway.app/jobs/${id}`, {
            headers: {
              'Authorization': `Bearer ${token}`,
            },
          });
          const jobData = response.data;
          setJob(jobData);
          setJobTitle(jobData.title);
          setJobDescription(jobData.description);
          setJobType(jobData.type);
          setJobLocation(jobData.location);
          console.log(jobData);
        }
      } catch (error) {
        console.error("Error fetching job:", error);
      }
    };

    fetchJob();
  }, [id, session]);

  if (!job) {
    return <div>Loading...</div>;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    const jobData = {
      title: jobTitle,
      description: jobDescription,
      type: jobType,
      location: jobLocation,
    };

    try {
      const token = await session.getToken(); 
      const response = await axios.put(`https://aidf-back-end-production.up.railway.app/jobs/${id}`, jobData, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`, 
        },
      });

      if (response.status === 200 || response.status === 204) {
        setAlertStatus({ type: 'success', message: 'Updated Successfully' });
        console.log("Updated successfully");
      } else {
        setAlertStatus({ type: 'error', message: 'Update failed' });
      }
    } catch (error) {
      console.error('Error:', error);
      setAlertStatus({ type: 'error', message: 'Error while updating' });
    }

    setTimeout(() => {
      setAlertStatus(null);
    }, 1000);
  };

  return (
    <div>
      <form className='mb-4' onSubmit={handleSubmit}>
        {alertStatus && <AlertStatus type={alertStatus.type} message={alertStatus.message} />}
        <div className="flex flex-col gap-y-4 mt-4">
          <Label>Job Title</Label>
          <Input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-y-4 mt-4">
          <Label>Description</Label>
          <Input
            type="text"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-y-4 mt-4">
          <Label>Job Type</Label>
          <Select onValueChange={(value) => setJobType(value)} value={jobType} required>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select a type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Remote">Remote</SelectItem>
              <SelectItem value="Hybrid">Hybrid</SelectItem>
              <SelectItem value="Full Time">Full Time</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="flex flex-col gap-y-4 mt-4">
          <Label>Location</Label>
          <Input
            type="text"
            value={jobLocation}
            onChange={(e) => setJobLocation(e.target.value)}
            required
          />
        </div>
        <Button type="submit" className="mt-6">Post</Button>
      </form>
    </div>
  );
}

export default EditJobCard;
