import React from 'react'
import CountOfPostedJobs from '../components/dashboard/posted-jobs'
import CountOfReceivedApplication from '../components/dashboard/received-applications'


const Dashboard = () => {
  return (
    <div className='mt-6'>
      <div className='mt-4 mb-4'>
         <CountOfPostedJobs/>
      </div>
      <div className='mt-4 mb-4'>
        <CountOfReceivedApplication/>
      </div>
      
    </div>
  )
}

export default Dashboard
