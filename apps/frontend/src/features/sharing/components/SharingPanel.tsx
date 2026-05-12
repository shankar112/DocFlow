import { useState } from 'react';
import { api } from '../../../services/api';
import { UserPlus, Check, X } from 'lucide-react';

interface SharingPanelProps {
  documentId?: number;
  onClose?: () => void;
}

export function SharingPanel({ documentId = 0, onClose = () => {} }: SharingPanelProps) {
  const [username, setUsername] = useState('');
  const [sharing, setSharing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleShare = async (e: React.FormEvent) => {
    e.preventDefault();
    setSharing(true);
    setError('');
    setSuccess(false);

    try {
      // For simplicity, we assume the user exists or handle the error
      // The backend uses user_id, so we need a way to find the user_id from username
      // I'll update the backend route to accept username if it doesn't already
      // Wait, let's look at the backend route I wrote.
      await api.post(`/documents/${documentId}/share`, { username });
      setSuccess(true);
      setUsername('');
    } catch {
      setError('User not found or sharing failed.');
    } finally {
      setSharing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-bold text-slate-900">Share Document</h3>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleShare} className="mt-6 space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-700">Username to share with</label>
            <div className="mt-1 flex gap-2">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. user2"
                className="block w-full rounded-md border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:border-sky-500 focus:outline-none focus:ring-sky-500"
                required
              />
              <button
                type="submit"
                disabled={sharing}
                className="flex items-center gap-2 rounded-md bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-500 disabled:opacity-50"
              >
                <UserPlus size={16} />
                {sharing ? 'Sharing...' : 'Share'}
              </button>
            </div>
          </div>

          {success && (
            <div className="flex items-center gap-2 text-sm font-medium text-green-600">
              <Check size={16} /> Document shared successfully!
            </div>
          )}
          
          {error && (
            <div className="text-sm font-medium text-red-600">
              {error}
            </div>
          )}
        </form>

        <div className="mt-8 rounded-lg bg-slate-50 p-4">
          <p className="text-xs text-slate-500">
            Sharing gives full edit access to the recipient. They will see this document in their dashboard.
          </p>
        </div>
      </div>
    </div>
  );
}
