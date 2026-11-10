// src/app/admin/classes/page.tsx
'use client';

import { useState, useEffect } from 'react';

export default function AssignClassPage() {
  const [className, setClassName] = useState('');
  const [section, setSection] = useState('');
  const [subject, setSubject] = useState('');
  const [teacherId, setTeacherId] = useState('');
  const [teachers, setTeachers] = useState<any[]>([]);

  // Teachers fetch karo dropdown ke liye
  useEffect(() => {
    async function fetchTeachers() {
      const res = await fetch('/api/teacher');
      const data = await res.json();
      if (data.success) setTeachers(data.data);
    }
    fetchTeachers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/classes', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ className, section, subject, teacher: teacherId }),
    });
    const data = await res.json();
    if (data.success) {
      alert('Class successfully assigned to teacher!');
      setClassName('');
      setSection('');
      setSubject('');
      setTeacherId('');
    } else {
      alert(data.error || 'Failed to assign class');
    }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Assign Class to Teacher</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-md space-y-4 border">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Class Name (e.g. Grade 10)</label>
          <input
            type="text"
            value={className}
            onChange={(e) => setClassName(e.target.value)}
            required
            className="w-full border p-2.5 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Section (e.g. A)</label>
          <input
            type="text"
            value={section}
            onChange={(e) => setSection(e.target.value)}
            required
            className="w-full border p-2.5 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
          <input
            type="text"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
            className="w-full border p-2.5 rounded-lg"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Select Teacher</label>
          <select
            value={teacherId}
            onChange={(e) => setTeacherId(e.target.value)}
            required
            className="w-full border p-2.5 rounded-lg bg-white"
          >
            <option value="">-- Choose Teacher --</option>
            {teachers.map((t) => (
              <option key={t._id} value={t._id}>
                {t.name} ({t.subjectSpecialization})
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Assign Class
        </button>
      </form>
    </div>
  );
}