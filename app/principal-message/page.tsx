// src/app/principal-message/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function PrincipalMessagePage() {
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchMessage() {
      try {
        const res = await fetch('/api/principal-message');
        const data = await res.json();
        if (data.success && data.data && data.data.message) {
          setMessage(data.data.message);
        } else {
          setMessage(null);
        }
      } catch (err) {
        console.error(err);
        setMessage(null);
      } finally {
        setLoading(false);
      }
    }
    fetchMessage();
  }, []);

  return (
    <div className="min-h-[80vh] bg-gray-50 flex flex-col justify-center items-center px-6 py-12">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-8 md:p-10 text-center">
        {/* Header Icon */}
        <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center text-3xl mx-auto mb-6">
          📜
        </div>

        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
          Message from the Principal
        </h1>
        <p className="text-sm text-blue-600 font-semibold uppercase tracking-wider mb-8">
          Islamabad Grammar School
        </p>

        {loading ? (
          <div className="py-8 text-gray-500 font-medium">Loading message...</div>
        ) : message ? (
          <div className="bg-blue-50 border border-blue-100 p-6 rounded-2xl text-gray-800 text-lg leading-relaxed italic relative mb-8">
            <span className="text-4xl text-blue-300 absolute -top-4 left-4 font-serif">“</span>
            <p className="relative z-10 px-4">{message}</p>
            <span className="text-4xl text-blue-300 absolute -bottom-8 right-4 font-serif">”</span>
          </div>
        ) : (
          <div className="bg-gray-100 border border-gray-200 p-8 rounded-2xl text-gray-600 font-medium text-lg mb-8">
            There is no message from the principal at this time.
          </div>
        )}

        {/* Back Button */}
        <button
          onClick={() => router.push('/')}
          className="bg-blue-600 text-white px-6 py-3 rounded-xl font-medium hover:bg-blue-700 transition shadow-md"
        >
          &larr; Back to Home
        </button>
      </div>
    </div>
  );
}