export default function SelectDisplay({ select, onSelect, isSelected }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
      {select.map((option, index) => (
        <button
          key={index}
          onClick={() => onSelect(option)}
          className={`p-4 text-left rounded-lg transition-all duration-200 border-2
            ${isSelected === option 
              ? 'bg-indigo-50 border-indigo-500 text-indigo-700 shadow-md transform -translate-y-1'
              : 'bg-white border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50'
            }`}
        >
          <div className="flex items-center gap-3">
            <div className={`w-6 h-6 flex items-center justify-center rounded-full border-2
              ${isSelected === option
                ? 'border-indigo-500 bg-indigo-500 text-white'
                : 'border-gray-300'
              }`}
            >
              <span className="text-sm">{String.fromCharCode(65 + index)}</span>
            </div>
            <span className="flex-1">{option}</span>
          </div>
        </button>
      ))}
    </div>
  );
}
