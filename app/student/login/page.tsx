// src/app/student/login/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function StudentLoginPage() {
  const [grade, setGrade] = useState('Grade 1');
  const [rollNumber, setRollNumber] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/student/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ grade, rollNumber, password }),
      });
      const data = await res.json();

      if (data.success) {
        router.push('/student/dashboard');
      } else {
        setError(data.error || 'Login failed.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100 max-w-md w-full space-y-6">
        <div className="text-center">
          <span className="text-4xl mb-2 block">🎓</span>
          <h1 className="text-2xl font-bold text-gray-800">Student Login</h1>
          <p className="text-sm text-gray-500 mt-1">Islamabad Grammar School</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Select Grade</label>
            <select
              value={grade}
              onChange={(e) => setGrade(e.target.value)}
              className="w-full border p-3 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none font-medium text-gray-700"
            >
              {Array.from({ length: 11 }).map((_, i) => (
                <option key={i} value={`Grade ${i}`}>{`Grade ${i}`}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Roll Number</label>
            <input
              type="text"
              placeholder="e.g. R1"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              required
              className="w-full border p-3 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-gray-600 uppercase mb-1">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border p-3 rounded-xl bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none font-medium"
            />
          </div>

          {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition shadow-md"
          >
            {loading ? 'Logging in...' : 'Login to Dashboard'}
          </button>
        </form>
      </div>
    </div>
  );
}