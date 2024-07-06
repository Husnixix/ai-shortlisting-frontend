import React from 'react'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'


const Navbar = () => {
  return (
    <div className='flex gap-2 mb-3 mt-6'>
      <Button asChild>
        <Link to={'/admin/dashboard'}>Dashboard</Link>
      </Button>
      <Button asChild>
        <Link to={'/admin/manage-jobs'}>ManageJobs</Link>
      </Button>
      <Button asChild>
        <Link to={'/admin/post-jobs'}>Post Jobs</Link>
      </Button>   
      <Button asChild>
        <Link to={'/admin/manage-job-applications'}>Manage Job Application</Link>
      </Button>     
    </div>
  )
}

export default Navbar
