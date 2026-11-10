// src/app/teacher/dashboard/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function TeacherDashboard() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Helper function to get cookie value by name
    function getCookie(name: string) {
      const value = `; ${document.cookie}`;
      const parts = value.split(`; ${name}=`);
      if (parts.length === 2) return parts.pop()?.split(';').shift();
    }

    async function fetchClasses() {
      try {
        const teacherId = getCookie('teacherId');
        
        // Agar teacherId nahi milti toh teacher login page par redirect kar dein
        if (!teacherId) {
          router.push('/teacher/login');
          return;
        }

        // Pass teacherId as query parameter to the API
        const res = await fetch(`/api/classes?teacherId=${teacherId}`);
        const data = await res.json();
        if (data.success) {
          setClasses(data.data);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchClasses();
  }, [router]);

  if (loading) {
    return (
      <div className="p-8 max-w-6xl mx-auto text-center">
        <p className="text-gray-600 font-medium">Checking authentication & loading classes...</p>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">Teacher Dashboard</h1>
      <p className="text-gray-600 mb-8">Apni assigned classes dekhein aur students ki attendance manage karein.</p>

      <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Aapki Classes</h2>
        {classes.length === 0 ? (
          <p className="text-gray-500">Koi class assign nahi ki gayi hai.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {classes.map((cls: any) => (
              <div key={cls._id} className="border p-4 rounded-lg bg-gray-50 flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-lg text-gray-800">{cls.className} - Section {cls.section}</h3>
                  <p className="text-sm text-gray-600">Subject: {cls.subject}</p>
                </div>
                <button 
                  onClick={() => router.push(`/teacher/attendance/${cls._id}?grade=${cls.className}`)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition"
                >
                  Manage Attendance
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}