// src/app/admin/teachers/page.tsx
'use client';

import { useState, useEffect } from 'react';

export default function TeachersPage() {
  const [teachers, setTeachers] = useState<any[]>([]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [subjectSpecialization, setSubjectSpecialization] = useState('');
  const [phone, setPhone] = useState('');
  const [submitting, setSubmitting] = useState(false);

  // Selected subject filter state ('All' matlab sabhi teachers dikhenge)
  const [selectedSubject, setSelectedSubject] = useState<string>('All');

  const fetchTeachers = async () => {
    try {
      const res = await fetch('/api/teacher');
      const data = await res.json();
      if (data.success) setTeachers(data.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch('/api/teacher', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, subjectSpecialization, phone }),
      });

      const data = await res.json();
      if (data.success) {
        setName('');
        setEmail('');
        setPassword('');
        setSubjectSpecialization('');
        setPhone('');
        fetchTeachers();
      } else {
        alert(data.error || 'Error creating teacher');
      }
    } catch (err) {
      alert('Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  };

  // Database se jitne bhi unique subjects hain unki list nikalna filter buttons ke liye
  const subjectsList = ['All', ...Array.from(new Set(teachers.map((t) => t.subjectSpecialization).filter(Boolean)))];

  // Filtered teachers based on selected subject
  const filteredTeachers = selectedSubject === 'All'
    ? teachers
    : teachers.filter((t) => t.subjectSpecialization?.toLowerCase() === selectedSubject.toLowerCase());

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Teacher Management</h1>

      {/* Add Teacher Form */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8 border">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Add New Teacher</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border p-2.5 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border p-2.5 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="password"
            placeholder="Password for Login"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="border p-2.5 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            placeholder="Subject Specialization (e.g. Math)"
            value={subjectSpecialization}
            onChange={(e) => setSubjectSpecialization(e.target.value)}
            required
            className="border p-2.5 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            className="border p-2.5 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <button
            type="submit"
            disabled={submitting}
            className="md:col-span-2 lg:col-span-3 bg-green-600 text-white p-2.5 rounded hover:bg-green-700 transition font-medium"
          >
            {submitting ? 'Adding Teacher...' : 'Add Teacher'}
          </button>
        </form>
      </div>

      {/* Subject Filter Buttons Section */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-3">Filter by Subject:</h3>
        <div className="flex flex-wrap gap-3">
          {subjectsList.map((subject) => (
            <button
              key={subject}
              onClick={() => setSelectedSubject(subject)}
              className={`px-4 py-2 rounded-lg font-medium text-sm transition ${
                selectedSubject === subject
                  ? 'bg-green-600 text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-50'
              }`}
            >
              {subject}
            </button>
          ))}
        </div>
      </div>

      {/* Teachers List Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden border">
        <h2 className="text-xl font-semibold p-6 pb-4 text-gray-700">
          Teachers List {selectedSubject !== 'All' ? `(${selectedSubject})` : '(All)'}
        </h2>
        {filteredTeachers.length === 0 ? (
          <p className="p-6 text-gray-500">Is subject ke mutabiq koi teacher nahi mila.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-600 uppercase text-xs">
                  <th className="p-4 border-b">Name</th>
                  <th className="p-4 border-b">Email</th>
                  <th className="p-4 border-b">Specialization</th>
                  <th className="p-4 border-b">Phone</th>
                </tr>
              </thead>
              <tbody className="divide-y text-gray-700">
                {filteredTeachers.map((teacher: any) => (
                  <tr key={teacher._id} className="hover:bg-gray-50">
                    <td className="p-4 font-medium">{teacher.name}</td>
                    <td className="p-4">{teacher.email}</td>
                    <td className="p-4 font-semibold text-green-600">{teacher.subjectSpecialization}</td>
                    <td className="p-4">{teacher.phone}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}