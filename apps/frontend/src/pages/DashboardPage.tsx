import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { api } from '../services/api';

interface Document {
  id: number;
  title: string;
  owner_id: number;
  created_at: string;
  updated_at: string;
}

export function DashboardPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const fetchDocuments = async () => {
    try {
      const data = await api.get('/documents/');
      setDocuments(data);
    } catch (err) {
      console.error('Failed to fetch documents', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  const handleCreateDocument = async () => {
    const title = window.prompt('Enter a title for your new document:', 'My New Document');
    if (title === null) return; // User cancelled
    
    const finalTitle = title.trim() || 'Untitled Document';
    
    try {
      const newDoc = await api.post('/documents/', { title: finalTitle, content: '' });
      navigate(`/editor/${newDoc.id}`);
    } catch {
      alert('Failed to create document');
    }
  };

  if (loading) return <div>Loading documents...</div>;

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-slate-900">Your Documents</h2>
          <p className="text-sm text-slate-600">Manage and edit your collaborative files.</p>
        </div>
        <button
          onClick={handleCreateDocument}
          className="rounded-md bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500"
        >
          Create New Document
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {documents.map((doc) => (
          <Link
            key={doc.id}
            to={`/editor/${doc.id}`}
            className="group block rounded-lg border border-slate-200 bg-white p-5 transition hover:border-sky-300 hover:shadow-sm"
          >
            <h3 className="text-lg font-semibold text-slate-900 group-hover:text-sky-600">{doc.title}</h3>
            <p className="mt-1 text-xs text-slate-500">
              Last updated: {new Date(doc.updated_at).toLocaleDateString()}
            </p>
          </Link>
        ))}
        {documents.length === 0 && (
          <div className="col-span-full py-12 text-center text-slate-500">
            No documents yet. Create one to get started!
          </div>
        )}
      </div>
    </div>
  );
}
