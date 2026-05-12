import { useState } from 'react';
import { useNavigate } from 'react-router';
import { api } from '../../../services/api';
import { Upload, FileText, AlertCircle } from 'lucide-react';

export function FileUploadDropzone() {
  const [dragging, setDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleFile = async (file: File) => {
    if (!file.name.endsWith('.txt') && !file.name.endsWith('.md')) {
      setError('Only .txt and .md files are allowed.');
      return;
    }

    setUploading(true);
    setError('');
    try {
      const doc = await api.upload('/documents/upload', file);
      navigate(`/editor/${doc.id}`);
    } catch {
      setError('Failed to upload file.');
    } finally {
      setUploading(false);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  return (
    <div className="space-y-4">
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-12 transition ${
          dragging ? 'border-sky-500 bg-sky-50' : 'border-slate-300 bg-white hover:border-slate-400'
        }`}
      >
        <div className="rounded-full bg-slate-100 p-4 text-slate-400">
          <Upload size={32} />
        </div>
        <div className="mt-4 text-center">
          <p className="text-lg font-medium text-slate-900">
            {uploading ? 'Uploading...' : 'Drop your file here'}
          </p>
          <p className="mt-1 text-sm text-slate-500">
            Support .txt and .md files
          </p>
        </div>
        <label className="mt-6 cursor-pointer rounded-md bg-white px-4 py-2 text-sm font-semibold text-slate-900 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50">
          Select file
          <input
            type="file"
            className="hidden"
            accept=".txt,.md"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFile(file);
            }}
          />
        </label>
      </div>

      {error && (
        <div className="flex items-center gap-2 rounded-md bg-red-50 p-4 text-sm text-red-700">
          <AlertCircle size={16} />
          {error}
        </div>
      )}

      <div className="rounded-lg bg-blue-50 p-6 text-blue-800">
        <h4 className="flex items-center gap-2 font-semibold">
          <FileText size={18} />
          Why upload?
        </h4>
        <p className="mt-2 text-sm leading-relaxed">
          Importing existing notes allows you to use our rich text editor to format them and share them with your team members easily.
        </p>
      </div>
    </div>
  );
}
