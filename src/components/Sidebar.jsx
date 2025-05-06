import React, { useState } from 'react';
import HistoryModal from './HistoryModal';
import IncorrectModal from './IncorrectModal';

export default function Sidebar({ showModal, showIncorrect, isOpen, onToggle }) {
  const [showReview, setShowReview] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  return (
    <>
      {/* ハンバーガーメニューボタン（モバイル用） */}
      <button
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-white shadow-lg"
        onClick={onToggle}
        aria-label="メニュー切り替え"
      >
        <svg
          className="w-6 h-6 text-gray-700"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          {isOpen ? (
            <path d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* サイドバー */}
      <aside className={`fixed top-0 left-0 h-screen bg-white border-r border-gray-200 shadow-sm transition-all duration-300 ease-in-out z-40
        ${isOpen ? 'translate-x-0' : '-translate-x-full'} 
        lg:translate-x-0 lg:static lg:w-64`}
      >
        <div className="flex flex-col h-full">
          <div className="p-6">
            <img 
              src="/src/images/Qreate_logo.png" 
              alt="Qreate Logo" 
              className="w-32 mx-auto mb-8"
            />
          </div>

          <nav className="flex-1 px-4">
            <div className="space-y-2">
              <button
                onClick={showModal}
                className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700
                         rounded-lg cursor-pointer hover:bg-gray-50 transition-colors duration-200"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
                <span>問題を作成</span>
              </button>

              <button
                onClick={() => setShowReview(true)}
                className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700
                         rounded-lg cursor-pointer hover:bg-gray-50 transition-colors duration-200"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                <span>復習する</span>
              </button>

              <button
                onClick={() => setShowHistory(true)}
                className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700
                         rounded-lg cursor-pointer hover:bg-gray-50 transition-colors duration-200"
              >
                <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>履歴を表示</span>
              </button>
            </div>
          </nav>

          <div className="p-4 border-t border-gray-200">
            <div className="flex items-center gap-3 px-4 py-3 text-sm text-gray-500">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>Qreate v1.0.0</span>
            </div>
          </div>
        </div>
      </aside>

      {/* オーバーレイ（モバイル用） */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={onToggle}
          aria-hidden="true"
        />
      )}

      <IncorrectModal 
        isOpen={showReview} 
        onClose={() => setShowReview(false)} 
      />

      <HistoryModal 
        isOpen={showHistory} 
        onClose={() => setShowHistory(false)} 
      />
    </>
  );
}