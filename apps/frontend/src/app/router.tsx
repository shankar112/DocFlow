import { createBrowserRouter, Navigate, Outlet } from 'react-router'
import { AppLayout } from '../components/layout/AppLayout'
import { DashboardPage } from '../pages/DashboardPage'
import { DocumentEditorPage } from '../pages/DocumentEditorPage'
import { FileUploadPage } from '../pages/FileUploadPage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { SharingPage } from '../pages/SharingPage'
import { LoginPage } from '../pages/LoginPage'

const AuthGuard = () => {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};

export const router = createBrowserRouter([
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    path: '/',
    element: <AuthGuard />,
    children: [
      {
        element: <AppLayout />,
        children: [
          { index: true, element: <DashboardPage /> },
          { path: 'editor/:id?', element: <DocumentEditorPage /> },
          { path: 'upload', element: <FileUploadPage /> },
          { path: 'share', element: <SharingPage /> },
          { path: '*', element: <NotFoundPage /> },
        ],
      },
    ],
  },
])
