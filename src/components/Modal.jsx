import { useState, useEffect } from 'react';
import { getHistory, deleteAllHistory } from '../http.js';

export default function Modal({ children, showModal }) {
  const [historyData, setHistoryData] = useState([]);

  // モーダルを開くたびに履歴を取得
  useEffect(() => {
    async function getQuestionData() {
      const response = await getHistory();
      console.log(response);
      const formatData = response.map((record) => {
        const dateOption = {
          timeZone: 'Asia/Tokyo',
          year: 'numeric',
          month: '2-digit',
          day: '2-digit'
        }
        const utcDate = new Date(record.create_at);
        const jstDate = utcDate.toLocaleDateString('ja-JP', dateOption);
        let correct = "";
        if (record.is_correct === 1) {
          correct = "正解";
        } else {
          correct = "不正解";
        }

        return {
          ...record,
          create_at: jstDate,
          is_correct: correct
        }
      });

      setHistoryData(formatData);
    }

    if (showModal) {
      getQuestionData();
    }
  }, [showModal]);

  // 履歴を削除
  async function deleteHistory() {
    const isDelete = window.confirm("履歴を削除しますか？");
    if (isDelete) {
      await deleteAllHistory();
      setHistoryData("");
    } else {
      return;
    }
  }

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"></div>
      
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="relative w-full max-w-2xl transform overflow-hidden rounded-2xl 
                      bg-white p-6 shadow-xl transition-all">
          <div className="absolute right-4 top-4">
            <button
              onClick={showModal}
              className="rounded-full p-2 text-gray-400 hover:bg-gray-100 
                       hover:text-gray-500 transition-colors"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="mt-2">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}