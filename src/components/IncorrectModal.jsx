import { useState, useEffect } from 'react';
import { getHistory } from '../http.js';

export default function IncorrectModal({ showModal }) {
  const [numberSettings, setNumberSettings] = useState(3);
  const [selectedCategory, setSelectedCategory] = useState('全て');
  const [categories, setCategories] = useState(['全て']);

  useEffect(() => {
    async function fetchData() {
      const response = await getHistory();
      const uniqueCategories = ['全て', ...new Set(response.map(item => item.category))];
      setCategories(uniqueCategories);
    }
    fetchData();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full mx-4 p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">復習モード</h1>
          <button 
            onClick={showModal}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">カテゴリー設定</h2>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                    ${selectedCategory === category
                      ? 'bg-indigo-100 text-indigo-800 border-2 border-indigo-500'
                      : 'bg-white border-2 border-gray-200 text-gray-600 hover:border-gray-300'
                    }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-gray-50 p-4 rounded-lg">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">問題数設定</h2>
            <div className="flex items-center gap-4">
              <input
                type="number"
                min="1"
                value={numberSettings}
                onChange={(e) => setNumberSettings(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-24 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none 
                         focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
              <span className="text-gray-600">問</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <button
            onClick={showModal}
            className="px-6 py-2 border-2 border-gray-200 rounded-lg text-gray-600 
                     hover:bg-gray-50 hover:border-gray-300 transition-colors"
          >
            キャンセル
          </button>
          <button
            onClick={showModal}
            className="px-6 py-2 bg-indigo-600 text-white rounded-lg
                     hover:bg-indigo-700 transition-colors"
          >
            出題開始
          </button>
        </div>
      </div>
    </div>
  );
}