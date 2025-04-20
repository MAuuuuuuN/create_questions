import React from 'react';

export default function Sidebar({ showModal }) {
  return (
    <aside className="fixed top-0 left-0 h-screen w-64 bg-white border-r border-gray-200 shadow-sm">
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
                       rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              <span>問題を作成</span>
            </button>

            <button
              onClick={showModal}
              className="w-full flex items-center gap-3 px-4 py-3 text-left text-gray-700
                       rounded-lg hover:bg-gray-50 transition-colors duration-200"
            >
              <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <span>復習する</span>
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
  );
}