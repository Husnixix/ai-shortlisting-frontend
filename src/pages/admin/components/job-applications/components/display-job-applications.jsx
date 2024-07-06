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
import { Badge } from "@/components/ui/badge";
import { cn } from '@/lib/utils';

const DisplayJobApplications = ({ jobApplications = [], onReject }) => {
  if (!jobApplications.length) {
    return <div>No Job Applications found.</div>;
  }

  return (
    <div>
      <h4>Job Applications</h4>
      <Table className="bg-muted rounded p-1">
        <TableCaption>Job Applications</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">User ID</TableHead>
            <TableHead>User Name</TableHead>
            <TableHead>Job ID</TableHead>
            <TableHead>Job Title</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead className="text-right">Reject</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {jobApplications.map((jobApplication) => (
            <TableRow key={jobApplication._id}>
              <TableCell className="font-medium">{jobApplication.userID}</TableCell>
              <TableCell>{jobApplication.fullName}</TableCell>
              <TableCell>{jobApplication.job?._id || "N/A"}</TableCell>
              <TableCell>{jobApplication.job?.title || "N/A"}</TableCell>
              <TableCell>
                <Badge className={cn({
                    "bg-red-500 text-white": jobApplication?.rating?.toLowerCase() === "bad",
                    "bg-yellow-500 text-white": jobApplication?.rating?.toLowerCase() === "consider",
                    "bg-green-500 text-white": jobApplication?.rating?.toLowerCase() === "good",
                  })}>
                  {jobApplication?.rating}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button className="text-white bg-red-600" onClick={() => onReject(jobApplication._id)}>
                  Reject
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DisplayJobApplications;
