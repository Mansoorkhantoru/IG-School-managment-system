// src/app/page.tsx
'use client';

import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col justify-between">
      <div>
        {/* Top Notification Bar / Quick Link for Principal Message */}
        <div className="bg-blue-900 text-white px-6 py-3 text-center text-sm font-medium flex justify-between items-center max-w-7xl mx-auto rounded-b-2xl shadow-md">
          <span>Official Announcements & Updates</span>
          <button
            onClick={() => router.push('/principal-message')}
            className="bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2 rounded-lg transition shadow-sm flex items-center gap-1.5"
          >
            📢 Principal's Message &rarr;
          </button>
        </div>

        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 py-16 text-center md:text-left flex flex-col md:flex-row items-center justify-between gap-12">
          <div className="md:w-1/2 space-y-6">
            <span className="bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wide">
              Welcome to Islamabad Grammar School 🎓
            </span>
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
              Empowering Education, <span className="text-blue-600">Simplifying Management.</span>
            </h1>
            <p className="text-lg text-gray-600">
              Our School Management System provides a unified platform for student academic growth, efficient attendance tracking for teachers, and complete digital administrative control.
            </p>

            {/* Direct Button to Principal Message */}
            <div className="pt-2">
              <button
                onClick={() => router.push('/principal-message')}
                className="bg-blue-600 text-white px-6 py-3.5 rounded-xl font-semibold shadow-lg hover:bg-blue-700 transition flex items-center gap-2"
              >
                📜 Read Principal's Message &rarr;
              </button>
            </div>
          </div>

          {/* Hero Visual Card */}
          <div className="md:w-1/2 w-full bg-white p-8 rounded-3xl shadow-xl border border-gray-100 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-4 py-1.5 rounded-bl-xl">
              Admissions Open 2026
            </div>
            <h3 className="text-2xl font-bold text-gray-800 mb-3">Building a Brighter Future</h3>
            <p className="text-gray-600 text-sm mb-6">
              Dedicated faculty, modern classrooms, and a reliable digital attendance framework ensuring quality education.
            </p>
            <div className="grid grid-cols-2 gap-4 text-center">
              <div className="bg-blue-50 p-4 rounded-xl">
                <h4 className="text-xl font-bold text-blue-600">100%</h4>
                <p className="text-xs text-gray-500">Digital Tracking</p>
              </div>
              <div className="bg-blue-50 p-4 rounded-xl">
                <h4 className="text-xl font-bold text-blue-600">Grades 0-10</h4>
                <p className="text-xs text-gray-500">Structured Classes</p>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="max-w-7xl mx-auto px-6 py-16 border-t border-gray-100">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800">Why Choose Islamabad Grammar School?</h2>
            <p className="text-gray-600 mt-2">Discover the core features that streamline our school management.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
              <div className="text-3xl mb-4">👥</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Student Profiles & Records</h3>
              <p className="text-gray-600 text-sm">
                Manage individual student profiles, roll numbers, and comprehensive attendance histories seamlessly.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
              <div className="text-3xl mb-4">📝</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Smart Attendance System</h3>
              <p className="text-gray-600 text-sm">
                An efficient and reliable approach for teachers to record class-wise daily student attendance.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Admin Reports & Analytics</h3>
              <p className="text-gray-600 text-sm">
                Keep track of date-wise attendance reports and present/absent analytics directly from the admin dashboard.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 text-center text-sm">
        <p>&copy; 2026 Islamabad Grammar School. All rights reserved. Designed for smarter education.</p>
      </footer>
    </div>
  );
}