import React from 'react'

export default function ResultMatches() {
  return (
    <div className="bg-gray-100 min-h-screen p-4" dir="rtl">
      {/* الهيدر */}
      <div className="flex items-center justify-between p-4 rounded-md mb-6" style={{ background: '#2563eb' }}>
        <div className="text-white text-2xl font-bold">جدول ونتائج المباريات</div>
        <button className="bg-white text-[#2563eb] px-4 py-2 rounded shadow hover:bg-gray-100 font-medium">تحديث البيانات</button>
      </div>

      {/* جدول اليوم */}
      <div className="bg-white rounded shadow p-4 max-w-4xl mx-auto">
        <div className="flex items-center justify-center mb-4">
          <button className="bg-[#2563eb] text-white px-4 py-2 rounded font-medium">الخميس 26 يونيو</button>
        </div>
        <div className="text-center text-xl font-bold mb-6 text-[#2563eb]">الخميس 26 يونيو 2025</div>

        {/* بطاقة المباراة */}
        <div className="bg-gray-50 rounded-lg shadow p-6 flex flex-col gap-4">
          <div className="flex items-center gap-2 text-[#2563eb] mb-2">
            <span className="material-icons text-base">edit</span>
            <span>14:00</span>
          </div>
          <div className="flex items-center justify-between border-t pt-4">
            <div className="text-gray-700 font-medium">mohamed</div>
            <div className="text-2xl font-extrabold text-[#2563eb]">20 - 10</div>
            <div className="text-gray-700 font-medium">ttt</div>
          </div>
          <div className="text-left text-gray-500 text-sm mt-2">الملعب الرئيسي - البحرين</div>
        </div>
      </div>
    </div>
  )
}