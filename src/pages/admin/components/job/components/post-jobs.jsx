import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import AlertMessage from '../../alert/alert-message';
import { useSession } from '@clerk/clerk-react';

const PostJob = () => {
  const [jobTitle, setJobTitle] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [jobType, setJobType] = useState('');
  const [jobLocation, setJobLocation] = useState('');
  const [alertMessage, setAlertMessage] = useState(null);
  const {session} = useSession();

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
      const response = await fetch('http://localhost:5000/jobs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(jobData),
      });

      if (response.ok) {
        setAlertMessage({ type: 'success', message: 'Job posted successfully' });
        console.log('Job posted successfully');
      } else {
        const errorData = await response.json();
        setAlertMessage({ type: 'error', message: errorData.error });
        console.error('Failed to post job', errorData.error);
      }
    } catch (error) {
      setAlertMessage({ type: 'error', message: 'Error occurred while posting job' });
      console.error('Error occurred while posting job', error);
    }

    setTimeout(() => {
      setAlertMessage(null);
    }, 1000);
  };

  return (
    <div className='bg-muted p-3 mt-4'>
      <form onSubmit={handleSubmit}>
        {alertMessage && <AlertMessage type={alertMessage.type} message={alertMessage.message} />}
        <div className="flex flex-col gap-y-4 mt-3">
          <Label>Job Title</Label>
          <Input
            type="text"
            value={jobTitle}
            onChange={(e) => setJobTitle(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-y-4 mt-3">
          <Label>Description</Label>
          <Input
            type="text"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-y-4 mt-3">
          <Label>Job Type</Label>
          <Select onValueChange={(value) => setJobType(value)} required>
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
        <div className="flex flex-col gap-y-4 mt-3">
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
};

export default PostJob;
