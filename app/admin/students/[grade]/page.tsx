// src/app/admin/students/[grade]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

interface Student {
  _id: string;
  name: string;
  email: string;
  rollNumber: string;
  grade: string;
}

export default function GradeStudentsPage() {
  const params = useParams();
  const router = useRouter();
  
  // URL se grade decode karein (e.g. "Grade-10" ko "Grade 10" banayein)
  const rawGrade = Array.isArray(params.grade) ? params.grade[0] : params.grade;
  const currentGrade = rawGrade ? decodeURIComponent(rawGrade).replace('-', ' ') : '';

  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);

  // Form states (Pre-filled with current grade)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const fetchStudents = async () => {
    try {
      const res = await fetch('/api/students');
      const data = await res.json();
      if (data.success) {
        // Sirf is specific grade ke students filter karein
        const filtered = data.data.filter(
          (s: Student) => s.grade.toLowerCase() === currentGrade.toLowerCase()
        );
        setStudents(filtered);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentGrade) {
      fetchStudents();
    }
  }, [currentGrade]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch('/api/students', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, rollNumber, grade: currentGrade }),
      });

      const data = await res.json();
      if (data.success) {
        setName('');
        setEmail('');
        setRollNumber('');
        fetchStudents();
      } else {
        alert(data.error || 'Error adding student');
      }
    } catch (err) {
      alert('Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <button
        onClick={() => router.push('/admin/students')}
        className="mb-6 text-sm text-blue-600 hover:underline flex items-center gap-1 font-medium"
      >
        &larr; Back to Classes
      </button>

      <h1 className="text-3xl font-bold mb-6 text-gray-800">{currentGrade} Students</h1>

      {/* Add Student Form for this specific grade */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8 border border-gray-100">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Add Student to {currentGrade}</h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            className="border p-2.5 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border p-2.5 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <input
            type="text"
            placeholder="Roll Number (e.g. R101)"
            value={rollNumber}
            onChange={(e) => setRollNumber(e.target.value)}
            required
            className="border p-2.5 rounded focus:ring-2 focus:ring-blue-500 outline-none"
          />
          <button
            type="submit"
            disabled={submitting}
            className="md:col-span-3 bg-blue-600 text-white p-2.5 rounded hover:bg-blue-700 transition font-medium"
          >
            {submitting ? 'Adding...' : `Add Student to ${currentGrade}`}
          </button>
        </form>
      </div>

      {/* Students Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-100">
        <div className="p-6 pb-4 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-gray-700">Enrolled Students</h2>
          <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            Profile dekhne ke liye student par click karein
          </span>
        </div>

        {loading ? (
          <p className="p-6 text-gray-500">Loading...</p>
        ) : students.length === 0 ? (
          <p className="p-6 text-gray-500">Is class mein abhi koi student nahi hai.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-600 uppercase text-xs">
                  <th className="p-4 border-b">Name</th>
                  <th className="p-4 border-b">Email</th>
                  <th className="p-4 border-b">Roll Number</th>
                  <th className="p-4 border-b text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y text-gray-700">
                {students.map((student) => (
                  <tr 
                    key={student._id} 
                    onClick={() => router.push(`/admin/students/profile/${student._id}`)}
                    className="hover:bg-blue-50 cursor-pointer transition"
                  >
                    <td className="p-4 font-medium text-blue-600 underline">{student.name}</td>
                    <td className="p-4">{student.email}</td>
                    <td className="p-4">{student.rollNumber}</td>
                    <td className="p-4 text-right">
                      <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-lg font-medium">
                        View Profile &rarr;
                      </span>
                    </td>
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