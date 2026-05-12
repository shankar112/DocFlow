import { createBrowserRouter } from 'react-router'
import { AppLayout } from '../components/layout/AppLayout'
import { DashboardPage } from '../pages/DashboardPage'
import { DocumentEditorPage } from '../pages/DocumentEditorPage'
import { FileUploadPage } from '../pages/FileUploadPage'
import { NotFoundPage } from '../pages/NotFoundPage'
import { SharingPage } from '../pages/SharingPage'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'editor', element: <DocumentEditorPage /> },
      { path: 'upload', element: <FileUploadPage /> },
      { path: 'share', element: <SharingPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
])
