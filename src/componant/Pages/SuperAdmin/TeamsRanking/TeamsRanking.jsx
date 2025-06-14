  import React, { useEffect, useState } from 'react';
import axios from 'axios';



export default function TeamsRanking() {
  const [age, setAge] = useState('all');
  const [teams, setTeams] = useState([]);
  const getTeams = async () => {
    try {
      const response = await axios.get('https://sports.runasp.net/api/Matches-Table');
      setTeams(response.data);
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getTeams();
  }, []);

  return (
    <div className="min-h-screen bg-[#f6f7fa] p-4" dir="rtl" style={{ fontFamily: 'Cairo, sans-serif' }}>
      {/* الهيدر */}
      <div className="flex items-center justify-between p-4 rounded-md mb-6 bg-[#2563eb]">
        <div className="text-white text-2xl font-bold">ترتيب الفرق المشاركة</div>
        <button className="bg-white text-[#2563eb] px-4 py-2 rounded shadow hover:bg-gray-100 font-medium flex items-center gap-2">
          <span className="material-icons" style={{ fontSize: 20 }}>refresh</span>
          تحديث الترتيب
        </button>
      </div>

      {/* فلاتر الفئة */}
      <div className="flex items-center justify-center gap-6 mb-6">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="radio" name="age" checked={age === '16'} onChange={() => setAge('16')} className="text-[#2563eb]" />
          <span className="text-gray-700 font-medium">تحت 16 سنة</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="radio" name="age" checked={age === '18'} onChange={() => setAge('18')} className="text-[#2563eb]" />
          <span className="text-gray-700 font-medium">تحت 18 سنة</span>
        </label>
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="radio" name="age" checked={age === 'all'} onChange={() => setAge('all')} className="text-[#2563eb]" />
          <span className="text-gray-700 font-medium">الكل</span>
        </label>
      </div>

      {/* جدول الترتيب */}
      <div className="bg-white rounded-xl shadow p-0 max-w-5xl mx-auto overflow-x-auto">
        <table className="w-full text-center border-collapse">
          <thead>
            <tr className="bg-[#2563eb] text-white text-base">
              <th className="py-3 px-2">#</th>
              <th className="py-3 px-2">الفريق</th>
              <th className="py-3 px-2">لعب</th>
              <th className="py-3 px-2">فوز</th>
              <th className="py-3 px-2">تعادل</th>
              <th className="py-3 px-2">خسارة</th>
              <th className="py-3 px-2">له</th>
              <th className="py-3 px-2">عليه</th>
              <th className="py-3 px-2">+/-</th>
              <th className="py-3 px-2">نقاط</th>
            </tr>
          </thead>
          <tbody>
            {teams.map((team, idx) => (
              <tr key={team.id} className="border-b hover:bg-gray-50">
                <td className="py-2 font-bold text-[#2563eb]">{idx + 1}</td>
                <td className="py-2">{team.matchesPlayed}</td>
                <td className="py-2">{team.academyName}</td>
                <td className="py-2">{team.wins}</td>
                <td className="py-2">{team.draws}</td>
                <td className="py-2">{team.losses}</td>
                <td className="py-2">{team.goalsFor}</td>
                <td className="py-2">{team.goalsAgainst}</td>
                <td className="py-2">{team.goalDifference}</td>
                <td className="py-2 font-bold text-[#2563eb]">{team.points}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
