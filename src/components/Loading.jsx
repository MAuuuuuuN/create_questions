export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="text-2xl font-bold text-gray-700 mb-4">
        問題を生成中
      </div>
      <div className="relative">
        <div className="w-12 h-12 rounded-full border-4 border-gray-200 border-t-indigo-600 animate-spin"></div>
      </div>
    </div>
  );
}