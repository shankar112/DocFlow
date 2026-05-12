import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { api } from '../services/api';
import { DocumentEditor } from '../features/document-editor/components/DocumentEditor';
import { SharingPanel } from '../features/sharing/components/SharingPanel';
import { ArrowLeft, Save, Share2, Trash2, Download } from 'lucide-react';

export function DocumentEditorPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (id) {
      api.get(`/documents/${id}`)
        .then((data) => {
          setTitle(data.title);
          setContent(data.content);
          setLoading(false);
        })
        .catch(() => {
          alert('Failed to load document');
          navigate('/');
        });
    } else {
      setLoading(false);
    }
  }, [id, navigate]);

  const handleSave = async () => {
    if (!id) return;
    setSaving(true);
    try {
      await api.put(`/documents/${id}`, { title, content });
    } catch (err) {
      alert('Failed to save document');
    } finally {
      setSaving(false);
    }
  };

  const handleDownload = () => {
    // Convert HTML content to plain text/markdown for download
    // Strip HTML tags for a clean text file
    const plainText = content.replace(/<[^>]*>/g, '');
    const blob = new Blob([plainText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${title || 'document'}.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleDelete = async () => {
    if (!id || !window.confirm('Are you sure you want to delete this document?')) return;
    try {
      await api.delete(`/documents/${id}`);
      navigate('/');
    } catch (err) {
      alert('Failed to delete document. You might not be the owner.');
    }
  };

  if (loading) return <div className="py-10 text-center">Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate('/')}
            className="rounded-full p-2 hover:bg-slate-200"
          >
            <ArrowLeft size={20} />
          </button>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="bg-transparent text-xl font-bold text-slate-900 focus:outline-none focus:ring-b focus:ring-sky-500"
          />
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
            title="Download as .txt"
          >
            <Download size={16} />
            Download
          </button>
          <button
            onClick={() => setShowShare(true)}
            className="flex items-center gap-2 rounded-md border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
          >
            <Share2 size={16} />
            Share
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center gap-2 rounded-md border border-red-200 bg-white px-4 py-2 text-sm font-semibold text-red-600 shadow-sm hover:bg-red-50"
          >
            <Trash2 size={16} />
            Delete
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 rounded-md bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-sky-500 disabled:opacity-50"
          >
            <Save size={16} />
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>

      <DocumentEditor
        content={content}
        onChange={setContent}
      />

      {showShare && id && (
        <SharingPanel
          documentId={parseInt(id)}
          onClose={() => setShowShare(false)}
        />
      )}
    </div>
  );
}
