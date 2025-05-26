import { useState } from "react";
import Modal from "./Modal";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(import.meta.env.VITE_SUPABASE_KEY, import.meta.env.VITE_ANON_KEY);

export default function IncorrectModal({ isOpen, onClose }) {
  const [numberSettings, setNumberSettings] = useState(3);
  const [selectedCategory, setSelectedCategory] = useState("全て");
  const [categories, setCategories] = useState(["全て"]);

  const startReview = async () => {
    try {
      const { data, error } = await supabase
        .from('history')
        .select('*')
        .limit(numberSettings);

      if (error !== null) {
        throw new Error(error);
      }
        
      setHistory(data);
    } catch (error) {
      console.error('問題の取得に失敗しました:', error);
    }
  };
  

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="復習">
      <div className="max-h-[60vh]">
        <div>
          <div className="space-y-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                カテゴリー設定
              </h2>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors
                    ${
                      selectedCategory === category
                        ? "bg-indigo-100 text-indigo-800 border-2 border-indigo-500"
                        : "bg-white border-2 border-gray-200 text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                問題数設定
              </h2>
              <div className="flex items-center gap-4">
                <input
                  type="number"
                  min="1"
                  value={numberSettings}
                  onChange={(e) =>
                    setNumberSettings(
                      Math.max(1, parseInt(e.target.value) || 1)
                    )
                  }
                  className="w-24 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none 
                         focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
                <span className="text-gray-600">問</span>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-4 mt-8">
            <button
              onClick={() => startReview()}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg cursor-pointer
                     hover:bg-indigo-700 transition-colors"
            >
              出題開始
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
