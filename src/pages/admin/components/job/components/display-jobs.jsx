import React from 'react';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const DisplayAllJobs = ({ jobs = [], onDelete }) => {
  return (
    <div>
      <h4 className='mt-1 mb-1'>Posted Jobs</h4>
      <Table className="bg-muted rounded p-1">
        <TableCaption>Jobs Online</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Title</TableHead>
            <TableHead>Edit</TableHead>
            <TableHead>View Applications</TableHead>
            <TableHead className="text-right">Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobs.map((job) => (
            <TableRow key={job._id}>
              <TableCell className="font-medium">{job._id}</TableCell>
              <TableCell>{job.title}</TableCell>
              <TableCell>
                <Button className="text-white bg-blue-500">
                  <Link to={`/admin/edit-jobs/${job._id}`}>Edit</Link>
                </Button>
              </TableCell>
              <TableCell>
                <Button className="text-white bg-green-500">
                  <Link to={`/admin/view-applications/${job._id}`}>View Applications</Link>
                </Button>
              </TableCell>
              <TableCell className="text-right">
                <Button className="text-white bg-red-600" onClick={() => onDelete(job._id)}>
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DisplayAllJobs;
