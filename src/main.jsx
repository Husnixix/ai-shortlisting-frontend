import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import RootLayout from './layout/root.layout.jsx';
import HomePage from './pages/home/home.page.jsx';
import JobPage from './pages/job/job.page.jsx';
import SignInPage from './pages/sign-in.page.jsx';
import SignUpPage from './pages/sign-up.page.jsx';
import './index.css';
import MainLayout from './layout/main.layout.jsx';
import AdminLayout from './pages/admin/layout/admin-layout.jsx';
import Dashboard from './pages/admin/pages/dashboard.jsx';
import PostJob from './pages/admin/components/job/components/post-jobs.jsx';
import EditJobCard from './pages/admin/components/job/components/edit-job.jsx';
import { ClerkProvider } from '@clerk/clerk-react';
import ManagePostedJobs from './pages/admin/components/job/components/manage-jobs.jsx';
import ManageJobApplications from './pages/admin/components/job-applications/components/manage-job-applications.jsx';
import ViewJobApplicationForJob from './pages/admin/components/job-applications/components/view-job-application.jsx';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

const router = createBrowserRouter([
  {
    element: <RootLayout />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: "/",
            element: <HomePage />
          },
          {
            path: "/jobs/:id",
            element: <JobPage />
          },
          {
            path: "/admin",
            element: <AdminLayout />,
            children: [
              {
                path: "dashboard",
                element: <Dashboard />
              },
              {
                path: "manage-jobs",
                element: <ManagePostedJobs />
              },
              {
                path: "post-jobs",
                element: <PostJob />
              },
              {
                path: "edit-jobs/:id",
                element: <EditJobCard />
              },
              {
                path: "manage-job-applications",
                element: <ManageJobApplications />
              },
              {
                path: "view-applications/:id",
                element: <ViewJobApplicationForJob />
              }

            ]
          }
        ]
      },
      {
        path: "/sign-in",
        element: <SignInPage />
      },
      {
        path: "/sign-up",
        element: <SignUpPage />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <RouterProvider router={router} />
    </ClerkProvider>
  </React.StrictMode>
);
