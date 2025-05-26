import { useRef, useState, useEffect } from "react";
import { createClient } from "@supabase/supabase-js";
const supabase = createClient(import.meta.env.VITE_SUPABASE_KEY, import.meta.env.VITE_ANON_KEY);

// 定数の分離
const DEFAULT_SETTINGS = {
  number_of_quiz: 3,
  level: "初心者",
};

const LEVELS = ["初心者", "中級者", "上級者"];

export default function QuizSetting({ onButtonClick }) {
  const questionSet = useRef();
  const categoryRefs = useRef([]);
  const [isComposing, setIsComposing] = useState(false);
  const [advancedSettings, setAdvancedSettings] = useState(DEFAULT_SETTINGS);
  const [openSettings, setOpenSettings] = useState({
    number_of_quiz: false,
    level: false,
  });
  const [category, setCategory] = useState([]);
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const {data, error} = await supabase
          .from('recent_category')
          .select('*');

        if (error !== null) {
          throw new Error(error);
        }

        if (data?.length > 0) {
          const categoryList = data.map(item => item.category);
          setCategory(categoryList);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const setting_prompt = () => {
    if (!inputValue) return;

    const prompt = {
      category: inputValue,
      sentence: `${inputValue}に関する知識を問う問題を出題してください。` +
        `問題は${advancedSettings.number_of_quiz}個出題してください。` +
        `難易度は${advancedSettings.level}向けにしてください。` +
        'questionに問題文、selectに選択肢、answerに正解の選択肢を入れてください。' +
        '選択肢を4つ設けて,正解の選択肢は1つとするように設定してください。' +
        '次のようなJSON形式のような形で出力してください。[{"question":"QQQQQQQ","select":["SSSS","SSSS","SSSS","SSSS"],"answer":"AAAAAAA"},{"question":"QQQQQQQ","select":["SSSS","SSSS","SSSS","SSSS"],"answer":"AAAAAAA"}]'
    };

    onButtonClick(prompt);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !isComposing) {
      setting_prompt();
    }
  };

  const handleCompositionStart = () => setIsComposing(true);
  const handleCompositionEnd = () => setIsComposing(false);

  const handleCategorySelect = (index) => {
    const selectedCategory = categoryRefs.current[index]?.textContent;
    if (selectedCategory) {
      document.getElementById("create").value = selectedCategory;
      setInputValue(selectedCategory);
    }
  };

  const toggleSetting = (setting) => {
    setOpenSettings(prev => ({
      ...prev,
      [setting]: !prev[setting],
      ...(setting === 'number_of_quiz' ? { level: false } : { number_of_quiz: false })
    }));
  };

  const handleNumberChange = (e) => {
    const number_value = parseInt(e.target.value);
    if (!Number.isInteger(number_value) || number_value < 1) return;
    
    setAdvancedSettings(prev => ({
      ...prev,
      number_of_quiz: number_value,
    }));
  };

  const handleLevelChange = (e) => {
    setAdvancedSettings(prev => ({
      ...prev,
      level: e.target.value,
    }));
  };

  // 入力値が有効かどうかを確認する関数を追加
  const isValidInput = () => {
    return inputValue.trim().length > 0;
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-2 py-4 h-110 sm:p-6">
      <h2 className="text-center text-2xl sm:text-3xl text-gray-800 font-bold mb-6 sm:mb-8">
        今日は何を学習しますか？
      </h2>
      
      <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        {category.map((cat, index) => (
          <button
            key={cat}
            className="px-3 py-2 sm:px-5 sm:py-2 bg-white border-2 border-gray-200 rounded-lg shadow-sm 
                     text-gray-700 cursor-pointer hover:bg-gray-50 hover:border-gray-300 
                     transition-all duration-200 ease-in-out text-sm sm:text-base"
            onClick={() => handleCategorySelect(index)}
            ref={(el) => (categoryRefs.current[index] = el)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="bg-white shadow-lg rounded-lg p-3 sm:p-6">
        <input
          type="text"
          id="create"
          className="w-full p-3 sm:p-4 text-base sm:text-lg bg-gray-50 border-2 border-gray-200 rounded-lg
                   focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                   transition-all duration-200"
          onKeyDown={handleKeyDown}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
          ref={questionSet}
          placeholder="問題を生成"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
        />

        <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center mt-4 sm:mt-6 gap-3 sm:gap-0">
          <div className="flex gap-2 sm:gap-3 mb-2 sm:mb-0">
            <button
              className={`px-3 py-2 sm:px-4 sm:py-2 rounded-full border-2 transition-all duration-200 cursor-pointer
                      ${openSettings.number_of_quiz 
                        ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}
              onClick={() => toggleSetting('number_of_quiz')}
            >
              問題数: {advancedSettings.number_of_quiz}問
            </button>
            <button
              className={`px-3 py-2 sm:px-4 sm:py-2 rounded-full border-2 transition-all duration-200 cursor-pointer
                      ${openSettings.level
                        ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}
              onClick={() => toggleSetting('level')}
            >
              {advancedSettings.level}
            </button>
          </div>

          <button
            className={`px-4 py-2 sm:px-6 sm:py-2 rounded-full font-medium transition-all duration-200
                    ${isValidInput()
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
            onClick={setting_prompt}
            disabled={!isValidInput()}
          >
            作成
          </button>
        </div>

        {openSettings.number_of_quiz && (
          <div className="mt-4 sm:mt-6 sm:p-4 sm:pb-0 pt-4 border-t-2 border-gray-300">
            <div className="flex items-center gap-2 sm:gap-3">
              <label className="text-gray-700 text-sm sm:text-base">問題数設定:</label>
              <input
                type="number"
                min="1"
                className="w-16 sm:w-24 px-2 sm:px-3 py-2 border border-gray-200 rounded-lg focus:outline-none 
                         focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                onChange={handleNumberChange}
                value={advancedSettings.number_of_quiz}
              />
              <span className="text-gray-700 text-sm sm:text-base">問</span>
            </div>
          </div>
        )}

        {openSettings.level && (
          <div className="mt-4 sm:mt-6 sm:p-4 sm:pb-0 pt-4 border-t-2 border-gray-300">
            <div className="flex h-10 items-center gap-2 sm:gap-4">
              <label className="text-gray-700 text-sm sm:text-base">難易度設定:</label>
              <div className="flex gap-2 sm:gap-3">
                {LEVELS.map((level) => (
                  <label key={level} className="cursor-pointer">
                    <input
                      type="radio"
                      name="level"
                      className="hidden"
                      value={level}
                      checked={advancedSettings.level === level}
                      onChange={handleLevelChange}
                    />
                    <span className={`px-2 py-2 sm:px-4 sm:py-2 rounded-full border-2 transition-all duration-200 text-sm sm:text-base
                                ${advancedSettings.level === level
                                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                                  : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}>
                      {level}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
