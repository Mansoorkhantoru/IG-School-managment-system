// src/app/admin/students/page.tsx
'use client';

import { useRouter } from 'next/navigation';

export default function StudentsIndexPage() {
  const router = useRouter();

  // Aap apni zaroorat ke mutabiq classes yahan add kar sakte hain
  const classesList = [
     { id: '0', name: 'Grade 0', description: 'Manage Grade 0 students' },
     { id: '1', name: 'Grade 1', description: 'Manage Grade 1 students' },
     { id: '2', name: 'Grade 2', description: 'Manage Grade 2 students' },
     { id: '3', name: 'Grade 3', description: 'Manage Grade 3 students' },
     { id: '4', name: 'Grade 4', description: 'Manage Grade 4 students' },
     { id: '5', name: 'Grade 5', description: 'Manage Grade 5 students' },
    { id: '6', name: 'Grade 6', description: 'Manage Grade 6 students' },
    { id: '7', name: 'Grade 7', description: 'Manage Grade 7 students' },
    { id: '9', name: 'Grade 9', description: 'Manage Grade 9 students' },
    { id: '10', name: 'Grade 10', description: 'Manage Grade 10 students' },
  ];

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-2 text-gray-800">Student Management</h1>
      <p className="text-gray-600 mb-8">Kisi bhi class par click karke uske students dekhein aur manage karein.</p>

      {/* Classes Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {classesList.map((cls) => (
          <div
            key={cls.id}
            onClick={() => router.push(`/admin/students/Grade-${cls.id}`)}
            className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-lg hover:border-blue-500 cursor-pointer transition transform hover:-translate-y-1"
          >
            <h2 className="text-xl font-bold text-gray-800 mb-2">{cls.name}</h2>
            <p className="text-sm text-gray-500 mb-4">{cls.description}</p>
            <span className="inline-block text-blue-600 font-medium text-sm">
              View Students &rarr;
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}