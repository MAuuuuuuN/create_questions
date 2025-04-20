export default function AnswerDisplay({ isCorrect, correctAnswer, selectedAnswer }) {
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
            {correctAnswer}
          </span>
        </div>

        {!isCorrect && (
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium text-gray-600">あなたの回答:</span>
            <span className="px-3 py-1 rounded-full bg-red-100 text-red-800 text-sm">
              {selectedAnswer}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}