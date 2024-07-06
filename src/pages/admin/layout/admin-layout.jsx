import React, { useEffect, useState } from 'react';
import Navbar from '../shared/Navbar';
import { Outlet, useNavigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';

const AdminLayout = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const navigate = useNavigate();
  const [unauthorized, setUnauthorized] = useState(false);

  useEffect(() => {
    if (!isLoaded) {
      return;
    }

    if (!isSignedIn) {
      navigate('/sign-in');
    } else if (user?.publicMetadata?.role === 'admin') {
      navigate('/admin/dashboard'); 
    } else {
      setUnauthorized(true);
      setTimeout(() => {
        navigate('/sign-in');
      }, 3000);
    }
  }, [user, isLoaded, isSignedIn, navigate]);

  if (!isLoaded) {
    return <div className='text-white'>Loading...</div>;
  }

  if (unauthorized) {
    return <div className='text-white'>Unauthorized Access!</div>;
  }

  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};

export default AdminLayout;
