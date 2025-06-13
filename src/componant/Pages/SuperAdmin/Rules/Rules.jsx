import React, { useState } from 'react'
import './Rules.css'

export default function Rules() {
  const [activeTab, setActiveTab] = useState('general')

  const rulesData = {
    general: [
      {
        title: "قواعد عامة للبطولة",
        rules: [
          "يجب على جميع الفرق الالتزام بقواعد اللعب النظيف",
          "يحظر استخدام أي مواد محظورة أو منشطات",
          "يجب احترام قرارات الحكام والالتزام بها",
          "يحظر أي شكل من أشكال العنف أو التمييز",
          "يجب الحضور قبل موعد المباراة بـ 30 دقيقة على الأقل"
        ]
      },
      {
        title: "قواعد التسجيل",
        rules: [
          "يجب تسجيل جميع اللاعبين قبل بداية البطولة",
          "الحد الأقصى لعدد اللاعبين في الفريق الواحد هو 20 لاعب",
          "يجب تقديم الوثائق المطلوبة (الهوية، الشهادة الطبية)",
          "لا يمكن تغيير قائمة اللاعبين بعد بداية البطولة"
        ]
      }
    ],
    technical: [
      {
        title: "قواعد فنية",
        rules: [
          "مدة المباراة 90 دقيقة مقسمة إلى شوطين",
          "في حالة التعادل، يتم اللجوء إلى ركلات الترجيح",
          "يحق لكل فريق طلب 3 تبديلات كحد أقصى",
          "يتم احتساب النقاط: الفوز 3 نقاط، التعادل نقطة واحدة، الخسارة صفر"
        ]
      },
      {
        title: "قواعد البطاقات",
        rules: [
          "البطاقة الصفراء الأولى: تحذير",
          "البطاقة الصفراء الثانية: طرد لمدة مباراة",
          "البطاقة الحمراء المباشرة: طرد لمدة مباراتين",
          "تراكم 3 بطاقات صفراء: طرد لمدة مباراة"
        ]
      }
    ],
    disciplinary: [
      {
        title: "قواعد تأديبية",
        rules: [
          "يحظر التدخين في الملعب أو المناطق المخصصة",
          "يجب الحفاظ على نظافة الملعب والمرافق",
          "يحظر استخدام الهواتف المحمولة أثناء المباريات",
          "يجب احترام الجمهور والمنافسين"
        ]
      }
    ]
  }

  return (
    <div className="rules-page" dir="rtl">
      {/* Header */}
      <div className="rules-header">
        <div className="header-content">
          <h1 className="rules-title">
            <span className="title-icon">📋</span>
            اللوائح التنظيمية للبطولة
          </h1>
          <p className="rules-description">
            قواعد وأنظمة البطولة التي يجب على جميع المشاركين الالتزام بها
          </p>
        </div>
        <div className="header-actions">
          <button className="print-btn">
            <span className="btn-icon">🖨️</span>
            طباعة اللوائح
          </button>
          <button className="download-btn">
            <span className="btn-icon">📥</span>
            تحميل PDF
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="rules-tabs">
        <button 
          className={`tab-btn ${activeTab === 'general' ? 'active' : ''}`}
          onClick={() => setActiveTab('general')}
        >
          <span className="tab-icon">⚽</span>
          القواعد العامة
        </button>
        <button 
          className={`tab-btn ${activeTab === 'technical' ? 'active' : ''}`}
          onClick={() => setActiveTab('technical')}
        >
          <span className="tab-icon">🏆</span>
          القواعد الفنية
        </button>
        <button 
          className={`tab-btn ${activeTab === 'disciplinary' ? 'active' : ''}`}
          onClick={() => setActiveTab('disciplinary')}
        >
          <span className="tab-icon">⚖️</span>
          القواعد التأديبية
        </button>
      </div>

      {/* Content */}
      <div className="rules-content">
        {rulesData[activeTab].map((section, index) => (
          <div key={index} className="rules-section">
            <div className="section-header">
              <h2 className="section-title">
                <span className="section-icon">📌</span>
                {section.title}
              </h2>
            </div>
            <div className="rules-list">
              {section.rules.map((rule, ruleIndex) => (
                <div key={ruleIndex} className="rule-item">
                  <div className="rule-number">{ruleIndex + 1}</div>
                  <div className="rule-text">{rule}</div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="rules-footer">
        <div className="footer-content">
          <div className="footer-info">
            <h3 className="footer-title">معلومات مهمة</h3>
            <p className="footer-text">
              هذه اللوائح ملزمة لجميع المشاركين في البطولة. أي مخالفة لهذه القواعد 
              قد تؤدي إلى استبعاد الفريق أو اللاعب من البطولة.
            </p>
          </div>
          <div className="footer-contact">
            <h4 className="contact-title">للاستفسارات</h4>
            <p className="contact-info">📧 admin@tournament.com</p>
            <p className="contact-info">📞 +966 50 123 4567</p>
          </div>
        </div>
      </div>
    </div>
  )
}
