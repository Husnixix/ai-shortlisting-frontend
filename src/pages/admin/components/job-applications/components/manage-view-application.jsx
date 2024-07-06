import React from 'react';
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { cn } from '@/lib/utils'; 

const ManageViewApplication = ({ jobApplications = [] }) => {
  console.log("jobApplications:", jobApplications);

  return (
    <div>
      <h4 className='text-white mt-1 mb-1'>Applications for the Job Role</h4>
      <Table>
        <TableCaption>Job Applications</TableCaption>
        <TableHeader className="text-white">
          <TableRow className="text-white">
            <TableHead className="w-[100px]">User ID</TableHead>
            <TableHead>User Name</TableHead>
            <TableHead>Job ID</TableHead>
            <TableHead>Job Title</TableHead>
            <TableHead>Rating</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobApplications.map((jobApplication) => (
            <TableRow key={jobApplication._id}>
              <TableCell className="font-medium">{jobApplication.userID}</TableCell>
              <TableCell>{jobApplication.fullName}</TableCell>
              <TableCell>{jobApplication.job?._id || 'N/A'}</TableCell>
              <TableCell>{jobApplication.job?.title || 'N/A'}</TableCell>
              <TableCell>
                <Badge className={cn({
                    "bg-red-500 text-white": jobApplication?.rating?.toLowerCase() === "bad",
                    "bg-orange-400 text-white": jobApplication?.rating?.toLowerCase() === "consider",
                    "bg-teal-500 text-white": jobApplication?.rating?.toLowerCase() === "good",
                  })}
                >
                  {jobApplication?.rating}
                </Badge>     
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}

export default ManageViewApplication;
