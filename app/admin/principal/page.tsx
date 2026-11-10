// src/app/admin/principal/page.tsx
'use client';

import { useState, useEffect } from 'react';

export default function PrincipalPortal() {
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  useEffect(() => {
    // Fetch existing message if any
    async function fetchMessage() {
      const res = await fetch('/api/principal-message');
      const data = await res.json();
      if (data.success && data.data) {
        setMessage(data.data.message);
      }
    }
    fetchMessage();
  }, []);

  const handlePublish = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccessMsg('');

    try {
      const res = await fetch('/api/principal-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message }),
      });
      const data = await res.json();
      if (data.success) {
        setSuccessMsg('Message published successfully on the Home Page!');
      } else {
        alert('Error publishing message');
      }
    } catch (err) {
      alert('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-2 text-gray-800">Principal's Portal 👑</h1>
      <p className="text-gray-600 mb-8">Write a message or announcement for parents and visitors to display on the home page.</p>

      <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
        <form onSubmit={handlePublish} className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Announcement / Message</label>
            <textarea
              rows={5}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type your message to parents here..."
              required
              className="w-full border border-gray-300 p-3 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {successMsg && <p className="text-green-600 text-sm font-medium">{successMsg}</p>}

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition w-full md:w-auto"
          >
            {loading ? 'Publishing...' : 'Publish Message to Home Page'}
          </button>
        </form>
      </div>
    </div>
  );
}