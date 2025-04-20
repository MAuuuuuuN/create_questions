// スタイル定数
const QuestionDisplay = ({ quizIndex, titleData }) => {
  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-sm border border-gray-100">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">
          問題 {quizIndex + 1}
        </h2>
        <span className="px-4 py-1 bg-indigo-100 text-indigo-800 text-sm font-medium rounded-full">
          Question {quizIndex + 1}
        </span>
      </div>
      
      <div className="relative">
        <div className="absolute -left-4 top-0 bottom-0 w-1 bg-indigo-500 rounded-full"></div>
        <p className="text-lg text-gray-700 leading-relaxed pl-4">
          {titleData}
        </p>
      </div>
    </div>
  );
}

export default QuestionDisplay;