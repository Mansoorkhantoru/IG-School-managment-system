'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function TeacherLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/teacher/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();
    if (data.success) {
      // Store teacher ID in cookie/localStorage to identify them on dashboard
      document.cookie = `teacherId=${data.teacher.id}; path=/`;
      router.push('/teacher/dashboard');
    } else {
      alert(data.error || 'Login failed');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-md border">
        <h1 className="text-2xl font-bold mb-6 text-gray-800 text-center">Teacher Login</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full border p-2.5 rounded-lg"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full border p-2.5 rounded-lg"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white p-2.5 rounded-lg font-medium hover:bg-green-700 transition"
          >
            Login as Teacher
          </button>
        </form>
      </div>
    </div>
  );
}