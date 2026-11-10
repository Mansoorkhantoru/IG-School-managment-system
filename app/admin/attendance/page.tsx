// src/app/admin/attendance/page.tsx
'use client';

import { useState, useEffect } from 'react';

export default function AdminAttendanceReport() {
  const [attendanceRecords, setAttendanceRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAttendance() {
      try {
        const res = await fetch('/api/attendance');
        const data = await res.json();
        if (data.success) {
          setAttendanceRecords(data.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchAttendance();
  }, []);

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-2 text-gray-800">Admin Attendance Reports</h1>
      <p className="text-gray-600 mb-8">Dekhein kis din kis class mein kitne students present ya absent thay.</p>

      {loading ? (
        <p>Loading reports...</p>
      ) : attendanceRecords.length === 0 ? (
        <p className="text-gray-500">Abhi tak koi attendance record nahi banaya gaya hai.</p>
      ) : (
        <div className="space-y-6">
          {attendanceRecords.map((record: any) => {
            const totalStudents = record.records.length;
            const presentCount = record.records.filter((r: any) => r.status === 'Present').length;
            const absentCount = totalStudents - presentCount;

            return (
              <div key={record._id} className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4 pb-4 border-b">
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">Date: {record.date}</h3>
                    <p className="text-sm text-gray-500">Class Attendance Summary</p>
                  </div>
                  <div className="flex gap-4 mt-2 md:mt-0">
                    <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm font-medium">
                      Present: {presentCount}
                    </span>
                    <span className="bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm font-medium">
                      Absent: {absentCount}
                    </span>
                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                      Total: {totalStudents}
                    </span>
                  </div>
                </div>

                {/* Students details list with Name and Roll Number */}
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-sm text-gray-600">
                    <thead>
                      <tr className="bg-gray-50 uppercase text-xs">
                        <th className="p-3">Roll Number</th>
                        <th className="p-3">Student Name</th>
                        <th className="p-3">Status</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {record.records.map((item: any, idx: number) => (
                        <tr key={idx}>
                          <td className="p-3 font-medium">{item.studentId?.rollNumber || 'N/A'}</td>
                          <td className="p-3 font-medium text-gray-800">{item.studentId?.name || 'Unknown Student'}</td>
                          <td className={`p-3 font-semibold ${item.status === 'Present' ? 'text-green-600' : 'text-red-600'}`}>
                            {item.status}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}