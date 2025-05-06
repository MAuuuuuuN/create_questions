import { useContext, useState } from 'react';
import { resultContext } from './QuizContext';
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(import.meta.env.VITE_SUPABASE_KEY, import.meta.env.VITE_ANON_KEY);

export default function AnswerDisplay({ titleData, answerData, questionId, onCheckChange }) {
  const { result, setResult } = useContext(resultContext);
  const [isAnswered, setIsAnswered] = useState(false);

  const handleAnswer = async () => {
    if (!onCheckChange) return;
    
    const isCorrect = onCheckChange === answerData;
    const newResult = {
      question: titleData,
      answer: answerData,
      select: onCheckChange,
      correct: isCorrect
    };
    setResult([...result, newResult]);
    setIsAnswered(true);

    // 選択した結果をDBに保存
    const { error } = await supabase
      .from('selectList')
      .insert(
        { question_id: questionId, is_correct: isCorrect, select_value: onCheckChange }
      );
    
    if (error) {
      throw new Error(error.message);
    }
  };

  if (!isAnswered) {
    return (
      <div className="mt-8 flex justify-center">
        <button
          onClick={handleAnswer}
          disabled={!onCheckChange}
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-200
            ${onCheckChange 
              ? 'bg-indigo-600 text-white hover:bg-indigo-700'
              : 'bg-gray-200 text-gray-400 cursor-not-allowed'}`}
        >
          回答する
        </button>
      </div>
    );
  }

  const isCorrect = onCheckChange === answerData;

  return (
    <div className={`mt-8 p-6 rounded-lg border-l-4 ${
      isCorrect ? 'bg-green-50 border-l-green-500' : 'bg-red-50 border-l-red-500'
    }`}>
      <div className="flex items-center gap-3 mb-4">
        {isCorrect ? (
          <>
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-lg font-medium text-green-800">正解です！</span>
          </>
        ) : (
          <>
            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
              <svg className="w-5 h-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <span className="text-lg font-medium text-red-800">不正解です</span>
          </>
        )}
      </div>

      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-gray-600">正解:</span>
          <span className={`px-3 py-1 rounded-full text-sm ${
            isCorrect ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
          }`}>
            {answerData}
          </span>
        </div>

        {!isCorrect && (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-600">あなたの回答:</span>
            <span className="px-3 py-1 rounded-full bg-red-100 text-red-800 text-sm">
              {onCheckChange}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}