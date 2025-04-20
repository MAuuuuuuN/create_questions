import { useContext } from 'react';
import { resultContext } from './QuizContext.jsx';

export default function QuizResult() {
  const { result } = useContext(resultContext);
  const totalQuestions = result.length;
  const totalCorrect = result.reduce((correctTotal, question) => 
    question.correct ? correctTotal + 1 : correctTotal, 0);

  const percentage = Math.round((totalCorrect / totalQuestions) * 100);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <div className="bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          クイズ結果
        </h2>
        
        <div className="flex justify-center items-center space-x-4 mb-8">
          <div className="text-center">
            <div className="text-5xl font-bold text-indigo-600 mb-2">
              {percentage}%
            </div>
            <p className="text-gray-600">
              {totalQuestions}問中{totalCorrect}問正解
            </p>
          </div>
        </div>

        <div className="space-y-6">
          {result.map((questionResult, index) => (
            <div key={index} 
                 className={`p-6 rounded-lg border-l-4 ${
                   questionResult.correct 
                     ? 'border-l-green-500 bg-green-50' 
                     : 'border-l-red-500 bg-red-50'
                 }`}>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  問題 {index + 1}
                </h3>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  questionResult.correct
                    ? 'bg-green-100 text-green-800'
                    : 'bg-red-100 text-red-800'
                }`}>
                  {questionResult.correct ? '正解' : '不正解'}
                </span>
              </div>
              
              <p className="text-gray-700 mb-4">{questionResult.question}</p>
              
              <div className="grid grid-cols-1 gap-2 text-sm">
                <div className="flex items-center">
                  <span className="font-medium text-gray-600 w-24">正解:</span>
                  <span className="text-green-600">{questionResult.answer}</span>
                </div>
                <div className="flex items-center">
                  <span className="font-medium text-gray-600 w-24">あなたの回答:</span>
                  <span className={questionResult.correct ? 'text-green-600' : 'text-red-600'}>
                    {questionResult.select}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}