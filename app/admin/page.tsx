// src/app/admin/page.tsx
'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const router = useRouter();

  const handleLogout = () => {
    // Delete the token cookie by setting its expiration date to the past
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    // Redirect to the login page
    router.push('/login');
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      {/* Header Section with Logout Button */}
      <div className="flex justify-between items-center mb-8 border-b pb-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-500 mt-1">Welcome back, Administrator. Manage your school records below.</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-blue-50 text-blue-700 px-4 py-2 rounded-lg font-medium text-sm">
            Role: Super Admin
          </div>
          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-red-700 transition shadow-sm"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Quick Action Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Students Management Card */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Student Management</h2>
            <p className="text-gray-600 text-sm mb-6">
              View all registered students, check roll numbers, view grades, or add a new student profile to the system.
            </p>
          </div>
          <div className="flex gap-4">
            <Link
              href="/admin/students"
              className="flex-1 bg-blue-600 text-white text-center py-2.5 rounded-lg font-medium hover:bg-blue-700 transition"
            >
              View Students
            </Link>
            <Link
              href="/admin/students"
              className="bg-blue-50 text-blue-600 px-4 py-2.5 rounded-lg font-medium hover:bg-blue-100 transition"
            >
              + Add Student
            </Link>
          </div>
        </div>

        {/* Teachers Management Card */}
        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-100 flex flex-col justify-between">
          <div>
            <h2 className="text-xl font-semibold text-gray-800 mb-2">Teacher Management</h2>
            <p className="text-gray-600 text-sm mb-6">
              Manage faculty members, view specializations and contact info, or onboard a new teacher instructor.
            </p>
          </div>
          <div className="flex gap-4">
            <Link
              href="/admin/teachers"
              className="flex-1 bg-green-600 text-white text-center py-2.5 rounded-lg font-medium hover:bg-green-700 transition"
            >
              View Teachers
            </Link>
            <Link
              href="/admin/teachers"
              className="bg-green-50 text-green-600 px-4 py-2.5 rounded-lg font-medium hover:bg-green-100 transition"
            >
              + Add Teacher
            </Link>
          </div>
        </div>

      </div>

     
    </div>
  );
}