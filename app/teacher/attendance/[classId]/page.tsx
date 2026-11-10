'use client';

import { useState, useEffect } from 'react';
import { useParams, useSearchParams, useRouter } from 'next/navigation';

export default function AttendancePage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const router = useRouter();

  const classId = params.classId;
  const grade = searchParams.get('grade') || '';

  const [students, setStudents] = useState<any[]>([]);
  const [attendanceStatus, setAttendanceStatus] = useState<{ [key: string]: 'Present' | 'Absent' }>({});
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function fetchStudentsAndAttendance() {
      try {
        const res = await fetch('/api/students');
        const data = await res.json();
        if (data.success) {
          // Sirf is grade ke students filter karein
          const filtered = data.data.filter(
            (s: any) => s.grade.toLowerCase() === grade.toLowerCase()
          );
          setStudents(filtered);

          // Default sabko 'Present' set kar dein
          const initialStatus: { [key: string]: 'Present' | 'Absent' } = {};
          filtered.forEach((s: any) => {
            initialStatus[s._id] = 'Present';
          });
          setAttendanceStatus(initialStatus);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    if (grade) fetchStudentsAndAttendance();
  }, [grade]);

  const handleStatusChange = (studentId: string, status: 'Present' | 'Absent') => {
    setAttendanceStatus(prev => ({ ...prev, [studentId]: status }));
  };

  const handleSubmit = async () => {
    setSubmitting(true);
    try {
      // Get teacherId from cookie
      const getCookie = (name: string) => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift();
      };
      const teacherId = getCookie('teacherId');

      const records = Object.keys(attendanceStatus).map(studentId => ({
        studentId,
        status: attendanceStatus[studentId]
      }));

      const res = await fetch('/api/attendance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ classId, teacherId, date, records })
      });

      const data = await res.json();
      if (data.success) {
        alert('Attendance saved successfully!');
        router.push('/teacher/dashboard');
      } else {
        alert(data.error || 'Failed to save attendance');
      }
    } catch (err) {
      alert('Something went wrong.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <button onClick={() => router.push('/teacher/dashboard')} className="text-blue-600 mb-4 text-sm font-medium">
        &larr; Back to Dashboard
      </button>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Attendance for {grade}</h1>
        <input 
          type="date" 
          value={date} 
          onChange={(e) => setDate(e.target.value)} 
          className="border p-2 rounded-lg text-sm"
        />
      </div>

      {loading ? (
        <p>Loading students...</p>
      ) : students.length === 0 ? (
        <p className="text-gray-500">Is class mein koi student nahi hai.</p>
      ) : (
        <div className="bg-white rounded-lg shadow-md border overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 text-gray-600 uppercase text-xs">
                <th className="p-4 border-b">Roll No</th>
                <th className="p-4 border-b">Student Name</th>
                <th className="p-4 border-b text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y text-gray-700">
              {students.map((student) => (
                <tr key={student._id} className="hover:bg-gray-50">
                  <p></p>
                  <td className="p-4">{student.rollNumber}</td>
                  <td className="p-4 font-medium">{student.name}</td>
                  <td className="p-4 text-center space-x-4">
                    <label className="cursor-pointer text-green-600 font-medium">
                      <input 
                        type="radio" 
                        name={`status-${student._id}`} 
                        checked={attendanceStatus[student._id] === 'Present'}
                        onChange={() => handleStatusChange(student._id, 'Present')}
                        className="mr-1"
                      />
                      Present
                    </label>
                    <label className="cursor-pointer text-red-600 font-medium">
                      <input 
                        type="radio" 
                        name={`status-${student._id}`} 
                        checked={attendanceStatus[student._id] === 'Absent'}
                        onChange={() => handleStatusChange(student._id, 'Absent')}
                        className="mr-1"
                      />
                      Absent
                    </label>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-4 bg-gray-50 border-t flex justify-end">
            <button 
              onClick={handleSubmit} 
              disabled={submitting}
              className="bg-green-600 text-white px-6 py-2.5 rounded-lg font-medium hover:bg-green-700 transition"
            >
              {submitting ? 'Saving...' : 'Submit Attendance'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}