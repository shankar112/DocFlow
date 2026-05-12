import { PageHeader } from '../components/ui/PageHeader'
import { FileUploadDropzone } from '../features/file-upload/components/FileUploadDropzone'

export function FileUploadPage() {
  return (
    <>
      <PageHeader
        title="File upload"
        description="A simple upload surface ready for validation, progress, and backend integration."
      />
      <FileUploadDropzone />
    </>
  )
}
