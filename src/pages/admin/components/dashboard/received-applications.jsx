import React, { useEffect, useState } from 'react'
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { noOfJobApplicationsReceived } from './api/received-applications';
const CountOfReceivedApplication = () => {

    const [countOfJobApplications, setCountOfJobApplications] = useState();
    useEffect(() => {
        const fetchData = async() => {
            try {
                const data = await noOfJobApplicationsReceived();
                setCountOfJobApplications(data)
            } catch (error) {
                console.log(error)
            }
           
        }

        fetchData();
    },[]);
  return (
    <div>
       <Card className='bg-muted'>
        <CardHeader>
            <CardTitle>No of Job Applications Received</CardTitle>
        </CardHeader>
        <CardContent>
            <p>{countOfJobApplications}</p>
        </CardContent>
    </Card>
    </div>
  )
}

export default CountOfReceivedApplication
