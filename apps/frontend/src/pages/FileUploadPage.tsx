import { FileUploadDropzone } from '../features/file-upload/components/FileUploadDropzone';

export function FileUploadPage() {
  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-900">Upload Documents</h2>
        <p className="mt-2 text-slate-600">
          Import your local .txt or .md files into DocFlow.
        </p>
      </div>

      <FileUploadDropzone />
    </div>
  );
}
