import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useNavigate } from "react-router-dom";
import logo from "./componant/Images/Logo.png";
import Admin from "./componant/Pages/SuperAdmin/Admin/Admin";
import "@fortawesome/fontawesome-free/css/all.min.css";

export default function App() {
  // بيانات الفرق الافتراضية
  const بياناتالفرق = [
    { معرف: 1, اسم: "الفريق الأول" },
    { معرف: 2, اسم: "الفريق الثاني" },
    { معرف: 3, اسم: "الفريق الثالث" },
    { معرف: 4, اسم: "الفريق الرابع" },
  ];
  
  const [بحث, setبحث] = useState("");
  const [رمز_الوصول, setرمز_الوصول] = useState(null);

  const التنقل = useNavigate();

  // تصفية الفرق بناءً على البحث
  const الفرق_المصفاة = بياناتالفرق.filter((فريق) =>
    فريق.اسم.toLowerCase().includes(بحث.toLowerCase())
  );
  
  useEffect(() => {
    const رمز_الوصول = localStorage.getItem("token");
    setرمز_الوصول(رمز_الوصول);
  }, []);
  
  return (
    <>
      <div className="min-h-screen bg-[#c5c5c5] flex flex-col items-center justify-center py-4 sm:py-6 lg:py-10 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-4 sm:mb-6 w-full max-w-4xl">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white drop-shadow leading-tight">
            خليجيه كواترو 2025
          </h1>
          <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white opacity-80 drop-shadow mt-2">
            الاثنين 3 مارس 2025 - الجمعة 21 مارس 2025
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg w-full max-w-6xl">
          {/* شريط التنقل العلوي */}
          <div className="bg-blue-600 text-white rounded-t-lg px-2 sm:px-4 lg:px-6 py-2 sm:py-3">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-4 lg:gap-6">
              {/* أزرار التنقل */}
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1 sm:gap-2 lg:gap-4 w-full sm:w-auto">
                <button
                  onClick={() => التنقل("/info")}
                  className="font-medium flex items-center gap-1 sm:gap-2 hover:bg-blue-700 rounded-md px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 text-xs sm:text-sm lg:text-base transition-colors duration-200"
                >
                  <i className="fas fa-info-circle w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5"></i>
                  <span className="hidden sm:inline">المعلومات</span>
                  <span className="sm:hidden">معلومات</span>
                </button>

                <button
                  onClick={() => التنقل("/teams")}
                  className="font-medium flex items-center gap-1 sm:gap-2 hover:bg-blue-700 rounded-md px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 text-xs sm:text-sm lg:text-base transition-colors duration-200"
                >
                  <i className="fas fa-users w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5"></i>
                  <span className="hidden sm:inline">الفرق</span>
                  <span className="sm:hidden">فرق</span>
                </button>

                <button
                  onClick={() => التنقل("/matches")}
                  className="font-medium flex items-center gap-1 sm:gap-2 hover:bg-blue-700 rounded-md px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 text-xs sm:text-sm lg:text-base transition-colors duration-200"
                >
                  <i className="fas fa-futbol w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5"></i>
                  <span className="hidden sm:inline">المباريات</span>
                  <span className="sm:hidden">مباريات</span>
                </button>

                <button
                  onClick={() => التنقل("/shedulde")}
                  className="font-medium flex items-center gap-1 sm:gap-2 hover:bg-blue-700 rounded-md px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 text-xs sm:text-sm lg:text-base transition-colors duration-200"
                >
                  <i className="fas fa-calendar-alt w-3 h-3 sm:w-4 sm:h-4 lg:w-5 lg:h-5"></i>
                  <span className="hidden lg:inline">جدول المباريات</span>
                  <span className="hidden sm:inline lg:hidden">الجدول</span>
                  <span className="sm:hidden">جدول</span>
                </button>
              </div>

              {/* الشعار */}
              <div className="flex-shrink-0 flex items-center justify-center">
                <img
                  src={logo}
                  alt="شعار البطولة"
                  className="w-10 h-10 sm:w-14 sm:h-14 lg:w-18 lg:h-18 xl:w-20 xl:h-20 object-contain rounded-lg shadow-sm"
                />
              </div>
            </div>
          </div>

          {/* منطقة المحتوى */}
          <div className="p-2 sm:p-4 lg:p-6">
            <Outlet />
            <Admin />
          </div>
        </div>
      </div>

      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@200..1000&display=swap');
          
          /* أنماط إضافية للشاشات الصغيرة */
          @media (max-width: 640px) {
            .min-h-screen {
              padding: 1rem;
            }
          }
          
          /* ضمان الانتقالات السلسة */
          * {
            transition: all 0.2s ease-in-out;
          }
          
          /* أهداف لمس أفضل للأجهزة المحمولة */
          @media (max-width: 768px) {
            button {
              min-height: 44px;
              min-width: 44px;
            }
          }
        `}
      </style>
    </>
  );
}
