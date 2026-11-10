// src/app/student/dashboard/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function StudentDashboard() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  function getCookie(name: string) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop()?.split(';').shift();
  }

  useEffect(() => {
    async function fetchDashboard() {
      const studentId = getCookie('studentId');
      if (!studentId) {
        router.push('/student/login');
        return;
      }

      try {
        const res = await fetch(`/api/student/profile?id=${studentId}`);
        const result = await res.json();
        if (result.success) {
          setData(result.data);
        } else {
          router.push('/student/login');
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchDashboard();
  }, [router]);

  const handleLogout = () => {
    document.cookie = 'studentId=; Max-Age=0; path=/;';
    router.push('/student/login');
  };

  if (loading) {
    return <div className="p-8 text-center text-gray-600 font-medium">Authenticating & Loading Dashboard...</div>;
  }

  const history = data?.attendanceHistory || [];
  const presents = history.filter((h: any) => h.status === 'Present').length;
  const absents = history.length - presents;
  const attendancePercentage = history.length > 0 ? ((presents / history.length) * 100).toFixed(1) : '100';

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-6">
        
        {/* Header Bar */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 flex justify-between items-center">
          <div>
            <span className="bg-blue-100 text-blue-700 text-xs font-bold px-3 py-1 rounded-full uppercase">
              {data?.student?.grade}
            </span>
            <h1 className="text-2xl font-bold text-gray-800 mt-2">{data?.student?.name}</h1>
            <p className="text-xs text-gray-500">Roll No: {data?.student?.rollNumber}</p>
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-green-50 border border-green-200 p-4 rounded-2xl text-center">
            <p className="text-xs text-green-600 font-semibold uppercase">Presents</p>
            <p className="text-2xl font-bold text-green-700">{presents}</p>
          </div>
          <div className="bg-red-50 border border-red-200 p-4 rounded-2xl text-center">
            <p className="text-xs text-red-600 font-semibold uppercase">Absents</p>
            <p className="text-2xl font-bold text-red-700">{absents}</p>
          </div>
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-2xl text-center">
            <p className="text-xs text-blue-600 font-semibold uppercase">Attendance %</p>
            <p className="text-2xl font-bold text-blue-700">{attendancePercentage}%</p>
          </div>
        </div>

        {/* Results */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-bold text-gray-800 mb-4">Academic Results 📊</h2>
          <table className="w-full text-left">
            <thead>
              <tr className="bg-gray-50 text-xs text-gray-500 uppercase">
                <th className="p-3">Subject</th>
                <th className="p-3">Marks</th>
                <th className="p-3">Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y text-sm">
              {data?.student?.results?.map((r: any, i: number) => (
                <tr key={i}>
                  <td className="p-3 font-semibold text-gray-800">{r.subject}</td>
                  <td className="p-3 text-blue-600 font-medium">{r.marksObtained}/{r.totalMarks}</td>
                  <td className="p-3 font-bold">{r.grade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>
    </div>
  );
}