import { useRef, useState, useEffect } from "react";
import { getCategory } from "../http.js";

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

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const responseCategory = await getCategory();
        if (responseCategory?.length > 0) {
          const categoryList = responseCategory.map(item => item.category);
          setCategory(categoryList);
        }
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const setting_prompt = () => {
    if (!questionSet.current?.value) return;

    const prompt = {
      category: questionSet.current.value,
      sentence: `${questionSet.current.value}に関する知識を問う問題を出題してください。` +
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
    const value = questionSet.current?.value || '';
    return value.trim().length > 0;
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-center text-3xl text-gray-800 font-bold mb-8">
        今日は何を学習しますか？
      </h2>
      
      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {category.map((cat, index) => (
          <button
            key={cat}
            className="px-5 py-2 bg-white border-2 border-gray-200 rounded-lg shadow-sm 
                     text-gray-700 hover:bg-gray-50 hover:border-gray-300 
                     transition-all duration-200 ease-in-out"
            onClick={() => handleCategorySelect(index)}
            ref={(el) => (categoryRefs.current[index] = el)}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="bg-white shadow-lg rounded-lg p-6">
        <input
          type="text"
          id="create"
          className="w-full p-4 text-lg bg-gray-50 border border-gray-200 rounded-lg
                   focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                   transition-all duration-200"
          onKeyDown={handleKeyDown}
          onCompositionStart={handleCompositionStart}
          onCompositionEnd={handleCompositionEnd}
          ref={questionSet}
          placeholder="Let's do it!"
        />

        <div className="flex justify-between items-center mt-6">
          <div className="flex gap-3">
            <button
              className={`px-4 py-2 rounded-full border-2 transition-all duration-200
                      ${openSettings.number_of_quiz 
                        ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}
              onClick={() => toggleSetting('number_of_quiz')}
            >
              問題数: {advancedSettings.number_of_quiz}問
            </button>
            <button
              className={`px-4 py-2 rounded-full border-2 transition-all duration-200
                      ${openSettings.level
                        ? 'bg-indigo-50 border-indigo-500 text-indigo-700'
                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}
              onClick={() => toggleSetting('level')}
            >
              {advancedSettings.level}
            </button>
          </div>

          <button
            className={`px-6 py-2 rounded-full font-medium transition-all duration-200
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
          <div className="mt-6 p-4 border-t border-gray-100">
            <div className="flex items-center gap-3">
              <label className="text-gray-700">問題数設定:</label>
              <input
                type="number"
                min="1"
                className="w-24 px-3 py-2 border border-gray-200 rounded-lg focus:outline-none 
                         focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                onChange={handleNumberChange}
                value={advancedSettings.number_of_quiz}
              />
              <span className="text-gray-700">問</span>
            </div>
          </div>
        )}

        {openSettings.level && (
          <div className="mt-6 p-4 border-t border-gray-100">
            <div className="flex items-center gap-4">
              <label className="text-gray-700">難易度設定:</label>
              <div className="flex gap-3">
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
                    <span className={`px-4 py-2 rounded-full border-2 transition-all duration-200
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
