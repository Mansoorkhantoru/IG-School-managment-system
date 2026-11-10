// src/app/admin/students/profile/[id]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function StudentProfilePage() {
  const params = useParams();
  const router = useRouter();
  const studentId = params.id;

  const [student, setStudent] = useState<any>(null);
  const [attendanceHistory, setAttendanceHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStudentData() {
      try {
        // 1. Fetch all students to find this specific student's details
        const studentRes = await fetch('/api/students');
        const studentData = await studentRes.json();
        if (studentData.success) {
          const found = studentData.data.find((s: any) => s._id === studentId);
          setStudent(found);
        }

        // 2. Fetch all attendance records to filter this student's attendance
        const attRes = await fetch('/api/attendance');
        const attData = await attRes.json();
        if (attData.success) {
          // Filter records where this student exists
          const studentRecords: any[] = [];
          attData.data.forEach((att: any) => {
            const record = att.records.find(
              (r: any) => (r.studentId?._id || r.studentId) === studentId
            );
            if (record) {
              studentRecords.push({
                date: att.date,
                status: record.status,
              });
            }
          });
          setAttendanceHistory(studentRecords);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    if (studentId) fetchStudentData();
  }, [studentId]);

  if (loading) {
    return <div className="p-8 text-center text-gray-600">Loading student profile...</div>;
  }

  if (!student) {
    return <div className="p-8 text-center text-red-600">Student nahi mila!</div>;
  }

  // Calculate attendance stats
  const totalClasses = attendanceHistory.length;
  const presentCount = attendanceHistory.filter((h) => h.status === 'Present').length;
  const absentCount = totalClasses - presentCount;
  const attendancePercentage = totalClasses > 0 ? ((presentCount / totalClasses) * 100).toFixed(1) : 0;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <button 
        onClick={() => router.back()} 
        className="text-blue-600 mb-6 font-medium text-sm hover:underline"
      >
        &larr; Wapas Jayein
      </button>

      {/* Student Header Card */}
      <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full uppercase">
            {student.grade}
          </span>
          <h1 className="text-3xl font-bold text-gray-900 mt-2">{student.name}</h1>
          <p className="text-gray-500 text-sm mt-1">Roll Number: <span className="font-semibold text-gray-700">{student.rollNumber}</span></p>
        </div>

        <div className="flex gap-3">
          <div className="bg-green-50 border border-green-200 px-4 py-3 rounded-xl text-center">
            <p className="text-xs text-green-600 font-semibold uppercase">Present</p>
            <p className="text-xl font-bold text-green-700">{presentCount}</p>
          </div>
          <div className="bg-red-50 border border-red-200 px-4 py-3 rounded-xl text-center">
            <p className="text-xs text-red-600 font-semibold uppercase">Absent</p>
            <p className="text-xl font-bold text-red-700">{absentCount}</p>
          </div>
          <div className="bg-blue-50 border border-blue-200 px-4 py-3 rounded-xl text-center">
            <p className="text-xs text-blue-600 font-semibold uppercase">Attendance %</p>
            <p className="text-xl font-bold text-blue-700">{attendancePercentage}%</p>
          </div>
        </div>
      </div>

      {/* Attendance History Table */}
      <div className="bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-xl font-bold text-gray-800">Attendance History</h3>
          <p className="text-gray-500 text-sm">Date-wise record of this student's attendance.</p>
        </div>

        {attendanceHistory.length === 0 ? (
          <p className="p-6 text-gray-500 text-center">Is student ka abhi tak koi attendance record nahi hai.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-50 text-gray-600 uppercase text-xs">
                  <th className="p-4 border-b">Date</th>
                  <th className="p-4 border-b">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y text-gray-700">
                {attendanceHistory.map((item, idx) => (
                  <tr key={idx} className="hover:bg-gray-50">
                    <td className="p-4 font-medium">{item.date}</td>
                    <td className={`p-4 font-semibold ${item.status === 'Present' ? 'text-green-600' : 'text-red-600'}`}>
                      {item.status}
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